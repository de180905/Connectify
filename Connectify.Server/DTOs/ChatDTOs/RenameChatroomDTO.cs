using System.ComponentModel.DataAnnotations;

namespace Connectify.Server.DTOs.ChatDTOs
{
    public class RenameChatroomDTO
    {
        [MaxLength(255)]    
        public string Name { get; set; }
    }
}
