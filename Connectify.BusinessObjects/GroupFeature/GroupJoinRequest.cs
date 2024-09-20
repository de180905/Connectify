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
    public class GroupJoinRequest
    {
        [Key]
        public int JoinRequestId { get; set; }
        [ForeignKey(nameof(GroupId))]
        public int GroupId { get; set; }
        public virtual AppGroup Group { get; set; }
        [ForeignKey(nameof(TargetUserId))]
        public string TargetUserId { get; set; }
        public virtual User TargetUser { get; set; }
        public RequestStatus Status { get; set; }
        public DateTime RequestedAt { get; set; }
        public virtual bool IsPendingRequest()
        {
            return Status == RequestStatus.Pending;
        }
    }

}
