using Connectify.BusinessObjects;

namespace Connectify.Server.DTOs.CommentDTOs
{
    public class AddReactionDTO
    {
        public int CommentId { get; set; }
        public ReactionType Reaction { get; set; }
    }
}
