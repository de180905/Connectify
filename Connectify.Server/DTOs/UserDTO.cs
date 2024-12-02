using Connectify.BussinessObjects.Authen;

namespace Connectify.Server.DTOs
{
    public class UserDTO
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get { return FirstName + " " + LastName; } }
        public string? Avatar { get; set; }
        public string? ProfileCover { get; set; }
        public List<string> Roles { get; set;}
    }
}
