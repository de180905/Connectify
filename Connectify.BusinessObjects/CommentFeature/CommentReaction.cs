using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Connectify.BusinessObjects.Authen;

namespace Connectify.BusinessObjects.CommentFeature
{
    public class CommentReaction
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey(nameof(CommentId))]
        public int CommentId { get; set; }
        public virtual Comment Comment { get; set; }
        [ForeignKey(nameof(UserId))]
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public bool IsLike { get; set; }
        public DateTime UpdateAt { get; set; } = DateTime.UtcNow;
    }
}
