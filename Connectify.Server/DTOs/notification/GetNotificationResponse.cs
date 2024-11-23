namespace Connectify.Server.DTOs.notification
{
    public class GetNotificationResponse
    {
        public int NotificationId { get; set; }
        public string TriggeredByUserName { get; set; }
        public string TriggeredByUserAvatarUrl { get; set; }
        public string ActionLink { get; set; }
        public string Message { get; set; }
        public DateTime CreateAt { get; set; }
        public bool IsRead { get; set; }
    }
}
