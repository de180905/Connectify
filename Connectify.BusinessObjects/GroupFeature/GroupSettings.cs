using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessObjects.GroupFeature
{
    public class GroupSettings
    {
        [Key]
        public int GroupSettingsId { get; set; }
        [ForeignKey(nameof(GroupId))]
        public int GroupId { get; set; } // Foreign key to Group entity
        public virtual AppGroup Group { get; set; }
        public bool IsPostApprovalRequired { get; set; } = false;
        public bool IsMembershipApprovalRequired { get; set; } = true;
    }
}
