using Connectify.Server.DTOs.notification;
using Connectify.Server.Services.Abstract;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Connectify.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationController(INotificationService notificationService) 
        {
            _notificationService = notificationService;
        }

        [HttpGet("get-notifications")]
        public async Task<IActionResult> GetNotifications([FromQuery] int pageSize = 5, [FromQuery] int pageNumber = 0)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                Console.WriteLine($"User id: {userId}");
                if (string.IsNullOrEmpty(userId))
                {
                    return BadRequest(new { error = "User ID not found in token." });
                }             
                var notifications = await _notificationService.GetUserNotifications(userId, pageSize, pageNumber);
                return Ok(notifications);
            }
            catch (Exception ex)
            {
                return BadRequest(new {error = ex.Message });
            }
        }
        [HttpPost("create-notification")]
        public async Task<IActionResult> CreateNotification([FromBody] CreateNotificationDto request)
        {
            var notification = await _notificationService.CreateNotification(
                request.TriggeredByUserId,
                request.RecipientUserIds,
                request.Message,
                request.ActionLink,
                request.Type
            );

            return Ok(notification);
        }
    }
}
