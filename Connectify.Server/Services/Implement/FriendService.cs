using AutoMapper;
using Connectify.BusinessObjects;
using Connectify.BusinessObjects.FriendFeature;
using Connectify.Server.DataAccess;
using Connectify.Server.DTOs;
using Connectify.Server.Services.Abstract;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using YueXiao.Utils;

namespace Connectify.Server.Services.Implement
{
    public class FriendService : IFriendService
    {
        private readonly AppDbContext dbContext;
        private readonly IMapper mapper;
        private readonly IChatService chatService;
        public FriendService(AppDbContext dbContext, IMapper mapper, IChatService chatService)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.chatService = chatService;
        }
        public async Task<bool> SendFriendRequestAsync(string requesterId, string receiverId)
        {
            if(GetUsersP2PStatus(requesterId, receiverId) != UserP2PStatus.Empty) {
                return false;
            }
            var request = new FriendRequest
            {
                RequesterId = requesterId,
                ReceiverId = receiverId,
                Status = 0, // Pending
                RequestDate = DateTime.UtcNow
            };
            dbContext.FriendRequests.Add(request);
            await dbContext.SaveChangesAsync();
            return true;
        }
        public async Task<bool> UnFriend(string userId1, string userId2)
        {
            if (!Friend(userId1, userId2))
            {
                return false;
            }
            var curFs = dbContext.FriendShips.Where(fs => fs.User1Id == userId1 && fs.User2Id == userId2
                || fs.User2Id == userId1 && fs.User1Id == userId2).FirstOrDefault();
            if(curFs == null)
            {
                return false;
            }
            dbContext.FriendShips.Remove(curFs);
            await dbContext.SaveChangesAsync();
            return true;
        }
        public async Task<FriendRequest> GetFriendRequestAsync(string requesterId, string receiverId)
        {
            return await dbContext.FriendRequests
                .FirstOrDefaultAsync(fr => fr.ReceiverId == receiverId
                                    && fr.RequesterId == requesterId);
        }
        public async Task<bool> ResponseFriendRequestAsync(string receiverId, string requesterId, RequestStatus status)
        {
            var request = await GetFriendRequestAsync(requesterId, receiverId);
            if(request == null)
            {
                return false;
            }
            dbContext.FriendRequests.Remove(request);
            if(status == RequestStatus.Accepted)
            {
                var friendship = new FriendShip
                {
                    User1Id = request.RequesterId,
                    User2Id = request.ReceiverId,
                    FriendsSince = DateTime.UtcNow
                };
                dbContext.FriendShips.Add(friendship);
                await chatService.GetPrivateChatRoomIdAsync(receiverId, requesterId);
            }
            await dbContext.SaveChangesAsync();
            return true;
        }
        public async Task<bool> RevokeFriendRequestAsync(string requesterId, string receiverId)
        {
            var request = await GetFriendRequestAsync(requesterId, receiverId);
            if (request == null)
            {
                return false;
            }
            dbContext.FriendRequests.Remove(request);
            await dbContext.SaveChangesAsync();
            return true;
        }
        public UserP2PStatus GetUsersP2PStatus(string userId1, string userId2)
        {
            if(userId1 == userId2)
            {
                return UserP2PStatus.Self;
            }
            if(Friend(userId1, userId2))
            {
                return UserP2PStatus.Friend;
            }
            if(FriendRequestSent(userId1, userId2))
            {
                return UserP2PStatus.FriendRequestSent;
            }
            if(FriendRequestReceived(userId1, userId2))
            {
                return UserP2PStatus.FriendRequestReceived;
            }
            return UserP2PStatus.Empty;
        }
        private bool FriendRequestSent(string userId1, string userId2) {
            return dbContext.FriendRequests.Any(fr => fr.RequesterId == userId1
            && fr.ReceiverId == userId2);
        }
        private bool FriendRequestReceived(string userId1, string userId2)
        {
            return dbContext.FriendRequests.Any(fr => fr.RequesterId == userId2
            && fr.ReceiverId == userId1);
        }
        public bool Friend(string userId1, string userId2)
        {
            return dbContext.FriendShips.Any(
                fs => fs.User1Id == userId1 && fs.User2Id == userId2
                || fs.User2Id == userId1 && fs.User1Id == userId2);
        }
        public bool AreFriends(string user1Id, string user2Id, FriendShip fs)
        {
            return fs.User1Id == user1Id && fs.User2Id == user2Id ||
                fs.User1Id == user2Id && fs.User2Id == user1Id;
        }
        public int GetMutualFriendsCount(string user1Id, string user2Id)
        {
            return dbContext.FriendShips
            .Where(f => f.User1Id == user1Id || f.User2Id == user1Id)
            .Select(f => f.User1Id == user1Id ? f.User2Id : f.User1Id)
            .Intersect(
                dbContext.FriendShips
                .Where(f => f.User1Id == user2Id || f.User2Id == user2Id)
                .Select(f => f.User1Id == user2Id ? f.User2Id : f.User1Id)
            ).Count();
        }
        public List<string?> GetMutualFriendAvatars(string user1Id, string user2Id)
        {
            return dbContext.FriendShips
    .Where(f => (f.User1Id == user1Id || f.User2Id == user1Id))  // Get friendships of user1
    .Join(dbContext.FriendShips
        .Where(f => (f.User1Id == user2Id || f.User2Id == user2Id)), // Get friendships of user2
        f1 => f1.User1Id == user1Id ? f1.User2Id : f1.User1Id, // Friend of user1
        f2 => f2.User1Id == user2Id ? f2.User2Id : f2.User1Id, // Friend of user2
        (f1, f2) => f1.User1Id == user1Id ? f1.User2.Avatar : f1.User1.Avatar)
        .Take(2)
        .ToList();
        }
        public async Task<PaginatedResult<UserDisplayDTO>> GetMutualFriends(string user1Id, string user2Id, int pageNumber, int pageSize)
        {
            var query = dbContext.FriendShips
    .Where(f => (f.User1Id == user1Id || f.User2Id == user1Id))  // Get friendships of user1
    .Join(dbContext.FriendShips
        .Where(f => (f.User1Id == user2Id || f.User2Id == user2Id)), // Get friendships of user2
        f1 => f1.User1Id == user1Id ? f1.User2Id : f1.User1Id, // Friend of user1
        f2 => f2.User1Id == user2Id ? f2.User2Id : f2.User1Id, // Friend of user2
        (f1, f2) => mapper.Map<UserDisplayDTO>(f1.User1Id == user1Id ? f1.User2 : f1.User1));
            return await PaginationHelper.CreatePaginatedResultAsync<UserDisplayDTO>(query, pageNumber, pageSize);
        }
    }
}
