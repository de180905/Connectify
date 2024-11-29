namespace Connectify.Server.DTOs
{
    public class UserDisplayDTO
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get { return FirstName + " " + LastName; } }
        public string? Avatar { get; set; }
    }
}
