using Connectify.Server.Services.Abstract;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Connectify.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserActivityController : ControllerBase
    {
        private readonly IUserActivityService _userActivityService;
        public UserActivityController(IUserActivityService userActivityService)
        {
            _userActivityService = userActivityService;
        }
        [HttpGet("comments")]
        public async Task<IActionResult> GetComments([FromQuery] int pageNumber = 0, [FromQuery] int pageSize = 10)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var response = await _userActivityService.GetComments(userId, pageNumber, pageSize);
            return Ok(response);
        }
        [HttpGet("reactions")]
        public async Task<IActionResult>GetReactions([FromQuery] int pageNumber = 0, [FromQuery] int pageSize = 10)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var response = await _userActivityService.GetReactions(userId, pageNumber, pageSize);   
            return Ok(response);
        }
        [HttpGet("friendships")]
        public async Task<IActionResult>GetFriendships( [FromQuery] int pageNumber = 0, [FromQuery] int pageSize = 10)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var response = await _userActivityService.GetFriendships(userId, pageNumber, pageSize);
            return Ok(response);
        }
        [HttpGet("post-saves")]
        public async Task<IActionResult> GetPostSaves([FromQuery] int pageNumber = 0, [FromQuery] int pageSize = 10)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var response = await _userActivityService.GetPostSaves(userId, pageNumber, pageSize);
            return Ok(response);
        }

    }
}
