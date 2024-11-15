using Connectify.BusinessObjects;

namespace Connectify.Server.DTOs
{
    public class ReactionCount
    {
        public ReactionType ReactionType { get; set; }
        public int Count { get; set; } = 0;
    }
}
