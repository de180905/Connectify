using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Connectify.BusinessObjects.FriendFeature;
using Connectify.BusinessObjects.Notification;
using Connectify.BusinessObjects.Report;

namespace Connectify.BusinessObjects.Authen
{
    public class User : IdentityUser
    {
        public string? PasswordResetToken { get; set; } = "";
        public DateTime? PasswordResetTokenExpires { get; set; }
        [StringLength(40)]
        public string FirstName { get; set; }
        [StringLength(100)]
        public string LastName { get; set; }
        [NotMapped]
        public string FullName { get { return FirstName + " " + LastName; } }
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }
        public string? Bio {  get; set; }
        public string? Location { get; set; }
        public string? Company { get; set; }
        public string? Avatar { get; set; }
        public string? ProfileCover { get; set; }
        public bool IsOnline { get; set; }
        public DateTime? LastOnline { get; set; }
        // Các thông báo mà người dùng đã nhận (nhiều-nhiều)
        public ICollection<NotificationRecipient> NotificationsReceived { get; set; }

        // Các thông báo mà người dùng kích hoạt
        public ICollection<Notifications> SentNotifications { get; set; }
        public ICollection<PostReport> PostReports { get; set; }
    }

    public enum UserStatus
    {
        Active, Locked
    }
}
