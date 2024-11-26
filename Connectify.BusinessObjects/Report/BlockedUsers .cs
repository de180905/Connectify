using Connectify.BusinessObjects.Authen;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Connectify.BusinessObjects.Report
{
    public class BlockedUsers
    {
        public string UserId { get; set; }
        public string BlockedUserId { get; set; }
        public DateTime BlockedDate { get; set; } = DateTime.UtcNow.ToLocalTime();
        public virtual User User { get; set; }
        public virtual User BlockedUser { get; set; }

    }
}
