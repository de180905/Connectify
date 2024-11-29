using Connectify.Server.Services.Abstract;
using Connectify.Server.Services.FilterOptions;
using Connectify.Server.Services.Implement;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Connectify.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IFriendService _friendService;
        private readonly IMediaService _mediaService;
        public UserController(IUserService userService, IMediaService mediaService, IFriendService friendService)
        {
            _userService = userService;
            _mediaService = mediaService;
            _friendService = friendService;
        }
        [HttpGet("{userId}/postMedia")]
        public async Task<IActionResult> GetPostMediaOfUser(string userId, [FromQuery]MediaFilterOptions? opts, [FromQuery]int pageNumber, [FromQuery]int pageSize = 10)
        {
            var viewerId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Get user ID from claims
            var res = await _mediaService.GetPostMediaOfUserAsync(viewerId, userId, opts, pageNumber, pageSize);
            return Ok(res);
        }
        [HttpGet("{userId}/friends")]
        public async Task<IActionResult> GetFriendsOfUser(string userId, [FromQuery]string? searchTerm, [FromQuery] int pageNumber, [FromQuery] int pageSize = 10)
        {
            var viewerId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Get user ID from claims
            var people = await _userService.GetFriendsOfUserAsync(viewerId, userId, searchTerm, pageNumber, pageSize);
            return Ok(people);
        }
        [HttpGet("myFriends")]
        public async Task<IActionResult> GetMyFriends([FromQuery] string? searchTerm, [FromQuery] int pageNumber=1, [FromQuery] int pageSize = 10)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Get user ID from claims
            var friends = await _userService.GetUserFriends(userId, searchTerm, pageNumber, pageSize);
            return Ok(friends);
        }
        [HttpGet("usersToAddToChatroom")]
        public async Task<IActionResult> GetUsersToAddToChatroom(int? chatroomId, string? searchTerm, int pageNumber = 1, int pageSize = 10)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Get user ID from claims
            var friends = await _userService.GetUsersToAddToChatroomAsyc(userId, chatroomId, searchTerm, pageNumber, pageSize);
            return Ok(friends);
        }
        [HttpGet("mutual-friends")]
        public async Task<IActionResult> GetMutualFriends(
            [FromQuery] string user2Id,
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10)
        {
            var user1Id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(user1Id) || string.IsNullOrEmpty(user2Id))
            {
                return BadRequest("User IDs must be provided.");
            }

            try
            {
                var result = await _friendService.GetMutualFriends(user1Id, user2Id, pageNumber, pageSize);
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log the exception if needed
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}
