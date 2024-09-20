using BussinessObjects.MediaFeature;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Connectify.BusinessObjects.Authen;

namespace Connectify.BusinessObjects.ChatFeature
{
    public class Message
    {
        [Key]
        public int MessageId { get; set; }

        [Required]
        public int ChatRoomId { get; set; }

        [ForeignKey(nameof(ChatRoomId))]
        public virtual ChatRoom ChatRoom { get; set; }

        [Required]
        public string SenderId { get; set; }

        [ForeignKey(nameof(SenderId))]
        public virtual User Sender { get; set; }
        public string? Text { get; set; }
        public DateTime SentAt { get; set; }

        public virtual ICollection<MessageReaction> Reactions { get; set; } = new List<MessageReaction>();
        public virtual ICollection<MessageMedia> Files { get; set; } = new List<MessageMedia>();
        public int? ReplyToMessageId { get; set; } // Optional, for replies to messages

        [ForeignKey(nameof(ReplyToMessageId))]
        public virtual Message ReplyToMessage { get; set; }
    }
}
