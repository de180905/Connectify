namespace Connectify.Server.DTOs.CommentDTOs
{
    public class ReplyCommentDTO
    {
        public int ParentCommentId { get; set; }
        public string Content { get; set; }
    }
}
