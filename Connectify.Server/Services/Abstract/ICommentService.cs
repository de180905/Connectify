using Connectify.Server.DTOs.CommentDTOs;
using Connectify.Server.Utils.Sort;
using Microsoft.Data.SqlClient;
using YueXiao.Utils;

namespace Connectify.Server.Services.Abstract
{
    public interface ICommentService
    {
        Task<int> AddCommentAsync(string authorId, CreateCommentDTO dto);
        Task ReactToCommentAsync(string userId, int commentId, bool? value);
        Task<int> ReplyCommentAsync(string authorId, ReplyCommentDTO dto);
        Task<PaginatedResult<CommentDTO>> GetTopLevelCommentsByPostIdAsync(string viewerId, int postId, SortOption sortOption, int pageNumber, int pageSize);
        Task<PaginatedResult<CommentDTO>> GetRepliesAsync(string viewerId, int parentCommentId, int pageNumber, int pageSize);
        Task<CommentDTO?> GetCommentByIdAsync(string viewerId, int id);
        Task DeleteCommentAsync(int commentId, string userId);
        Task EditCommentAsync(string userId, EditCommentDTO dto);
        Task<int> GetPostId(int commentId);
        Task<string> GetAuthorId(int commentId);
        //lay comment root
        Task<CommentDTO> GetRootComment(string userId, int commentId);
    }
}
