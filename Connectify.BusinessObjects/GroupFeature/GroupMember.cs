using Connectify.BusinessObjects;
using Connectify.BusinessObjects.Authen;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace BussinessObjects.GroupFeature
{
    public class GroupMember
    {
        [Key]
        public int GroupMemberId { get; set; }
        [ForeignKey(nameof(GroupId))]
        public int GroupId { get; set; }
        public virtual AppGroup Group { get; set; }
        [ForeignKey(nameof(UserId))]
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public MemberRole Role { get; set; }
        public DateTime JoinedAt { get; set; }
    }
}
