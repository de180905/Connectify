using Connectify.BusinessObjects.Authen;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessObjects.GroupFeature
{
    public class GroupInvitation
    {
        [Key]
        public int InvitationId { get; set; }
        [ForeignKey(nameof(GroupId))]
        public int GroupId { get; set; }
        public virtual AppGroup Group { get; set; }
        [ForeignKey(nameof(TargetUserId))]
        public string TargetUserId { get; set; }
        public virtual User TargetUser { get; set; }
        [ForeignKey(nameof(ReferrerId))]
        public string ReferrerId { get; set; }
        public virtual User Referrer { get; set; }
        public DateTime InvitedAt { get; set; }
    }
}
