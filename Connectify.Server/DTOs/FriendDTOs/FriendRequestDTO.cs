namespace Connectify.Server.DTOs.FriendDTOs
{
    public class FriendRequestDTO
    {
        public string userId {  get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string avatar { get; set; }
        public bool isSent { get; set; }
    }
}
