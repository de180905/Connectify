using AutoMapper;
using AutoMapper.QueryableExtensions;
using BussinessObjects.MediaFeature;
using Connectify.BusinessObjects;
using Connectify.BusinessObjects.Authen;
using Connectify.BusinessObjects.ChatFeature;
using Connectify.BusinessObjects.PostFeature;
using Connectify.Server.DataAccess;
using Connectify.Server.DTOs.ChatDTOs;
using Connectify.Server.DTOs.PostDTOs;
using Connectify.Server.Services.Abstract;
using Connectify.Server.Services.FilterOptions;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using YueXiao.Utils;

namespace Connectify.Server.Services.Implement
{
    public class PostService : IPostService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICloudStorageService _cloudStorageService;

        public PostService(AppDbContext context, IMapper mapper, ICloudStorageService cloudStorageService)
        {
            _context = context;
            _mapper = mapper;
            _cloudStorageService = cloudStorageService;
        }

        public async Task<int> CreatePostAsync(string authorId, CreatePostDTO dto)
        {
            var post = new NormalPost
            {
                AuthorId = authorId,
                CreatedAt = DateTime.UtcNow,
                Content = dto.Content,
                Visibility = dto.Visibility,
                Feeling = dto.Feeling
            };
            if(dto.TaggedFriendIds != null)
            {
                //tai day check xem co phai la friend khong

                foreach (var friendId in dto.TaggedFriendIds)
                {
                    var postTag = new PostTag
                    {
                        UserId = friendId
                    };
                    post.PostTags.Add(postTag);
                }
            }
            if(dto.Files != null)
            {
                // make sure all files are images
                if (dto.Files.Any(f => !f.ContentType.StartsWith("image/") && !f.ContentType.StartsWith("video/")))
                {
                    throw new ArgumentException("Invalid file type");
                }
                var urls = await _cloudStorageService.UploadFilesAsync(dto.Files);
                for (int i = 0; i < urls.Count; i++)
                {
                    post.Media.Add(new PostMedia
                    {
                        Name = dto.Files[i].FileName,
                        Url = urls[i],
                        FileType = dto.Files[i].ContentType
                    });
                }
            }
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
            return post.Id;
        }
        public async Task ReactToPost(string userId, int postId, ReactionType reaction)
        {
            // Find the post by its ID
            var post = await _context.Posts
                .Include(p => p.Reactions) // Include reactions to access them
                .FirstOrDefaultAsync(p => p.Id == postId); // Use FirstOrDefaultAsync for better async handling

            // Check if the post exists
            if (post == null)
            {
                throw new KeyNotFoundException($"Post with ID {postId} not found.");
            }

            // Check if the user has already reacted to the post
            var postReaction = post.Reactions.FirstOrDefault(r => r.UserId == userId);
            if (postReaction == null)
            {
                // If no existing reaction, create a new one
                var newPostReaction = new PostReaction
                {
                    UserId = userId,
                    Reaction = reaction
                };

                // Add the new reaction to the post's reactions list
                post.Reactions.Add(newPostReaction);
            }
            else
            {
                // If the user already reacted, update the existing reaction
                postReaction.Reaction = reaction;
            }

            // Save changes to the database
            await _context.SaveChangesAsync();
        }

        public async Task UnReactPost(string userId, int postId)
        {
            var react = await _context.PostReactions.SingleAsync(r => r.UserId == userId && r.PostId == postId);
            _context.PostReactions.Remove(react);
            await _context.SaveChangesAsync();
        }
        public async Task<PaginatedResult<PostDTO>> GetPostsForUserAsync(string userId, int pageNumber, int pageSize, PostsFilterOptions? opts = null)
        {
            // Query all posts, and project them to PostDTO based on the post type
            var query = _context.Posts
                .Where(p => p.AuthorId == userId ||
                            p is GroupPost || // GroupPost has no visibility checks
                           (p is NormalPost &&
                               (((NormalPost)p).Visibility == VisibilityLevel.Public ||
                                (((NormalPost)p).Visibility == VisibilityLevel.FriendsOnly &&
                                    _context.FriendShips.Any(fs =>
                                        (fs.User1Id == userId && fs.User2Id == p.AuthorId) ||
                                        (fs.User1Id == p.AuthorId && fs.User2Id == userId))))));
            if(opts != null)
            {
                if(opts.AuthorId != null)
                {
                    query = query.Where(p => p.AuthorId == opts.AuthorId);
                }
            }
                
            query = query.OrderByDescending(p => p.CreatedAt);

            // Project to PostDTO and paginate
            var projectedQuery = query.ProjectTo<PostDTO>(_mapper.ConfigurationProvider, new {userId = userId});

            var res = await PaginationHelper.CreatePaginatedResultAsync(projectedQuery, pageNumber, pageSize);
            return res;
        }
        public async Task<PostDTO> GetPostByIdForUser(string userId, int postId)
        {
            var query = _context.Posts
                .Where(p => p.Id == postId)
                .Where(p => p.AuthorId == userId ||
                            p is GroupPost || // GroupPost has no visibility checks
                           (p is NormalPost &&
                               (((NormalPost)p).Visibility == VisibilityLevel.Public ||
                                (((NormalPost)p).Visibility == VisibilityLevel.FriendsOnly &&
                                    _context.FriendShips.Any(fs =>
                                        (fs.User1Id == userId && fs.User2Id == p.AuthorId) ||
                                        (fs.User1Id == p.AuthorId && fs.User2Id == userId))))));
            // Project to PostDTO and paginate
            var post = await query.ProjectTo<PostDTO>(_mapper.ConfigurationProvider, new { userId = userId }).FirstOrDefaultAsync();
            return post;
        }
        public async Task UpdatePostAsync(string authorId, int postId, UpdatePostDTO dto)
        {
            var post = await _context.Posts
                .Include(p => p.Media)
                .Include(p => p.PostTags)
                .FirstOrDefaultAsync(p => p.Id == postId && p.AuthorId == authorId);
            if(post == null)
            {
                throw new UnauthorizedAccessException("unauthorized");
            }
            // Update main fields
            post.Content = dto.Content;
            if(post is NormalPost normalPost)
            {
                normalPost.Visibility = dto.Visibility;
                
            }
            post.Feeling = dto.Feeling;
            post.UpdatedAt = DateTime.UtcNow;
            post.PostTags.Clear();
            if (dto.TaggedFriendIds != null)
            {
                foreach (var friendId in dto.TaggedFriendIds)
                {
                    var postTag = new PostTag
                    {
                        UserId = friendId
                    };
                    post.PostTags.Add(postTag);
                }
            }
            IEnumerable<PostMedia>? filesToDelete = null;
            filesToDelete = post.Media.Where(m => !(dto.FileIdsToKeep?.Contains(m.Id)??false)).AsQueryable();
            var fileUrlsToDelete = filesToDelete.Select(f => f.Url).ToList();
            _context.Media.RemoveRange(filesToDelete);
            if (dto.FilesAdded != null)
            {
                // make sure all files are images
                if (dto.FilesAdded.Any(f => !f.ContentType.StartsWith("image/") && !f.ContentType.StartsWith("video/")))
                {
                    throw new ArgumentException("Invalid file type");
                }
                var urls = await _cloudStorageService.UploadFilesAsync(dto.FilesAdded);
                for (int i = 0; i < urls.Count; i++)
                {
                    post.Media.Add(new PostMedia
                    {
                        Name = dto.FilesAdded[i].FileName,
                        Url = urls[i],
                        FileType = dto.FilesAdded[i].ContentType
                    });
                }
            }          
            await _context.SaveChangesAsync();
            if(fileUrlsToDelete.Count > 0)
            {
                Task.Run(() => { _cloudStorageService.DeleteFilesAsync(fileUrlsToDelete); });
            }
            return;
        }

        public async Task<string> GetAuthorIdOfPost(int postId)
        {
            var post = await _context.Posts.FirstOrDefaultAsync(p=>p.Id== postId);
            return post.AuthorId;
        }
    }
}
