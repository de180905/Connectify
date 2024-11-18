namespace Connectify.Server.DTOs.notification
{
    public class GetNotificaitonsDto
    {
        public string UserId { get; set; }
        public int PageSize { get; set; } = 5;
        public int PageNumber { get; set; } = 0;
    }
}
