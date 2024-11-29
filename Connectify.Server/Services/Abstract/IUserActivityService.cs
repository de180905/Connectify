using Connectify.Server.DTOs.UserActivityDTOs;

namespace Connectify.Server.Services.Abstract
{
    public interface IUserActivityService
    {
        Task<List<UserActivityGroupedByDateResponse>> GetComments(string userId, int pageNumber, int pageSize);
        Task<List<UserActivityGroupedByDateResponse>> GetReactions(string userId, int pageNumber, int pageSize);
        Task<List<UserActivityGroupedByDateResponse>> GetFriendships(string userId, int pageNumber, int pageSize);
        Task<List<UserActivityGroupedByDateResponse>> GetPostSaves(string userId, int pageNumber, int pageSize);
    }
}
