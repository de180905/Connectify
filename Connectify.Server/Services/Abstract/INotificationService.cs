using Connectify.BusinessObjects;
using Connectify.BusinessObjects.Notification;
using Connectify.Server.DTOs.notification;

namespace Connectify.Server.Services.Abstract
{
    public interface INotificationService
    {
        Task<Notifications> CreateNotification(Notifications notifications, List<string> recipientIds);
        Task<Notifications> CreateNotification(Notifications notifications, string recipientId);
        Task MarkNotificationAsRead(int notificationId, string userId);
        Task<List<GetNotificationResponse>> GetUserNotifications(string userId, int pageSize = 0, int pageNumber = 5);
        Task SendNotification(string recipient, SendNotificationDTO notification);
        Task<int> GetUnreadNotificationsCount(string userId);
        Task MarkNotificationAsRead(string userId, int notificationId);
    }
}
