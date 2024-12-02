namespace Connectify.Server.DTOs
{
    public class LockUnlockRequestDTO
    {
        public string UserId { get; set; }
        public int LockDurationInMinutes { get; set; } // For lock endpoint only
    }
}
