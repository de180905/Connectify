namespace Connectify.Server.DTOs
{
    public class ResetPasswordDTO
    {
        public string Email { set; get; }
        public string Password { set; get; }
        public string Token { set; get; }
    }
}
