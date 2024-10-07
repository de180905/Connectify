
namespace Connectify.Server.DTOs.ChatDTOs
{
    public class SendSingleFileMessageDTO : SendMessageDTO
    {
        public IFormFile File {  get; set; }
    }
}
