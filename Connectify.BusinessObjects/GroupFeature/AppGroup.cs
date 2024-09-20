using Connectify.BusinessObjects.Authen;
using Connectify.BusinessObjects.PostFeature;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessObjects.GroupFeature
{
    public class AppGroup
    {
        [Key]
        public int GroupId { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        public bool IsPrivate { get; set; }
        [ForeignKey(nameof(CreatedById))]
        public string CreatedById { get; set; }
        public virtual User CreatedBy { get; set; }
        public int SettingsId { get; set; }
        public DateTime CreatedAt { get; set; }
        public virtual GroupSettings GroupSettings { get; set; }
        public virtual ICollection<GroupMember> Members { get; set; } = new HashSet<GroupMember>();
        public virtual ICollection<GroupPost> Posts { get; set; } = new HashSet<GroupPost>();
        public virtual ICollection<GroupJoinRequest> Requests { get; set; } = new HashSet<GroupJoinRequest>();
    }
}
