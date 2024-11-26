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
        private readonly IMediaService _mediaService;
        public UserController(IUserService userService, IMediaService mediaService)
        {
            _userService = userService;
            _mediaService = mediaService;
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
        [HttpPost("block")]
        public async Task<IActionResult>BlockUser([FromBody]string blockedUserId)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == blockedUserId) throw new Exception("You cannot block yourself.");
                var result = await _userService.BlockUser(userId, blockedUserId);
                if(result)return Ok(new {isSuccess= true});
                throw new Exception("Block user fail.");
            }
            catch (Exception ex)
            {
                return Ok(new {error=ex.Message});
            }
        }
        [HttpPost("unblock")]
        public async Task<IActionResult> UnblockUser([FromBody]string blockedUserId)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == blockedUserId) throw new Exception("You cannot unblock yourself.");
                var result = await _userService.UnblockUser(userId, blockedUserId);
                if (result) return Ok(new { isSuccess = true });
                throw new Exception("Unblock user fail.");
            }
            catch (Exception ex)
            {
                return Ok(new { error = ex.Message });
            }
        }
    }
}
