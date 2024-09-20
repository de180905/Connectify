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
    public class FriendShip
    {
        [Key]
        public int FriendShipId { get; set; }
        [ForeignKey(nameof(User1Id))]
        public string User1Id { get; set; }
        public virtual User User1 { get; set; }
        [ForeignKey(nameof(User2Id))]
        public string User2Id { get; set; }
        public virtual User User2 { get; set; }
        public DateTime FriendsSince { get; set; }
    }
}
