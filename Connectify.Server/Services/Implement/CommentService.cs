using Connectify.BusinessObjects.Authen;
using Connectify.BusinessObjects.CommentFeature;
using Connectify.Server.DataAccess;
using Connectify.Server.DTOs.CommentDTOs;
using Connectify.Server.Services.Abstract;
using Connectify.Server.Services.Exceptions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Connectify.Server.Services.Implement
{
    public class CommentService : ICommentService
    {
        private readonly AppDbContext _dbContext;
        private readonly UserManager<User> _userManager;

        public CommentService(AppDbContext dbContext, UserManager<User> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        // Create a new comment
        public async Task<CommentDTO> CreateCommentAsync(CreateCommentDTO dto, string userId)
        {
            if (dto.ParentCommentId.HasValue)
            {
                var parentComment = await _dbContext.Comments
                    .FirstOrDefaultAsync(c => c.CommentId == dto.ParentCommentId.Value);

                if (parentComment == null)
                {
                    throw new ArgumentException("Parent comment not found.");
                }
            } 
            var comment = new Comment
            {
     
                Content = dto.Content,
                CreatedAt = DateTime.Now,  
                PostId =3,// dto.PostId,  
                AuthorId = userId, //"bbe771ab-531c-45a3-8e68-310762bbcd04",  
                ParentCommentId = dto.ParentCommentId,  
                AttachmentUrl = dto.AttachmentUrl ?? "",  
            };

            // Lưu bình luận vào database
            await _dbContext.Comments.AddAsync(comment);
            await _dbContext.SaveChangesAsync();

            // Trả về DTO sau khi bình luận được tạo
            return await MapToDTOAsync(comment, userId);
        }



        // Add or update reaction
        public async Task<bool> AddOrUpdateReactionAsync(AddReactionDTO dto, string userId)
        {
            var existingReaction = await _dbContext.CommentReactions
                .FirstOrDefaultAsync(r => r.CommentId == dto.CommentId && r.UserId == userId);

            if (existingReaction != null)
            {
                // Cập nhật phản ứng hiện có
                existingReaction.Reaction = dto.Reaction;
            }
            else
            {
                // Thêm phản ứng mới
                var newReaction = new CommentReaction
                {
                    CommentId = dto.CommentId,
                    UserId = userId,
                    Reaction = dto.Reaction
                };
                await _dbContext.CommentReactions.AddAsync(newReaction);
            }

            // Lưu thay đổi
            await _dbContext.SaveChangesAsync();
            return true;
        }
        // Get paginated comments for a post
        public async Task<PaginatedList<CommentDTO>> GetCommentsForPostAsync(int postId, int pageNumber, int pageSize, string userId)
        {
            var query = _dbContext.Comments
                .Where(c => c.PostId == postId && c.ParentCommentId == null)
                .OrderByDescending(c => c.CreatedAt)
                .Include(c => c.Reactions)
                .Include(c => c.Replies)
                .AsQueryable();

            var paginatedComments = await PaginatedList<Comment>.CreateAsync(query, pageNumber, pageSize);

            var commentDTOs = new List<CommentDTO>();
            foreach (var comment in paginatedComments.Items)
            {
                commentDTOs.Add(await MapToDTOAsync(comment, userId));
            }

            return new PaginatedList<CommentDTO>(commentDTOs, paginatedComments.TotalCount, pageNumber, pageSize);
        }

        // Mapping Comment entity to CommentDTO with User info
        private async Task<CommentDTO> MapToDTOAsync(Comment comment, string userId)
        {
            // Tìm kiếm thông tin của tác giả (Author) từ UserManager
            var author = await _userManager.FindByIdAsync(comment.AuthorId);
            var authorFullName = author != null ? author.FullName : "Unknown Author";

            var reactionCounts = comment.Reactions
                .GroupBy(r => r.Reaction)
                .ToDictionary(g => g.Key, g => g.Count());

            var currentUserReaction = comment.Reactions.FirstOrDefault(r => r.UserId == userId)?.Reaction;

            return new CommentDTO
            {
                CommentId = comment.CommentId,
                Content = comment.Content,
                CreatedAt = comment.CreatedAt,
                AuthorFullName = authorFullName,  // Lấy tên đầy đủ của tác giả
                AuthorId = comment.AuthorId,
                ReactionCounts = reactionCounts,
                CurrentUserReaction = currentUserReaction,
                Replies = comment.Replies.Select(r => MapToDTOAsync(r, userId).Result).ToList()
            };
        }
        public Task<bool> DeleteCommentAsync(Guid commentId, string userId)
        {
            throw new NotImplementedException();
        }

        public Task<CommentDTO> GetCommentByIdAsync(Guid commentId, string userId)
        {
            throw new NotImplementedException();
        }
    }

}
