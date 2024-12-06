using AutoMapper;
using AutoMapper.QueryableExtensions;
using Connectify.BusinessObjects.Authen;
using Connectify.BusinessObjects.FriendFeature;
using Connectify.Server.DataAccess;
using Connectify.Server.DTOs;
using Connectify.Server.DTOs.ChatDTOs;
using Connectify.Server.DTOs.FriendDTOs;
using Connectify.Server.DTOs.PostDTOs;
using Connectify.Server.Services.Abstract;
using Connectify.Server.Services.FilterOptions;
using Connectify.Server.Utils.Comparers;
using Microsoft.EntityFrameworkCore;
using System.Linq;
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
            var query = dbContext.Users.Where(u => u.LastName == "Admin");
            if (options == null) return null;
            if (!string.IsNullOrEmpty(options.Filter))
            {
                if (options.Filter == "friends")
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
            var projectedQuery = query.ProjectTo<UserSearchDTO>(mapper.ConfigurationProvider, new { userId, friendService });
            var res = await PaginationHelper.CreatePaginatedResultAsync<UserSearchDTO>(projectedQuery, options.pageNumber, options.pageSize);
            return res;
        }
        public async Task<PaginatedResult<UserSearchDTO>> GetFriendRequestForUserAsync(string userId, string filter, int pageNumber, int pageSize = 10)
        {
            IQueryable<User> query;
            if (filter == "sent")
            {
                query = dbContext.FriendRequests.Where(fr => fr.RequesterId == userId).Select(fr => fr.Receiver);
            }
            else if (filter == "received")
            {
                query = dbContext.FriendRequests.Where(fr => fr.ReceiverId == userId).Select(fr => fr.Requester);
            }
            else
            {
                throw new ArgumentException();
            }
            var projectedQuery = query.ProjectTo<UserSearchDTO>(mapper.ConfigurationProvider, new { userId, friendService });
            var res = await PaginationHelper.CreatePaginatedResultAsync<UserSearchDTO>(projectedQuery, pageNumber, pageSize);
            return res;
        }
        public async Task<List<UserSearchDTO>> GetFriendsOfFriendsAsync(string userId, int count)
        {
            // Get direct friends of the user
            var directFriendIds = await dbContext.FriendShips
                .Where(f => f.User1Id == userId || f.User2Id == userId)
                .Select(f => f.User1Id == userId ? f.User2Id : f.User1Id)
                .ToListAsync();

            // Get friends of friends, excluding direct friends and the user
            var randomFriendsOfFriendIds = dbContext.FriendShips
                .Where(f =>
                    // Involve direct friends
                    (directFriendIds.Contains(f.User1Id) || directFriendIds.Contains(f.User2Id)) &&
                    // Exclude original user and their direct friends
                    !(directFriendIds.Contains(f.User1Id) && directFriendIds.Contains(f.User2Id)) &&
                    f.User1Id != userId && f.User2Id != userId)
                .Select(f => f.User1Id != userId && !directFriendIds.Contains(f.User1Id) ? f.User1Id : f.User2Id)
                .Distinct()
                .OrderBy(_ => Guid.NewGuid()) // Randomize results
                .Take(count)
                .ToHashSet();
            var randomFriendsOfFriends = await dbContext.Users.Where(u => randomFriendsOfFriendIds.Contains(u.Id))
                .ProjectTo<UserSearchDTO>(mapper.ConfigurationProvider, new { userId, friendService }).ToListAsync();
            return randomFriendsOfFriends;
        }

    }
}
