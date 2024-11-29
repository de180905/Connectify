using Connectify.Server.DTOs;
using Connectify.Server.DTOs.FriendDTOs;
using Connectify.Server.Services.FilterOptions;
using YueXiao.Utils;

namespace Connectify.Server.Services.Abstract
{
    public interface ISearchService
    {
        Task<PaginatedResult<UserSearchDTO>> GetPeopleAsync(string userId, UserFilterOptions options);
        Task<PaginatedResult<UserSearchDTO>> GetFriendRequestForUserAsync(string userId, string filter, int pageNumber, int pageSize = 10);
        Task<List<UserSearchDTO>> GetFriendsOfFriendsAsync(string userId, int count);
        
    }
}
