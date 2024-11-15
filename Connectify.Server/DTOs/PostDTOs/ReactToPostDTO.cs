using Connectify.BusinessObjects;
using System.ComponentModel.DataAnnotations;

namespace Connectify.Server.DTOs.PostDTOs
{
    public class ReactToPostDTO
    {
        [Required]
        public ReactionType Reaction { get; set; } // Ensure that ReactionType is a valid enum value
    }

}
