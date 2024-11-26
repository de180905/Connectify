using AutoMapper;
using AutoMapper.QueryableExtensions;
using Connectify.BusinessObjects.Authen;
using Connectify.BusinessObjects.CommentFeature;
using Connectify.BusinessObjects.PostFeature;
using Connectify.Server.DataAccess;
using Connectify.Server.DTOs.CommentDTOs;
using Connectify.Server.DTOs.PostDTOs;
using Connectify.Server.Services.Abstract;
using Connectify.Server.Utils.Sort;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using YueXiao.Utils;

namespace Connectify.Server.Services.Implement
{
    public class CommentService : ICommentService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        public CommentService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<int> AddCommentAsync(string authorId, CreateCommentDTO dto)
        {
            var comment = new Comment
            {
                AuthorId = authorId,
                Content = dto.Content,
                CreatedAt = DateTime.UtcNow,
                PostId = dto.PostId,
            };
            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();
            return comment.CommentId;
        }
        public async Task<int> ReplyCommentAsync(string authorId, ReplyCommentDTO dto)
        {
            var parentComment = await _context.Comments.FirstOrDefaultAsync(c => c.CommentId == dto.ParentCommentId);
            if (parentComment == null)
            {
                throw new KeyNotFoundException("Comment not found");
            }
            var comment = new Comment
            {
                AuthorId = authorId,
                Content = dto.Content,
                CreatedAt = DateTime.UtcNow,
                PostId = parentComment.PostId,
            };
            comment.ParentCommentId = parentComment.ParentCommentId ?? parentComment.CommentId;
            if(parentComment.ParentCommentId != null)
            {
                comment.ParentCommentId = parentComment.ParentCommentId;
                comment.ReplyToUserId = parentComment.AuthorId;
            }
            else
            {
                comment.ParentCommentId = parentComment.CommentId;
            }
            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();
            return comment.CommentId;
        }
        public async Task ReactToCommentAsync(string userId, int commentId, bool? value)
        {
            var existingReaction = await _context.CommentReactions.FirstOrDefaultAsync(cr => cr.UserId == userId && cr.CommentId == commentId); 
            if (existingReaction == null)
            {
                if(value == null)
                {
                    return;
                }
                var commentReaction = new CommentReaction
                {
                    UserId = userId,
                    CommentId = commentId,
                    IsLike = (bool)value
                }; 
                await _context.CommentReactions.AddAsync(commentReaction);
            }
            else
            {
                if(value != null)
                {
                    existingReaction.IsLike = (bool)value;
                }
                else
                {
                    _context.CommentReactions.Remove(existingReaction);
                }
            }
            await _context.SaveChangesAsync();
        }
        public async Task<PaginatedResult<CommentDTO>> GetTopLevelCommentsByPostIdAsync(string viewerId, int postId, SortOption sortOption, int pageNumber, int pageSize)
        {
            var query = _context.Comments.Where(c => c.PostId == postId && c.ParentCommentId == null);
            if(sortOption == SortOption.Latest)
            {
                query = query.OrderByDescending(c => c.CreatedAt);
            }
            if (sortOption == SortOption.Popularity)
            {
                query = query.OrderByDescending(c => c.Replies.Count + c.Reactions.Count).ThenByDescending(c => c.CreatedAt);
            }
            var projectedQuery = query.ProjectTo<CommentDTO>(_mapper.ConfigurationProvider, new { userId = viewerId });
            var res = await PaginationHelper.CreatePaginatedResultAsync(projectedQuery, pageNumber, pageSize);
            return res;
        }
        public async Task<PaginatedResult<CommentDTO>> GetRepliesAsync(string viewerId, int parentCommentId, int pageNumber, int pageSize)
        {
            var query = _context.Comments.Where(c => c.ParentCommentId == parentCommentId);
            query = query.OrderByDescending(c => c.CreatedAt);
            var projectedQuery = query.ProjectTo<CommentDTO>(_mapper.ConfigurationProvider, new { userId = viewerId });
            var res = await PaginationHelper.CreatePaginatedResultAsync(projectedQuery, pageNumber, pageSize);
            return res;
        }
        public async Task<CommentDTO?> GetCommentByIdAsync(string viewerId, int id)
        {
            var query = _context.Comments.Where(c => c.CommentId == id);
            var projectedQuery = query.ProjectTo<CommentDTO>(_mapper.ConfigurationProvider, new { userId = viewerId });
            return await projectedQuery.FirstOrDefaultAsync();
        }
        public async Task EditCommentAsync(string userId, EditCommentDTO editedDto)
        {
            var comment = await _context.Comments
                .FirstOrDefaultAsync(c => c.CommentId == editedDto.CommentId && c.AuthorId == userId);
            if (comment == null)
            {
                throw new KeyNotFoundException("comment not found");
            }
            comment.Content = editedDto.Content;
            comment.UpdatedAt = DateTime.UtcNow; // Assuming you have an UpdatedAt property
            await _context.SaveChangesAsync();
        }
        public async Task DeleteCommentAsync(int commentId, string userId)
        {
            // Find the comment to be deleted along with all its descendants
            var comment = await _context.Comments
                .FirstOrDefaultAsync(c => c.CommentId == commentId && c.AuthorId == userId);
            if (comment == null)
            {
                throw new KeyNotFoundException("Not found");
            }
            var replies = _context.Comments.Where(c => c.ParentCommentId == commentId).Select(r => new Comment { CommentId = r.CommentId }).ToList();
            _context.Comments.RemoveRange(replies);
            await _context.SaveChangesAsync();
            // Delete the main comment
            _context.Comments.Remove(comment);

            // Save changes
            await _context.SaveChangesAsync();
        }

        public async Task<Comment> GetCommentById(int commentId)
        {
            return await _context.Comments.FirstOrDefaultAsync(c => c.CommentId==commentId);
        }

        public async Task<int> GetPostId(int commentId)
        {      
            var comment = await _context.Comments.FirstOrDefaultAsync(c => c.CommentId==commentId);
            if(comment!=null)return comment.PostId??0;
            return 0;
        }

        public async Task<string> GetAuthorId(int commentId)
        {
            var comment = await _context.Comments.FirstOrDefaultAsync(c => c.CommentId == commentId);
            if (comment != null) return comment.AuthorId;
            return "";
        }

        //lay comment root cua 1 comment
        public async Task<CommentDTO> GetRootComment(string userId, int commentId)
        {
            // Tìm comment đầu tiên theo ID
            var rootComment = await _context.Comments
                .Include(c => c.Author) // Bao gồm thông tin tác giả
                .Include(c => c.Reactions) // Bao gồm thông tin phản ứng
                .FirstOrDefaultAsync(cmt => cmt.CommentId == commentId);

            if (rootComment == null) throw new Exception("Comment not found");

            // Nếu có ParentCommentId, tìm đệ quy comment gốc
            if (rootComment.ParentCommentId != null)
            {
                return await GetRootComment(userId, rootComment.ParentCommentId.Value);
            }

            // Trả về DTO cho comment gốc
            return new CommentDTO
            {
                CommentId = rootComment.CommentId,
                Content = rootComment.Content,
                CreatedAt = rootComment.CreatedAt,
                AuthorId = rootComment.AuthorId,
                AuthorName = rootComment.Author.FullName,
                AuthorAvatar = rootComment.Author.Avatar,
                ParentCommentId = rootComment.ParentCommentId,
                ReplyToAuthorId = rootComment.ReplyToUserId,
                ReplyToAuthorName = rootComment.ReplyToUser?.FullName,
                IsAuthor = rootComment.AuthorId == userId,
                RepliesCount = RepliesCount(rootComment),
                LikesCount = rootComment.Reactions.Count,
                ViewerReaction = rootComment.Reactions.Any(r => r.UserId == userId)
            };
        }

        //dem replycoment 
        private int RepliesCount(Comment comment)
        {
            if (comment == null) return 0;

            // Kiểm tra nếu Replies chưa được tải
            if (comment.Replies == null || !comment.Replies.Any())
            {
                comment.Replies = _context.Comments
                    .Where(c => c.ParentCommentId == comment.CommentId)
                    .ToList();
            }

            int count = comment.Replies.Count; // Đếm số phản hồi trực tiếp

            foreach (var reply in comment.Replies)
            {
                count += RepliesCount(reply); // Đệ quy đếm phản hồi con
            }

            return count;
        }

    }
}
