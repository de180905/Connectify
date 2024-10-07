

using Connectify.BusinessObjects;

namespace Connectify.Server.DTOs.ChatDTOs
{
    public class ReactToMessageDTO
    {
        public int MessageId { get; set; }
        public ReactionType Reaction { get; set; }
    }
}
