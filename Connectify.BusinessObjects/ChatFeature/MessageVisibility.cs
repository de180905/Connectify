using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Connectify.BusinessObjects.Authen;

namespace Connectify.BusinessObjects.ChatFeature
{
    public class MessageVisibility
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; } // The user who soft deleted the message
        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }

        [Required]
        public int MessageId { get; set; } // The message that was soft deleted
        [ForeignKey(nameof(MessageId))]
        public virtual Message Message { get; set; }

        public DateTime DeletedAt { get; set; } // Time when the message was soft deleted
    }
}
