using Connectify.BusinessObjects;

namespace Connectify.Server.DTOs.CommentDTOs
{
    public class CreateCommentDTO

    {  
        public string Content { get; set; }  
        public string AttachmentUrl { get; set; } = "";
        public int? ParentCommentId { get; set; }
    }

}
