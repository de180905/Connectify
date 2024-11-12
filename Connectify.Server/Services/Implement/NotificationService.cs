using Connectify.BusinessObjects.Notification;
using Connectify.Server.DataAccess;
using Connectify.Server.DTOs.notification;
using Connectify.Server.Hubs;
using Connectify.Server.Migrations;
using Connectify.Server.Services.Abstract;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Connectify.Server.Services.Implement
{
    public class NotificationService : INotificationService
    {
        private readonly AppDbContext _appDbContext;
        private readonly IHubContext<NotificationHub> _hubContext;
        public NotificationService(AppDbContext appDbContext, IHubContext<NotificationHub> hubContext)
        {
            _appDbContext = appDbContext;
            _hubContext = hubContext;
        }

        public async Task<Notifications> CreateNotification(string triggeredByUserId, List<string> recipientUserIds, string message, string actionLink, NotificationType type)
        {
            var notification = new Notifications
            {
                TriggeredByUserId = triggeredByUserId,
                Message = message,
                ActionLink = actionLink,
                Type = type
            };
            _appDbContext.Notifications.Add(notification);
            await _appDbContext.SaveChangesAsync();

            foreach (var recipientUserId in recipientUserIds)
            {
                _appDbContext.NotificationRecipients.Add(new NotificationRecipient 
                {
                    NotificationId = notification.Id,
                    UserId = recipientUserId
                });
                await _hubContext.Clients.User(recipientUserId.ToString())
                .SendAsync("ReceiveNotification", message);
            }
            await _appDbContext.SaveChangesAsync();
            return notification;

        }

        public async Task<List<Notifications>> GetUserNotifications(string userId, int pageSize = 5, int pageNumber = 0)
        {
            return await _appDbContext.NotificationRecipients
                .Where(nr => nr.UserId == userId)
                .OrderByDescending(nr =>nr.Notification.CreatedAt)
                .Include(nr => nr.Notification)
                .Select(nr => nr.Notification)
                .Skip(pageNumber*pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task MarkNotificationAsRead(int notificationId, string userId)
        {
            var notificationRecipient = _appDbContext.NotificationRecipients.FirstOrDefault(n => n.NotificationId == notificationId && n.UserId == userId);
            if(notificationRecipient != null)
            {
                notificationRecipient.IsRead = true;
                await _appDbContext.SaveChangesAsync();
            }
        }
    }
}
