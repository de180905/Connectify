
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

        // Xóa bình luận (chỉ tác giả hoặc admin mới có quyền xóa)
        Task<bool> DeleteCommentAsync(Guid commentId, string userId);

        // Lấy chi tiết của một bình luận
        Task<CommentDTO> GetCommentByIdAsync(Guid commentId, string userId);
    }
}
