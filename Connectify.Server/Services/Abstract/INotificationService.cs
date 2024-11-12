

using Connectify.BusinessObjects.Notification;
using Connectify.Server.DTOs.notification;
using Connectify.Server.Services.Implement;
using Microsoft.AspNetCore.Mvc;

namespace Connectify.Server.Services.Abstract
{
    public interface INotificationService
    {
        Task<Notifications> CreateNotification(string triggeredByUserId, List<string>recipientUserIds, string message, string actionLink, NotificationType type);
        Task MarkNotificationAsRead(int notificationId, string userId);
        Task<List<Notifications>> GetUserNotifications(string userId, int pageSize = 0, int pageNumber = 5);
    }
}
