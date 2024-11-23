using Connectify.BusinessObjects.Authen;
using Connectify.BusinessObjects.PostFeature;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Connectify.BusinessObjects.Report
{
    public class PostReport
    {
        public int Id { get; set; }
        [Required]
        public int PostId { get; set; }
        [Required]     
        public string ReportedByUserId { get; set; }
        [Required]    
        
        public int PostReportReasonId { get; set; }     
        public ReportStatus Status { get; set; }=ReportStatus.Resolved;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;     

        // Navigation Properties
        public virtual Post Post { get; set; }                
        public virtual User ReportedByUser { get; set; }
        public virtual PostReportReason ReportedReason { get; set; }
    }
    public enum ReportStatus
    {
        Pending,    // Báo cáo đang chờ được xử lý
        Reviewed,   // Báo cáo đã được xem xét
        Resolved    // Báo cáo đã được giải quyết
    }
}
