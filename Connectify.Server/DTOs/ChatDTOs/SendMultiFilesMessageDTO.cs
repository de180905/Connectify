namespace Connectify.Server.DTOs.ChatDTOs
{
    public class SendMultiFilesMessageDTO : SendMessageDTO
    {
        public List<IFormFile> Files { get; set; } = new List<IFormFile>();
    }
}
