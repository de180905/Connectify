using BussinessObjects.MediaFeature;
using Connectify.BusinessObjects.Authen;
using Connectify.BusinessObjects.CommentFeature;
using Connectify.BusinessObjects.Report;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Connectify.BusinessObjects.PostFeature
{
    public abstract class Post
    {
        public int Id { get; set; }
        public string? Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        [ForeignKey(nameof(AuthorId))]
        public string AuthorId { get; set; }
        public virtual User Author { get; set; }  // Navigation property to the user
        public virtual ICollection<PostMedia> Media { get; set; } = new List<PostMedia>();
        public virtual ICollection<PostTag> PostTags { get; set; } = new List<PostTag>();
        public virtual ICollection<PostReaction> Reactions { get; set; } = new List<PostReaction>();
        public virtual ICollection<PostReport> PostReports { get; set; }
        public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
        [StringLength(50)]
        public string? Feeling { get; set; }

    }
}
