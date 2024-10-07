using AutoMapper;
using AutoMapper.QueryableExtensions;
using Connectify.Server.DataAccess;
using Connectify.Server.DTOs;
using Connectify.Server.DTOs.ChatDTOs;
using Connectify.Server.DTOs.FriendDTOs;
using Connectify.Server.Services.Abstract;
using Connectify.Server.Services.FilterOptions;
using YueXiao.Utils;

namespace Connectify.Server.Services.Implement
{
    public class SearchService : ISearchService
    {
        private readonly AppDbContext dbContext;
        private readonly IMapper mapper;
        private readonly IFriendService friendService;
        public SearchService(AppDbContext dbContext, IMapper mapper, IFriendService friendService)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.friendService = friendService;
        }
        public async Task<PaginatedResult<UserSearchDTO>> GetPeopleAsync(string userId, UserFilterOptions options)
        {
            var query = dbContext.Users.AsQueryable();
            if (options == null) return null;
            if (!string.IsNullOrEmpty(options.Filter))
            {
                if(options.Filter == "friends")
                {
                    query = query.Where(u => dbContext.FriendShips.Any(
                fs => fs.User1Id == u.Id && fs.User2Id == userId
                || fs.User2Id == u.Id && fs.User1Id == userId));
                }
            }
            if (!string.IsNullOrEmpty(options.FullName))
            {
                query = query.Where(u => u.FirstName.Contains(options.FullName) || u.LastName.Contains(options.FullName));
            }
            if (!string.IsNullOrEmpty(options.Location))
            {
                query = query.Where(u => u.Location ==  options.Location);
            }
            if (!string.IsNullOrEmpty(options.Company))
            {
                query = query.Where(u => u.Company == options.Company);
            }
            query = query.Where(u => u.Id != userId);
            query = query.OrderByDescending(u => u.FirstName);
            var projectedQuery = query.Select(u => new UserSearchDTO
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Avatar = u.Avatar,
                UserP2PStatus = friendService.GetUsersP2PStatus(userId, u.Id),
            });
            var res = await PaginationHelper.CreatePaginatedResultAsync<UserSearchDTO>(projectedQuery, options.pageNumber, options.pageSize);
            return res;
        }
        public async Task<PaginatedResult<FriendRequestDTO>> GetFriendRequestForUserAsync(string userId, string filter, int pageNumber, int pageSize = 10)
        {
            IQueryable<FriendRequestDTO> query;
            if (filter == "sent")
            {
                query = dbContext.FriendRequests.Where(fr => fr.RequesterId == userId)
                            .Select(fr => new FriendRequestDTO
                            {
                                userId = fr.ReceiverId,
                                firstName = fr.Receiver.FirstName,
                                lastName = fr.Receiver.LastName,
                                avatar = fr.Receiver.Avatar,
                                isSent = true
                            });
            }
            else if (filter == "received")
            {
                query = dbContext.FriendRequests.Where(fr => fr.ReceiverId == userId)
                            .Select(fr => new FriendRequestDTO
                            {
                                userId = fr.RequesterId,
                                firstName = fr.Requester.FirstName,
                                lastName = fr.Requester.LastName,
                                avatar = fr.Requester.Avatar,
                                isSent = false
                            });
            }
            else
            {
                throw new ArgumentException();
            }
            return await PaginationHelper.CreatePaginatedResultAsync<FriendRequestDTO>(query, pageNumber, pageSize);
        }
    }
}
