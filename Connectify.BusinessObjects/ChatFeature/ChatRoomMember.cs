using BussinessObjects.GroupFeature;
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
    public class ChatRoomMember
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ChatRoomId { get; set; }

        [ForeignKey(nameof(ChatRoomId))]
        public virtual ChatRoom ChatRoom { get; set; }

        [Required]
        public string UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }

        [Required]
        public DateTime JoinedAt { get; set; }

        public MemberRole? Role { get; set; } // Optional, applicable only for group chats
    }
}
