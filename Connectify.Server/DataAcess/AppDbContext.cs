using BussinessObjects.GroupFeature;
using BussinessObjects.MediaFeature;
using Connectify.BusinessObjects.Authen;
using Connectify.BusinessObjects.ChatFeature;
using Connectify.BusinessObjects.CommentFeature;
using Connectify.BusinessObjects.FriendFeature;
using Connectify.BusinessObjects.Notification;
using Connectify.BusinessObjects.PostFeature;
using Connectify.BusinessObjects.Report;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Connectify.Server.DataAccess
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext()
        {

        }
        public AppDbContext(DbContextOptions<AppDbContext> options)
           : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Comment>()
            .HasOne(c => c.ParentComment)
            .WithMany(c => c.Replies)
            .HasForeignKey(c => c.ParentCommentId)
            .OnDelete(DeleteBehavior.NoAction);
            builder.Entity<Message>()
                .HasMany(m => m.Files)
                .WithOne(f => f.Message)
                .HasForeignKey(f => f.MessageId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<MessageVisibility>()
            .HasOne(mv => mv.User)
            .WithMany() // Adjust as necessary based on your User entity's navigation properties
            .HasForeignKey(mv => mv.UserId)
            .OnDelete(DeleteBehavior.Restrict); // No action for User deletion

            builder.Entity<MessageVisibility>()
                .HasOne(mv => mv.Message)
                .WithMany(m => m.MessageVisibilities) // Adjust as necessary based on your Message entity's navigation properties
                .HasForeignKey(mv => mv.MessageId)
                .OnDelete(DeleteBehavior.Restrict); // No action for Message deletion
            //Post
            builder.Entity<Post>()
                .HasDiscriminator<string>("PostType")
                .HasValue<NormalPost>("Normal")
                .HasValue<GroupPost>("Group");
            builder.Entity<Post>()
                .HasOne(p => p.Author)
                .WithMany()
                .HasForeignKey(p => p.AuthorId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<PostTag>()
                .HasOne(p => p.Post)
                .WithMany()
                .HasForeignKey(p => p.PostId)
                .OnDelete(DeleteBehavior.Restrict);

            //FriendShip
            builder.Entity<FriendShip>()
                .HasOne(fs => fs.User1)
                .WithMany()
                .HasForeignKey(fs => fs.User1Id)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<FriendShip>()
                .HasOne(fs => fs.User2)
                .WithMany()
                .HasForeignKey(fs => fs.User2Id)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<FriendRequest>()
                .HasOne(fr => fr.Requester)
                .WithMany()
                .HasForeignKey(fr => fr.RequesterId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<FriendRequest>()
                .HasOne(fr => fr.Receiver)
                .WithMany()
                .HasForeignKey(fr => fr.ReceiverId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<CommentReaction>()
                .HasOne(ce => ce.User)
                .WithMany()
                .HasForeignKey(ce => ce.UserId)
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete

            builder.Entity<GroupMember>()
                .HasOne(gm => gm.User)
                .WithMany()
                .HasForeignKey(gm => gm.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            //GroupJoinRequest
            builder.Entity<GroupJoinRequest>()
                .HasOne(gr => gr.TargetUser)
                .WithMany()
                .HasForeignKey(gr => gr.TargetUserId)
                .OnDelete(DeleteBehavior.Restrict);

            //GroupInvitation
            builder.Entity<GroupInvitation>()
                .HasOne(gr => gr.Referrer)
                .WithMany()
                .HasForeignKey(gr => gr.ReferrerId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<GroupInvitation>()
                .HasOne(gr => gr.TargetUser)
                .WithMany()
                .HasForeignKey(gr => gr.TargetUserId)
                .OnDelete(DeleteBehavior.Restrict);
            //MediaFeature
            builder.Entity<Media>()
                .HasDiscriminator<string>("MediaType")
                .HasValue<PostMedia>("Post")
                .HasValue<MessageMedia>("Message");

            builder.Entity<PostMedia>()
                .HasOne(pm => pm.Post)                
                .WithMany(p => p.Media)               
                .HasForeignKey(pm => pm.PostId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<MessageReaction>()
                .HasOne(mr => mr.User)
                .WithMany()
                .HasForeignKey(mr => mr.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<PostReaction>()
                .HasOne(pr => pr.User)
                .WithMany()
                .HasForeignKey(pr => pr.UserId)
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete

            //notification
            builder.Entity<Notifications>(entity => {
                entity.ToTable("notification");
                entity.HasKey(n => n.Id)
                .HasName("notification_pkey");
                entity.Property(n => n.Id)
                .HasColumnName("notification_id");
                entity.Property(n => n.TriggeredByUserId)
                .IsRequired()
                .HasColumnName("triggered_by_user_id");
                entity.Property(n => n.Message)
                .IsRequired()
                .HasMaxLength(255)
                .HasColumnName("message");
                entity.Property(n => n.ActionLink)
                .HasMaxLength(255)
                .HasColumnName("action_link");
                entity.Property(n => n.CreatedAt)
                .HasDefaultValueSql("GETDATE()")
                .HasColumnName("create_at");
                entity.Property(n => n.ExpirationTime)
                .HasColumnName("expiration_time");
            });
            builder.Entity<Notifications>()
                .HasOne(n => n.TriggeredByUser)
                .WithMany(u => u.SentNotifications)
                .HasForeignKey(n => n.TriggeredByUserId);

            //NotificationRecipient
            builder.Entity<NotificationRecipient>(entity =>
            {
                entity.ToTable("notification_recipient");
                entity.HasKey(nr => new { nr.NotificationId, nr.UserId });
            });

            builder.Entity<NotificationRecipient>()
            .HasOne(nr => nr.Notification)
            .WithMany(n => n.NotificationRecipients)
            .HasForeignKey(nr => nr.NotificationId)
            .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<NotificationRecipient>()
            .HasOne(nr => nr.User)
            .WithMany(u => u.NotificationsReceived)
            .HasForeignKey(nr => nr.UserId)
            .OnDelete(DeleteBehavior.Restrict);
            //report 
            builder.Entity<PostReportReason>(entity =>
            {
                entity.HasKey(n => n.Id)
                .HasName("post_report_reason_pkey");
                entity.Property(e => e.Id)
                .HasColumnName("id");
                entity.Property(e => e.Description)
                .HasColumnName("description");
                entity.Property(e => e.CreatedAt) 
                .HasColumnName("created_at");
            });
            builder.Entity<PostReport>(entity =>
            {
                entity.HasKey(n => n.Id)
                .HasName("post_report_pkey");
                entity.Property(e=>e.Id)
                .HasColumnName("id");
                entity.Property(e=>e.PostId) 
                .HasColumnName("post_id");
                entity.Property(e => e.ReportedByUserId)
                .HasJsonPropertyName("reported_by_userId");
                entity.Property(e => e.PostReportReasonId)
                .HasColumnName("post_report_reason_id");
                entity.Property(e=>e.Status)
                .HasColumnName("status");
                entity.Property(e=>e.CreatedAt) 
                .HasColumnName("created_at");
                entity.Property(e=>e.UpdatedAt)
                .HasColumnName("updated_at");
            });
            builder.Entity<PostReport>()
                .HasOne(pr => pr.ReportedByUser)
                .WithMany(u => u.PostReports)
                .HasForeignKey(pr => pr.ReportedByUserId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<PostReport>()
                .HasOne(pr => pr.Post)
                .WithMany(p => p.PostReports)
                .HasForeignKey(pr => pr.PostId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<PostReport>()
                .HasOne(pr => pr.ReportedReason)
                .WithMany(prs => prs.Reports)
                .HasForeignKey(pr => pr.PostReportReasonId)
                .OnDelete(DeleteBehavior.Restrict);
            //post save
            builder.Entity<PostSave>(entity =>
            {
                entity.HasKey(ps => new {ps.PostId, ps.UserId})
                .HasName("postSave_pkey");
                entity.Property(e => e.PostId)
                .HasColumnName("post_id");
                entity.Property(e => e.UserId)
                .HasColumnName("user_id");
                entity.Property(e => e.CreateAt)
                .HasColumnName("create_at");
                
            });
            builder.Entity<PostSave>()
                .HasOne(ps => ps.Post)
                .WithMany()
                .HasForeignKey(ps => ps.PostId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<PostSave>()
                .HasOne(ps => ps.User)
                .WithMany()
                .HasForeignKey(ps => ps.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            //block user
            builder.Entity<BlockedUsers>(entity =>
            {
                entity.HasKey(bu => new { bu.UserId, bu.BlockedUserId })
                .HasName("block_user_pkey");
                entity.Property(e => e.UserId)
                .HasColumnName("user_id");
                entity.Property(e => e.BlockedUserId)
                .HasColumnName("blocked_user_idd");
                entity.Property(e => e.BlockedDate)
                .HasColumnName("blocked_date");
            });
            builder.Entity<BlockedUsers>()
                .HasOne(ps => ps.User)
                .WithMany()
                .HasForeignKey(ps => ps.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<BlockedUsers>()
                .HasOne(ps => ps.BlockedUser)
                .WithMany()
                .HasForeignKey(ps => ps.BlockedUserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Media> Media { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<FriendRequest> FriendRequests { get; set; }
        public DbSet<FriendShip> FriendShips { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<CommentReaction> CommentReactions { get; set; }
        public DbSet<AppGroup> AppGroups { get; set; }
        public DbSet<GroupSettings> GroupSettings { get; set; }
        public DbSet<GroupMember> GroupMembers { get; set; }
        public DbSet<GroupJoinRequest> GroupJoinRequests { get; set; }
        public DbSet<GroupInvitation> GroupInvitations { get; set; }
        public DbSet<ChatRoom> ChatRooms { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<MessageReaction> MessageReactions { get; set; }
        public DbSet<ChatRoomMember> ChatRoomMembers { get; set; }
        public DbSet<MessageVisibility> MessageVisibilities { get; set; }
        public DbSet<PostTag> PostTags { get; set; }
        public DbSet<PostReaction> PostReactions { get; set; }
        public DbSet<Notifications> Notifications { get; set; }
        public DbSet<NotificationRecipient> NotificationRecipients { get; set; }
        public DbSet<PostReportReason>PostReportReasons { get; set; }
        public DbSet<PostReport>PostReports { get; set; }
        public DbSet<PostSave>PostSaves { get; set; }
        public DbSet<BlockedUsers> BlockedUsers { get; set; }
    }
}
