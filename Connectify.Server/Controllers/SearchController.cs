using Connectify.Server.Services.Abstract;
using Connectify.Server.Services.FilterOptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Connectify.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly ISearchService searchService;
        private readonly IUserService userService;
        public SearchController(ISearchService searchService, IUserService userService)
        {
            this.searchService = searchService;
            this.userService = userService;
        }
        [HttpGet("people")]
        public async Task<IActionResult> GetPeople([FromQuery]UserFilterOptions options)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Get user ID from claims
            var people = await searchService.GetPeopleAsync(userId, options);
            return Ok(people);
        }
        [HttpGet("people/friendRequest")]
        public async Task<IActionResult> GetFriendRequests([FromQuery]string filter, [FromQuery]int pageNumber = 1)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Get user ID from claims
            var friendRequest = await searchService.GetFriendRequestForUserAsync(userId, filter, pageNumber, 1);
            return Ok(friendRequest);
        }
        [HttpGet("UserBasic/{userId}")]
        public async Task<IActionResult> GetUserBasic(string userId)
        {
            var viewerId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Get user ID from claims
            var res = await userService.GetUserBasic(viewerId, userId);
            return Ok(res);
        }
        [HttpGet("UserDescription/{userId}")]
        public async Task<IActionResult> GetDescriptionOfUser(string userId)
        {
            var viewerId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Get user ID from claims
            var res = await userService.GetDescriptionOfUser(viewerId, userId);
            return Ok(res);
        }
    }
}
