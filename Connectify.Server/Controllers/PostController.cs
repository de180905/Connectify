using BussinessObjects.MediaFeature;
using Connectify.BusinessObjects.Notification;
using Connectify.BusinessObjects.PostFeature;
using Connectify.Server.DTOs;
using Connectify.Server.DTOs.notification;
using Connectify.Server.DTOs.PostDTOs;
using Connectify.Server.Services;
using Connectify.Server.Services.Abstract;
using Connectify.Server.Services.FilterOptions;
using Connectify.Server.Services.Implement;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Connectify.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IPostService postService;
        private readonly ICloudStorageService cloudStorageService;
        private readonly INotificationService _notificationService;
        private readonly IFriendService _friendService;
        private readonly IAccountService _accountService;

        public PostsController(IPostService postService, ICloudStorageService cloudStorageService, IAccountService accountService, INotificationService notificationService, IFriendService friendService)
        {
            this.postService = postService;
            this.cloudStorageService = cloudStorageService;
            _accountService = accountService;
            _notificationService = notificationService;
            _friendService = friendService;
        }

        [HttpPost("")]
        [Authorize]
        public async Task<IActionResult> CreatePost([FromForm] CreatePostDTO createPostDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            int postId = await postService.CreatePostAsync(userId, createPostDto);
            //send notification
            /*var recipientIds = await _friendService.GetFriends(userId);
            var notification = new Notifications
            {
                TriggeredByUserId = userId,
                Message = "just shared a post",
                Type = NotificationType.Post,
                ActionLink = $"/post/{postId}",
            };
            notification = await _notificationService.CreateNotification(notification, recipientIds);
            var triggeredByUserName = await _accountService.GetFullName(userId);
            var triggeredByUserAvatarUrl = await _accountService.GetAvatarUrl(userId); 
            if (notification != null) {
                var sendNotification = new SendNotificationDTO
                {
                    NotificationId = notification.Id,
                    TriggeredByUserName = triggeredByUserName,
                    TriggeredByUserAvatarUrl = triggeredByUserAvatarUrl,
                    Message = notification.Message,
                    ActionLink = notification.ActionLink,
                };
                foreach (var recipientId in recipientIds)
                {
                    await _notificationService.SendNotification(recipientId, sendNotification);
                }
            }*/
            //
            return CreatedAtAction(nameof(GetPostById), new { id = postId }, null);
        }
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdatePost(int id,  [FromForm] UpdatePostDTO updatePostDTO)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            await postService.UpdatePostAsync(userId, id, updatePostDTO);
            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostById(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var post = await postService.GetPostByIdForUser(userId, id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpGet("")]
        public async Task<IActionResult> GetPosts([FromQuery] int pageNumber, [FromQuery] int pageSize, [FromQuery] PostsFilterOptions? opts = null)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var posts = await postService.GetPostsForUserAsync(userId, pageNumber, pageSize, opts);
            return Ok(posts);
        }
        [HttpPost("{postId}/react")]
        public async Task<IActionResult> ReactToPost(int postId, [FromBody] ReactToPostDTO dto)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                await postService.ReactToPost(userId, postId, dto.Reaction);
                //gửi thông báo
                var recipientId = await postService.GetAuthorIdOfPost(postId);
                if (recipientId != userId)
                {
                    var notification = new Notifications
                    {
                        TriggeredByUserId = userId,
                        Message = "reacted to your post.",
                        Type = NotificationType.ReactPost,
                        ActionLink = $"/post-view/{postId}",
                    };

                    var recipientIds = new List<string>();
                    recipientIds.Add(recipientId);
                    notification = await _notificationService.CreateNotification(notification, recipientIds);

                    var triggeredByUserName = await _accountService.GetFullName(userId);
                    var triggeredByUserAvatarUrl = await _accountService.GetAvatarUrl(userId);
                    var sendNotification = new SendNotificationDTO
                    {
                        NotificationId = notification.Id,
                        TriggeredByUserName = triggeredByUserName,
                        TriggeredByUserAvatarUrl = triggeredByUserAvatarUrl,
                        Message = notification.Message,
                        ActionLink = notification.ActionLink,
                    };
                    await _notificationService.SendNotification(recipientId, sendNotification);
                }
                // Return a 204 No Content to indicate the dto was successful
                return Ok(new ReactionDTO { Text = dto.Reaction.ToString(), Value = dto.Reaction});
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Post with ID {postId} not found.");
            }
            catch (Exception ex)
            {
                // Log the exception (you might want to add a logging service)
                return StatusCode(500, "An error occurred while processing your dto.");
            }
        }

        [HttpDelete("{postId}/react")]
        public async Task<IActionResult> UnReactToPost(int postId)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                await postService.UnReactPost(userId, postId);
                return NoContent();
            }
            catch (InvalidOperationException)
            {
                // If no matching reaction is found (SingleAsync throws)
                return NotFound($"No reaction found for PostId {postId} by this user.");
            }
            catch (Exception ex)
            {
                // Handle unexpected errors
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}
