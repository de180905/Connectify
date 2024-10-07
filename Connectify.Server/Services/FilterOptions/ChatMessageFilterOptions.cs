namespace Connectify.Server.Services.FilterOptions
{
    public class ChatMessageFilterOptions
    {
        public int ChatRoomId { get; set; }
        public DateTime? ToDate { get; set; }
        public DateTime? FromDate { get; set; }
    }
}
