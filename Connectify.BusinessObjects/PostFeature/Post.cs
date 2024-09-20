using BussinessObjects.MediaFeature;
using Connectify.BusinessObjects.Authen;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Connectify.BusinessObjects.PostFeature
{
    public abstract class Post
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        [ForeignKey(nameof(AuthorId))]
        public string AuthorId { get; set; }
        public virtual User Author { get; set; }  // Navigation property to the user
        public virtual ICollection<PostMedia> Media { get; set; }

    }
}
