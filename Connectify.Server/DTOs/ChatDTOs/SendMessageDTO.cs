namespace Connectify.Server.DTOs.ChatDTOs
{
    public abstract class SendMessageDTO
    {
        public int ChatRoomId { get; set; }
        public int? ReplyToId { get; set; }
    }
}
