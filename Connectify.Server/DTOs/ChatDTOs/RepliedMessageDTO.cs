using Connectify.BusinessObjects.ChatFeature;

namespace Connectify.Server.DTOs.ChatDTOs
{
    public class RepliedMessageDTO
    {
        public string? ReplyToContent { get; set; }
        public string? ReplyToSender { get; set; }
        public MessageType? ReplyToType { get; set; }
    }
}
