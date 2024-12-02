using Connectify.BusinessObjects.Authen;

namespace Connectify.Server.DTOs
{
    public class UserManageDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public List<string> Roles { get; set; }
        public UserStatus Status { get; set; }
    }

}
