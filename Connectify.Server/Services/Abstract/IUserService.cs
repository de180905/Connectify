using Connectify.Server.DTOs;
using YueXiao.Utils;

namespace Connectify.Server.Services.Abstract
{
    public interface IUserService
    {
        Task<UserBasicDTO?> GetUserBasic(string viewerId, string userId);
        Task<UserDescriptionDTO?> GetDescriptionOfUser(string viewerId, string userId);
        Task<PaginatedResult<UserSearchDTO>> GetFriendsOfUserAsync(string viewerId, string userId, string? searchTerm, int pageNumber, int pageSize);
    }
}
