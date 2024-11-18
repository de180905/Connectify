using Connectify.BusinessObjects.Notification;

namespace Connectify.Server.DTOs.notification
{
    public class CreateNotificationDto
    {
        //string triggeredByUserId, List<string> recipientUserIds, string message, string actionLink, NotificationType type
        public string TriggeredByUserId { get; set; }
        public List<string> RecipientUserIds { get; set; }
        public string Message { get; set; }
        public string ActionLink { get; set; }
        public NotificationType Type { get; set; }
    }
}
