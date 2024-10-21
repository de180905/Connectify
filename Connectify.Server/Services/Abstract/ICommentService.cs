
using Connectify.Server.DTOs.CommentDTOs;
using Connectify.Server.Services.Exceptions;
using System.Threading.Tasks;
namespace Connectify.Server.Services.Abstract
{
    public interface ICommentService
    {
        // Tạo mới một bình luận (hoặc reply nếu có ParentCommentId)
        Task<CommentDTO> CreateCommentAsync(CreateCommentDTO dto, string userId);

        // Thêm hoặc cập nhật một phản ứng (reaction) cho bình luận
        Task<bool> AddOrUpdateReactionAsync(AddReactionDTO dto, string userId);

        // Lấy danh sách các bình luận của một bài viết, kèm theo phân trang
        Task<PaginatedList<CommentDTO>> GetCommentsForPostAsync(int postId, int pageNumber, int pageSize, string userId);

        // Xóa bình luận 
        Task<bool> DeleteCommentAsync(int  commentId, string userId);
        //Chhỉnh sửa bình luận 
        Task<bool> UpdateCommentAsync(int commentId, string userId, string newContent);

        // Lấy chi tiết của một bình luận
        Task<CommentDTO> GetCommentByIdAsync(int  commentId, string userId);
    }
}
