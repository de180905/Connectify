
﻿using Connectify.BusinessObjects.Authen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Connectify.BusinessObjects.PostFeature
{
    public class PostSave
    {
        public int PostId { get; set; }
        public string UserId { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.UtcNow.ToLocalTime();
        public Post Post { get; set; } // Navigation property
        public User User { get; set; } // Navigation property

    }
}

