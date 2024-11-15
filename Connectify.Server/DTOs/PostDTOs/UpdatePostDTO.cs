using Connectify.BusinessObjects.PostFeature;
using System.ComponentModel.DataAnnotations;

namespace Connectify.Server.DTOs.PostDTOs
{
    public class UpdatePostDTO
    {
        public string? Content { get; set; }
        public VisibilityLevel Visibility { get; set; }
        public List<IFormFile>? FilesAdded { get; set; }
        public List<int>? FileIdsToKeep { get; set; }
        public List<string>? TaggedFriendIds { get; set; }
        [StringLength(50)]
        public string? Feeling { get; set; }
    }
}
