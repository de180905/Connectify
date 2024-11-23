using Connectify.BusinessObjects;
using Connectify.BusinessObjects.Notification;
using Connectify.Server.DataAccess;
using Connectify.Server.DTOs.notification;
using Connectify.Server.Hubs;
using Connectify.Server.Services.Abstract;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Connectify.Server.Services.Implement
{
    public class NotificationService : INotificationService
    {
        private readonly AppDbContext _appDbContext;
        private readonly IHubContext<ChatHub> _HubContext;
        public NotificationService(AppDbContext appDbContext, IHubContext<ChatHub> hubContext)
        {
            _appDbContext = appDbContext;
            _HubContext = hubContext;
        }

        public async Task<Notifications> CreateNotification(Notifications notification, List<string>recipientIds)
        {
            await _appDbContext.Notifications.AddAsync(notification);
            await _appDbContext.SaveChangesAsync();
            foreach (var recipientId in recipientIds)
            {
                var recipient = new NotificationRecipient
                {
                    NotificationId = notification.Id,
                    UserId = recipientId
                };
                await _appDbContext.NotificationRecipients.AddAsync(recipient);
            }
            await _appDbContext.SaveChangesAsync();
            return notification;
        }

        public async Task<Notifications> CreateNotification(Notifications notifications, string recipientId)
        {
            await _appDbContext.Notifications.AddAsync(notifications);
            await _appDbContext.SaveChangesAsync();
            var recipient = new NotificationRecipient
            {
                NotificationId = notifications.Id,
                UserId = recipientId
            };
            await _appDbContext.NotificationRecipients.AddAsync(recipient);
            await _appDbContext.SaveChangesAsync();
            return notifications;
        }

        public async Task<int> GetUnreadNotificationsCount(string userId)
        {
            int count = 0;
            count = await _appDbContext.NotificationRecipients.Where(nr => nr.UserId == userId && nr.IsRead == false).CountAsync();
            return count;
        }

        public async Task<List<GetNotificationResponse>> GetUserNotifications(string userId,int pageSize = 5, int pageNumber = 0)
        {
            return await _appDbContext.NotificationRecipients
                .Where(nr => nr.UserId == userId)
                .OrderByDescending(nr => nr.Notification.CreatedAt)
                .Include(nr => nr.Notification)
                .Include(nr => nr.Notification.TriggeredByUser)
                .Select(nr => new GetNotificationResponse
                {
                    NotificationId = nr.Notification.Id,
                    TriggeredByUserName = nr.Notification.TriggeredByUser.FullName,
                    TriggeredByUserAvatarUrl = nr.Notification.TriggeredByUser.Avatar,
                    Message = nr.Notification.Message,
                    ActionLink = nr.Notification.ActionLink,
                    CreateAt = nr.Notification.CreatedAt,
                    IsRead = nr.IsRead
                    
                    })
                .Skip(pageNumber * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task MarkNotificationAsRead(int notificationId, string userId)
        {
            var notificationRecipient = _appDbContext.NotificationRecipients.FirstOrDefault(n => n.NotificationId == notificationId && n.UserId == userId);
            if (notificationRecipient != null)
            {
                notificationRecipient.IsRead = true;
                await _appDbContext.SaveChangesAsync();
            }
        }

        public async Task MarkNotificationAsRead(string userId, int notificationId)
        {
            var notificationRecipient = await _appDbContext.NotificationRecipients
                .FirstOrDefaultAsync(nr=>nr.NotificationId==notificationId && nr.UserId==userId);
            if (notificationRecipient != null)
            {
                notificationRecipient.IsRead = true;
                await _appDbContext.SaveChangesAsync();
            }
        }

        public async Task SendNotification(string recipient, SendNotificationDTO notification)
        {
            await _HubContext.Clients.User(recipient).SendAsync("notification", notification);
        }
    }
}
