using AutoMapper;
using Connectify.BusinessObjects.CommentFeature;
using Connectify.Server.DTOs.CommentDTOs;

namespace Connectify.Server.Utils
{
    public class CommentProfile : Profile
    {
        public CommentProfile()
        {
            string userId = null;
            CreateMap<Comment, CommentDTO>()
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt))
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(src => src.UpdatedAt))
                .ForMember(dest => dest.AuthorId, opt => opt.MapFrom(src => src.Author.Id ))
                .ForMember(dest => dest.AuthorName, opt => opt.MapFrom(src => src.Author.FullName))
                .ForMember(dest => dest.AuthorAvatar, opt => opt.MapFrom(src => src.Author.Avatar))
                .ForMember(dest => dest.ReplyToAuthorId, opt => opt.MapFrom(src => src.ReplyToUser != null ? src.ReplyToUser.Id : null))
                .ForMember(dest => dest.ReplyToAuthorName, opt => opt.MapFrom(src => src.ReplyToUser != null ? src.ReplyToUser.FullName : string.Empty))
                .ForMember(dest => dest.Content, opt => opt.MapFrom(src => src.Content))
                .ForMember(dest => dest.IsAuthor, opt => opt.MapFrom(src => src.AuthorId == userId))
                .ForMember(dest => dest.RepliesCount, opt => opt.MapFrom(src => src.Replies.Count()))
                .ForMember(dest => dest.LikesCount, opt => opt.MapFrom(src => src.Reactions.Where(cr => cr.IsLike).Count()))
                .ForMember(dest => dest.DislikesCount, opt => opt.MapFrom(src => src.Reactions.Where(cr => !cr.IsLike).Count()))
                .ForMember(dest => dest.ViewerReaction, opt => opt.MapFrom(src => src.Reactions.Where(cr => cr.UserId == userId).Select(cr => (bool?)cr.IsLike).FirstOrDefault()));
        }
    }
}
