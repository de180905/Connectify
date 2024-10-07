namespace Connectify.Server.DTOs.ChatDTOs
{
    public class ChatRoomDTO
    {
        public int ChatRoomId { get; set; }
        public bool IsPrivate { get; set; }
        public string Name { get; set; } // Group name or other user's name
        public string Avatar { get; set; } // Group avatar or other user's avatar
    }
}
