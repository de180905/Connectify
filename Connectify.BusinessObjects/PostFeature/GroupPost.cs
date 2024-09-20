using BussinessObjects.GroupFeature;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Connectify.BusinessObjects.PostFeature
{
    public class GroupPost : Post
    {
        [ForeignKey(nameof(GroupId))]
        public int GroupId { get; set; }
        public virtual AppGroup Group { get; set; }
        public bool IsAnonymous { get; set; }

    }
}
