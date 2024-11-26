using Connectify.BusinessObjects;
using Connectify.BusinessObjects.PostFeature;

namespace Connectify.Server.DTOs.UserActivityDTOs
{
    public class UserActivityResponse
    {
        public string TargetType { get; set; }
        public string Activity {  get; set; }
        public string?Content {  get; set; }
        public string? TargetUserName { get; set; }
        public ReactionType? Reaction { get; set; }
        public string TargetUrl { get; set; }    
        public DateTime Timestamp { get; set; }
    }
}
