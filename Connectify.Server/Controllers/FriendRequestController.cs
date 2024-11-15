using Connectify.BusinessObjects;
using Connectify.Server.DTOs.FriendDTOs;
using Connectify.Server.Services.Abstract;
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

        public FriendRequestController(IFriendService service)
        {
            friendService = service;
        }

        // Endpoint to send a friend request
        [HttpPost("send")]
        public async Task<IActionResult> SendFriendRequest([FromQuery] string otherUserId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var result = await friendService.SendFriendRequestAsync(userId, otherUserId);
            if (result)
            {
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
