using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Connectify.BusinessObjects.Authen;

namespace Connectify.BusinessObjects
{
    public class Notification
    {
        [Key]
        public int NotificationId { get; set; } // Primary Key
        [ForeignKey(nameof(UserId))]
        public int UserId { get; set; }
        public User User { get; set; } // Navigation property to AppUser

        public string Content { get; set; }
        public bool IsRead { get; set; } = false;
        // The type of entity that triggered the notification (e.g., Post, Comment, FriendRequest)
        public string EntityType { get; set; }
        // The ID of the entity that triggered the notification (e.g., PostId, CommentId)
        public int EntityId { get; set; }
        public string DestinationUrl { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

}
