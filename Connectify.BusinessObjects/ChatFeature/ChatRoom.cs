using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Connectify.BusinessObjects.ChatFeature
{
    public class ChatRoom
    {
        [Key]
        public int ChatRoomId { get; set; }
        public string? Name { get; set; } // For group chats
        public DateTime CreatedAt { get; set; }
        public virtual ICollection<ChatRoomMember> Members { get; set; } = new List<ChatRoomMember>();
        public virtual ICollection<Message> Messages { get; set; } = new List<Message>();
        public bool IsPrivate { get; set; }
    }
}
