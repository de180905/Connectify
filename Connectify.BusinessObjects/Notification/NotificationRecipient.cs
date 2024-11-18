using Connectify.BusinessObjects.Authen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Connectify.BusinessObjects.Notification
{
    public class NotificationRecipient
    {
        public int NotificationId { get; set; }  // Mã thông báo
        public Notifications Notification { get; set; }

        public string UserId { get; set; }  // Mã người nhận
        public User User { get; set; }

        public bool IsRead { get; set; } = false;
    }

}
