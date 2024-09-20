using Connectify.BusinessObjects.PostFeature;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessObjects.MediaFeature
{
    public class PostMedia : Media
    {
        [ForeignKey(nameof(PostId))]
        public int PostId { get; set; }
        public virtual Post Post { get; set; }
    }
}
