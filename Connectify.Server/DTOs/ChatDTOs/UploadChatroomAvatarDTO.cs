using System.ComponentModel.DataAnnotations;

namespace Connectify.Server.DTOs.ChatDTOs
{
    public class UploadChatroomAvatarDTO
    {
        public IFormFile? File { get; set; }
    }
}
