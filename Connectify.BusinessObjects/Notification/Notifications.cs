using Connectify.BusinessObjects.Authen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Connectify.BusinessObjects.Notification
{
    public class Notifications
    {
        public int Id { get; set; }

        // Mã người gửi (người đã thực hiện hành động dẫn đến thông báo)
        public string TriggeredByUserId { get; set; }
        public string Message { get; set; }
        public NotificationType Type { get; set; }
        public string ActionLink { get; set; }
        //public bool IsRead { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? ExpirationTime { get; set; }

        public User TriggeredByUser { get; set; }
        public ICollection<NotificationRecipient> NotificationRecipients { get; set; }
    }
    public enum NotificationType
    {
        Like,
        Comment,
        FriendRequest,
        Message,
        Mention,
        Follow
    }
}
