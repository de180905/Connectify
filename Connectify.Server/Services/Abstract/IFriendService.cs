using Connectify.BusinessObjects;
using Connectify.BusinessObjects.FriendFeature;
using Connectify.Server.DTOs;
using Connectify.Server.DTOs.FriendDTOs;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using YueXiao.Utils;

namespace Connectify.Server.Services.Abstract
{
    public interface IFriendService
    {
        Task<bool> SendFriendRequestAsync(string requesterId, string receiverId);
        Task<bool> ResponseFriendRequestAsync(string receiverId, string requesterId, RequestStatus status);
        UserP2PStatus GetUsersP2PStatus(string userId1, string userId2);
        Task<bool> RevokeFriendRequestAsync(string requesterId, string receiverId);
        bool Friend(string userId1, string userId2);
        Task<bool> UnFriend(string userId1, string userId2);
    }
}
