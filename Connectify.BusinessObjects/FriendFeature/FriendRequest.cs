using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Connectify.BusinessObjects.Authen;

namespace Connectify.BusinessObjects.FriendFeature
{
    public class FriendRequest
    {
        [Key]
        public int RequestId { get; set; }
        [ForeignKey(nameof(RequesterId))]
        public string RequesterId { get; set; }
        public virtual User Requester { get; set; }
        [ForeignKey(nameof(ReceiverId))]
        public string ReceiverId { get; set; }
        public virtual User Receiver { get; set; }
        public RequestStatus Status { get; set; } 
        public DateTime RequestDate { get; set; }
        public DateTime? ResponseDate { get; set; }
    }
}
