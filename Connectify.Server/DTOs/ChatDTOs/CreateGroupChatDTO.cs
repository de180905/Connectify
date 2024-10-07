namespace Connectify.Server.DTOs.ChatDTOs
{
    public class CreateGroupChatDTO
    {
        public string Name { get; set; }
        public List<string> MemberIds { get; set; }
    }
}
