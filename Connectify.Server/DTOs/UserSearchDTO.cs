namespace Connectify.Server.DTOs
{
    public class UserSearchDTO : UserDTO
    {
        public UserP2PStatus UserP2PStatus { get; set; }
        public int MutualFriendsCount { get; set; }
        public string? Location { get; set; }
        public string? Company { get; set; }
        public List<string?> MutualFriendAvatars { get; set; }
    }
}
