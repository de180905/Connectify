
using Connectify.BusinessObjects;
using Connectify.Server.DTOs.PostDTOs;
using Connectify.Server.Services.FilterOptions;
using YueXiao.Utils;

namespace Connectify.Server.Services.Abstract
{
    public interface IPostService
    {
        Task<int> CreatePostAsync(string authorId, CreatePostDTO dto);
        Task UpdatePostAsync(string authorId, int postId, UpdatePostDTO dto);
        Task<PaginatedResult<PostDTO>> GetPostsForUserAsync(string userId, int pageNumber, int pageSize, PostsFilterOptions opts = null);
        Task ReactToPost(string userId, int postId, ReactionType reaction);
        Task UnReactPost(string userId, int postId);
        Task<PostDTO> GetPostByIdForUser(string userId, int postId);
    }
}
