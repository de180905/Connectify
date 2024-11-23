namespace Connectify.Server.DTOs.notification
{
    public class SendNotificationDTO
    {
        public int NotificationId { get; set; }
        public string TriggeredByUserName {  get; set; }
        public string TriggeredByUserAvatarUrl { get; set; }
        public string ActionLink {  get; set; }
        public string Message { get; set; }
    }
}
