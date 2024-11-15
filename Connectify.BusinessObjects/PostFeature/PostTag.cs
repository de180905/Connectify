using Connectify.BusinessObjects.Authen;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Connectify.BusinessObjects.PostFeature
{
    public class PostTag
    {
        [Key] 
        public int Id { get; set; }
        [ForeignKey(nameof(PostId))]
        public int PostId { get; set; }
        public Post Post { get; set; }
        [ForeignKey(nameof(UserId))]
        public string UserId { get; set; }
        public User User { get; set; }
    }

}
