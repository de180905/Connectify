using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessObjects.MediaFeature
{
    public abstract class Media
    {
        public int Id { get; set; }
        public string Url { get; set; } // URL of the media file
        public string? Name { get; set; }
        [StringLength(100)]
        public string MediaType { get; set; }
        [StringLength(50)]
        public string? FileType { get; set; }
    }
}
