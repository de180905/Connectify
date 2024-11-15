namespace Connectify.Server.DTOs
{
    public class UserBasicDTO
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get { return FirstName + " " + LastName; } }
        public string? Avatar { get; set; }
        public string? ProfileCover { get; set; }
        public UserP2PStatus UserP2PStatus { get; set; }
    }
}
