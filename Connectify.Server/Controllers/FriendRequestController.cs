using Connectify.BusinessObjects;
using Connectify.BusinessObjects.Notification;
using Connectify.Server.DTOs.FriendDTOs;
using Connectify.Server.DTOs.notification;
using Connectify.Server.Services.Abstract;
using Connectify.Server.Services.Implement;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Ocsp;
using System.Security.Claims;

namespace Connectify.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FriendRequestController : ControllerBase
    {
        private readonly IFriendService friendService;
        private readonly INotificationService _notificationService;
        private readonly IAccountService _accountService;
        public FriendRequestController(IFriendService service, IAccountService accountService, INotificationService notificationService)
        {
            friendService = service;
            _accountService = accountService;
            _notificationService = notificationService;
        }

        // Endpoint to send a friend request
        [HttpPost("send")]
        public async Task<IActionResult> SendFriendRequest([FromQuery] string otherUserId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var result = await friendService.SendFriendRequestAsync(userId, otherUserId);
            if (result)
            {
                //gửi thông báo
                var notification = new Notifications
                {
                    TriggeredByUserId = userId,
                    Message = "has sent you a friend request.",
                    Type = NotificationType.FriendRequest,
                    ActionLink = "/people/requests",
                };
                notification = await _notificationService.CreateNotification(notification, otherUserId);
                var triggeredByUserName = await _accountService.GetFullName(userId);
                var triggeredByUserAvatarUrl = await _accountService.GetAvatarUrl(userId);
                if (notification != null)
                {
                    var sendNotification = new SendNotificationDTO
                    {
                        NotificationId = notification.Id,
                        TriggeredByUserName = triggeredByUserName,
                        TriggeredByUserAvatarUrl = triggeredByUserAvatarUrl,
                        Message = notification.Message,
                        ActionLink = notification.ActionLink,
                    };
                    await _notificationService.SendNotification(otherUserId, sendNotification);
                }
                return Ok("Friend request sent successfully.");
            }

            return BadRequest("Failed to send friend request.");
        }

        // Endpoint to respond to a friend request
        [HttpPost("respond")]
        public async Task<IActionResult> ResponseFriendRequest(string otherUserId, RequestStatus status)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await friendService.ResponseFriendRequestAsync(userId, otherUserId, status);
            if (result)
            {
                //gửi thông báo
                var notification = new Notifications
                {
                    TriggeredByUserId = userId,
                    Message = "has accepted your friend request.",
                    Type = NotificationType.AcceptFriendRequest,
                    ActionLink = $"/{userId}",
                };
                notification = await _notificationService.CreateNotification(notification, otherUserId);
                var triggeredByUserName = await _accountService.GetFullName(userId);
                var triggeredByUserAvatarUrl = await _accountService.GetAvatarUrl(userId);
                if (notification != null)
                {
                    var sendNotification = new SendNotificationDTO
                    {
                        NotificationId = notification.Id,
                        TriggeredByUserName = triggeredByUserName,
                        TriggeredByUserAvatarUrl = triggeredByUserAvatarUrl,
                        Message = notification.Message,
                        ActionLink = notification.ActionLink,
                    };
                    await _notificationService.SendNotification(otherUserId, sendNotification);
                }//
                return Ok("Friend request responded successfully.");
            }

            return BadRequest("Failed to respond to friend request.");
        }
        [HttpDelete("UnFriend")]
        public async Task<IActionResult> UnFriend(string otherUserId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await friendService.UnFriend(userId, otherUserId);
            if (result)
            {
                return Ok("Friend request responded successfully.");
            }

            return BadRequest("Failed to respond to friend request.");
        }
        [HttpPost("revoke")]
        public async Task<IActionResult> RevokeFriendRequest(string otherUserId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await friendService.RevokeFriendRequestAsync(userId, otherUserId);
            if (result)
            {
                return Ok("Friend request responded successfully.");
            }

            return BadRequest("Failed to respond to friend request.");
        }
    }
}
