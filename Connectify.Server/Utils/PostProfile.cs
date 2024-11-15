using AutoMapper;
using Connectify.BusinessObjects;
using Connectify.BusinessObjects.ChatFeature;
using Connectify.BusinessObjects.PostFeature;
using Connectify.Server.DTOs;
using Connectify.Server.DTOs.ChatDTOs;
using Connectify.Server.DTOs.PostDTOs;
using Microsoft.EntityFrameworkCore;

namespace Connectify.Server.Utils
{
    public class PostProfile : Profile
    {
        public PostProfile()
        {
            string userId = null;
            CreateMap<Post, PostDTO>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Content, opt => opt.MapFrom(src => src.Content))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt))
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(src => src.UpdatedAt))
                .ForMember(dest => dest.Author, opt => opt.MapFrom(src => src.Author))
                .ForMember(dest => dest.Media, opt => opt.MapFrom(src => src.Media.Select(md => new MediaDTO { Name = md.Name, Url = md.Url, Id = md.Id, Type=md.FileType})))
                .ForMember(dest => dest.TaggedUsers, opt => opt.MapFrom(src => src.PostTags.Select(pt => pt.User)))
                .ForMember(dest => dest.ViewerReaction, opt =>
                opt.MapFrom(src =>
                    src.Reactions
                        .Where(r => r.UserId == userId)
                        .Select(r => new ReactionDTO { Text = r.Reaction.ToString(), Value = r.Reaction })
                        .FirstOrDefault()))
                .ForMember(dest => dest.ReactionCountsList, opt => opt.MapFrom(src => src.Reactions
                    .GroupBy(r => r.Reaction)
                    .Select(g => new ReactionCount
                    {
                        ReactionType = g.Key, // This is the reaction type
                        Count = g.Count() // Counting occurrences
                    })
                    .ToList()
                ))
                .ForMember(dest => dest.CommentCount, opt => opt.MapFrom(src => src.Comments.Count))
                .ForMember(dest => dest.Feeling, opt => opt.MapFrom(src => src.Feeling))
                .ForMember(dest => dest.IsAuthor, opt => opt.MapFrom(src => src.AuthorId == userId))
                .Include<NormalPost, NormalPostDTO>();
            CreateMap<NormalPost, NormalPostDTO>()
            .ForMember(dest => dest.Visibility, opt => opt.MapFrom(src => src.Visibility));

        }
    }
}
