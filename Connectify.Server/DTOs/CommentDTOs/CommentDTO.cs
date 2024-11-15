namespace Connectify.Server.DTOs.CommentDTOs
{
    public class CommentDTO
    {
        public int CommentId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string AuthorId { get; set; }
        public string AuthorName { get; set; }
        public string AuthorAvatar { get; set; }
        public int? ParentCommentId { get; set; }
        public string ReplyToAuthorId { get; set; }
        public string ReplyToAuthorName { get; set; }
        public bool IsAuthor { get; set; }
        public int RepliesCount { get; set; }
        public int LikesCount { get; set; }
        public int DislikesCount { get; set; }
        public bool? ViewerReaction { get; set ; }
    }
}
