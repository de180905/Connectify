namespace Connectify.Server.DTOs.ChatDTOs
{
    public class ActionDTO
    {
        public string ActorName { get; set; }
        public string ActionMsg { get; set; }
        public bool IsActor { get; set; }
        public DateTime DidAt { get; set; }
    }
}
