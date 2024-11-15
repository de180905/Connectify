using Connectify.BusinessObjects.Authen;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Connectify.BusinessObjects.ChatFeature
{
    public class ChatRoomReadReceipt
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey(nameof(UserId))]
        public string UserId { get; set; }
        public virtual User User { get; set; }  
        [ForeignKey(nameof(ChatRoomId))]
        public int ChatRoomId { get; set; }
        public virtual ChatRoom ChatRoom { get; set; }
        public DateTime ReadAt { get; set; }
    }

}
