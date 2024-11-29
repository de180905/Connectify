namespace Connectify.Server.DTOs.UserActivityDTOs
{
    public class UserActivityGroupedByDateResponse
    {
        public string Date { get; set; }
        public List<UserActivityResponse> Activities { get; set; }
    }
}
