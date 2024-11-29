using Connectify.Server.DTOs;
using YueXiao.Utils;

namespace Connectify.Server.Services.Abstract
{
    public interface IUserService
    {
        Task<UserBasicDTO?> GetUserBasic(string viewerId, string userId);
        Task<UserDescriptionDTO?> GetDescriptionOfUser(string viewerId, string userId);
        Task<PaginatedResult<UserSearchDTO>> GetFriendsOfUserAsync(string viewerId, string userId, string? searchTerm, int pageNumber, int pageSize);
        Task<PaginatedResult<UserDisplayDTO>> GetUserFriends(string userId, string? searchTerm, int pageNumber=1, int pageSize=-1);
        Task<PaginatedResult<UserDisplayDTO>> GetUsersToAddToChatroomAsyc(string userId,int? chatroomId, string? searchTerm, int pageNumber = 1, int pageSize = -1);
        // block user and unblock user
        Task<bool> BlockUser(string userId, string blockedUserId);
        Task<bool> UnblockUser(string userId, string blockedUserId);
    }
}
