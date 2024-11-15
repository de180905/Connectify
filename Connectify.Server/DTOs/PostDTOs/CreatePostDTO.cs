using Connectify.BusinessObjects.PostFeature;
using System.ComponentModel.DataAnnotations;

namespace Connectify.Server.DTOs.PostDTOs
{
    public class CreatePostDTO
    {
        public string? Content { get; set; }
        public VisibilityLevel Visibility { get; set; }
        public List<IFormFile>? Files { get; set; }
        public List<string>? TaggedFriendIds { get; set; }
        [StringLength(50)]
        public string? Feeling { get; set; }
    }
}
