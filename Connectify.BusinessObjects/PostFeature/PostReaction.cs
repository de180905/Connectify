using Connectify.BusinessObjects.Authen;
using Connectify.BusinessObjects.CommentFeature;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Connectify.BusinessObjects.PostFeature
{
    public class PostReaction
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey(nameof(PostId))]
        public int PostId { get; set; }
        public virtual Post Post { get; set; }
        [ForeignKey(nameof(UserId))]
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public ReactionType Reaction { get; set; }

    }
}
