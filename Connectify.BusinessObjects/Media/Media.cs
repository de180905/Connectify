using System;
using System.Collections.Generic;
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
        public string MediaType { get; set; } // 'image' or 'video'
    }
}
