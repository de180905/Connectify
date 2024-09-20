using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Connectify.BusinessObjects.PostFeature;
using Connectify.BusinessObjects.Authen;

namespace Connectify.BusinessObjects.CommentFeature
{
    public class Comment
    {
        [Key]
        public int CommentId { get; set; }
        [ForeignKey(nameof(PostId))]
        public int? PostId { get; set; }
        public Post? Post { get; set; }
        public string Content { get; set; }
        public string AttachmentUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string AuthorId { get; set; }
        public virtual User Author { get; set; }
        [ForeignKey(nameof(ParentCommentId))]
        public int? ParentCommentId { get; set; }
        public virtual Comment ParentComment { get; set; }
        public virtual ICollection<Comment> Replies { get; set; } = new List<Comment>();
        public virtual ICollection<CommentReaction> Reactions { get; set; } = new HashSet<CommentReaction>();
    }
}
