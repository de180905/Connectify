using Connectify.BusinessObjects.Notification;
using Connectify.Server.DTOs.CommentDTOs;
using Connectify.Server.DTOs.notification;
using Connectify.Server.Services.Abstract;
using Connectify.Server.Services.Implement;
using Connectify.Server.Utils.Sort;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Connectify.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;
        private readonly IAccountService _accountService;
        private readonly IPostService _postService;
        private readonly INotificationService _notificationService;
        public CommentController(ICommentService commentService, IAccountService accountService, IPostService postService, INotificationService notificationService)
        {
            _commentService = commentService;
            _accountService = accountService;
            _postService = postService;
            _notificationService = notificationService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddComment([FromBody] CreateCommentDTO dto)
        {
            var authorId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var commentId = await _commentService.AddCommentAsync(authorId, dto);
            //gửi thông báo
            var recipientId = await _postService.GetAuthorIdOfPost(dto.PostId);
            if (authorId != recipientId)
            {
                var notification = new Notifications
                {
                    TriggeredByUserId = authorId,
                    Message = "commented on your post.",
                    Type = NotificationType.CommentPost,
                    ActionLink = $"/post-view/{dto.PostId}/{commentId}",
                };
                var recipientIds = new List<string>();
                recipientIds.Add(recipientId);
                notification = await _notificationService.CreateNotification(notification, recipientIds);

                var triggeredByUserName = await _accountService.GetFullName(authorId);
                var triggeredByUserAvatarUrl = await _accountService.GetAvatarUrl(authorId);
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
            //
            CommentDTO createdComment = new CommentDTO();
            try
            {
                createdComment = await _commentService.GetCommentByIdAsync(authorId, commentId);
            }
            catch (Exception ex)
            {

            }
            return Ok(createdComment);
        }

        [HttpPost("reply")]
        public async Task<IActionResult> ReplyComment([FromBody] ReplyCommentDTO dto)
        {
            var authorId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var commentId = await _commentService.ReplyCommentAsync(authorId, dto);
            CommentDTO createdReply = new CommentDTO();
            try
            {
                createdReply = await _commentService.GetCommentByIdAsync(authorId, commentId);
                //gửi thông báo cho user commnent

                var postId = await _commentService.GetPostId(dto.ParentCommentId);
                var recipientId = await _commentService.GetAuthorId(dto.ParentCommentId);
                if (createdReply.AuthorId != recipientId)
                {
                    var notif = new Notifications
                    {
                        TriggeredByUserId = createdReply.AuthorId,
                        Message = "replied to your comment.",
                        Type = NotificationType.CommentReply,
                        ActionLink = $"/post-view/{postId}/{commentId}",
                    };
                    notif = await _notificationService.CreateNotification(notif, recipientId);
                    var triggeredByUserAvatarUrl = await _accountService.GetAvatarUrl(createdReply.AuthorId);
                    var sendNotification = new SendNotificationDTO
                    {
                        NotificationId = notif.Id,
                        TriggeredByUserName = createdReply.AuthorName,
                        TriggeredByUserAvatarUrl = triggeredByUserAvatarUrl,
                        Message = notif.Message,
                        ActionLink = notif.ActionLink,
                    };
                    await _notificationService.SendNotification(recipientId, sendNotification);
                }

                //gửi thông báo cho user post
                recipientId = await _postService.GetAuthorIdOfPost(postId);
                if (recipientId != authorId && recipientId != createdReply.ReplyToAuthorId)
                {
                    var notif = new Notifications
                    {
                        TriggeredByUserId = authorId,
                        Message = "commented on your post.",
                        Type = NotificationType.CommentPost,
                        ActionLink = $"/post-view/{postId}/{commentId}",
                    };
                    notif = await _notificationService.CreateNotification(notif, recipientId);


                    var triggeredByUserAvatarUrl = await _accountService.GetAvatarUrl(authorId);
                    var sendNotification = new SendNotificationDTO
                    {
                        NotificationId = notif.Id,
                        TriggeredByUserName = createdReply.AuthorName,
                        TriggeredByUserAvatarUrl = triggeredByUserAvatarUrl,
                        Message = notif.Message,
                        ActionLink = notif.ActionLink,
                    };
                    await _notificationService.SendNotification(recipientId, sendNotification);
                }
            }
            catch (Exception ex)
            {

            }
            return Ok(createdReply);
        }

        [HttpGet("post/{postId}/comments")]
        public async Task<IActionResult> GetTopLevelComments(
            int postId,
            SortOption sortOption,
            int pageNumber = 1,
            int pageSize = 10)
        {
            var viewerId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await _commentService.GetTopLevelCommentsByPostIdAsync(viewerId, postId, sortOption, pageNumber, pageSize);
            return Ok(result);
        }

        [HttpGet("{parentCommentId}/replies")]
        public async Task<IActionResult> GetReplies(
            int parentCommentId,
            int pageNumber = 1,
            int pageSize = 10)
        {
            var viewerId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await _commentService.GetRepliesAsync(viewerId, parentCommentId, pageNumber, pageSize);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCommentById(int id)
        {
            var viewerId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await _commentService.GetCommentByIdAsync(viewerId, id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpDelete("{commentId}")]
        public async Task<IActionResult> DeleteComment(int commentId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _commentService.DeleteCommentAsync(commentId, userId);
            return NoContent();
        }

        [HttpPut("edit")]
        public async Task<IActionResult> EditComment([FromBody] EditCommentDTO dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _commentService.EditCommentAsync(userId, dto);
            CommentDTO editedComment = null;
            try
            {
                editedComment = await _commentService.GetCommentByIdAsync(userId, dto.CommentId);
            }
            catch (Exception ex)
            {

            }
            return Ok(editedComment);
        }
        [HttpPost("{commentId}/react")]
        public async Task<IActionResult> ReactToComment(int commentId, bool? value)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _commentService.ReactToCommentAsync(userId, commentId, value);
            //gui thong bao
            var postId = await _commentService.GetPostId(commentId);
            var recipientId = await _commentService.GetAuthorId(commentId);
            if (userId != recipientId)
            {
                var notif = new Notifications
                {
                    TriggeredByUserId = userId,
                    Message = "reacted to your comment.",
                    Type = NotificationType.CommentReact,
                    ActionLink = $"/post-view/{postId}/{commentId}",
                };
                notif = await _notificationService.CreateNotification(notif, recipientId);
                var triggeredByUserAvatarUrl = await _accountService.GetAvatarUrl(userId);
                var triggeredByUserName = await _accountService.GetFullName(userId);
                var sendNotification = new SendNotificationDTO
                {
                    NotificationId = notif.Id,
                    TriggeredByUserName = triggeredByUserName,
                    TriggeredByUserAvatarUrl = triggeredByUserAvatarUrl,
                    Message = notif.Message,
                    ActionLink = notif.ActionLink,
                };

                await _notificationService.SendNotification(recipientId, sendNotification);
            }
            //
            return Ok();
        }
        //lay root comment
        [HttpGet("get-root")]
        public async Task<IActionResult> GetRoot([FromQuery] int commentId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var response = await _commentService.GetRootComment(userId, commentId);
            Console.WriteLine(response);
            return Ok(response);
        }
    }
}
