using Connectify.BusinessObjects.ChatFeature;
using System.Text.Json.Serialization;
using System.Xml.Linq;

namespace Connectify.Server.DTOs.ChatDTOs
{
    public class MessageDTO
    {
        public int MessageId { get; set; }
        public int ChatRoomId { get; set; }
        public string SenderId { get; set; }
        public string SenderName { get; set; } // New property for sender's name
        public DateTime SentAt { get; set; }
        public MessageType? Type { get; set; }
        public int? ReplyToId { get; set; } // Optional, for replies to messages
        public string? ReplyToContent { get; set; }
        public string? ReplyToSender { get; set; }
        public MessageType? ReplyToType { get; set; }
        public bool? ReplyToDeleted {  get; set; }
        public List<string> TopReactionTypes { get; set; }
        public string Text { get; set; }
        public ICollection<MediaDTO> Files { get; set; }
        public bool IsSent { get; set; }
        public bool Deleted { get; set; }
    }
}
