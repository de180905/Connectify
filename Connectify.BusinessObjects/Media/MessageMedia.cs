using Connectify.BusinessObjects.ChatFeature;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessObjects.MediaFeature
{
    public class MessageMedia : Media
    {
        [ForeignKey(nameof(MessageId))]
        public int MessageId { get; set; }
        public virtual Message Message { get; set; }
    }
}
