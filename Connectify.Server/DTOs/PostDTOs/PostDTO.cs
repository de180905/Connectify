using BussinessObjects.MediaFeature;
using Connectify.BusinessObjects;
using Connectify.BusinessObjects.PostFeature;
using Connectify.Server.DTOs.ChatDTOs;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Connectify.Server.DTOs.PostDTOs
{
    [JsonDerivedType(typeof(NormalPostDTO))]
    [JsonDerivedType(typeof(GroupPostDTO))]
    public class PostDTO
    {
        public int Id { get; set; }
        public UserDTO Author { get; set; }
        public string? Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public ICollection<MediaDTO> Media { get; set; } = new List<MediaDTO>();
        public ICollection<UserDTO>? TaggedUsers { get; set; } = new List<UserDTO>();
        public ReactionDTO? ViewerReaction { get; set; } 
        public List<ReactionCount>? ReactionCountsList { get; set; } = new List<ReactionCount>();
        public string? Feeling {get; set;}
        public int CommentCount { get; set; } = 0;
        public int ShareCount { get; set; } = 0;
        public bool IsAuthor { get; set; }
    }
}
