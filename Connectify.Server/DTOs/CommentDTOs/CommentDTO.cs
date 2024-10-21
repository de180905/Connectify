using Connectify.BusinessObjects;

namespace Connectify.Server.DTOs.CommentDTOs
{
    public class CommentDTO
    {
        public int  CommentId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public string AuthorFullName { get; set; }
        public string AuthorId { get; set; }
        public Dictionary<ReactionType, int> ReactionCounts { get; set; } = new Dictionary<ReactionType, int>();
        public ReactionType? CurrentUserReaction { get; set; }
        public List<CommentDTO> Replies { get; set; } = new List<CommentDTO>();
    }

}
