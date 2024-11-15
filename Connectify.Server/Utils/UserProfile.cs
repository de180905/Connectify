using AutoMapper;
using Connectify.BusinessObjects.Authen;
using Connectify.Server.DTOs;
using Connectify.Server.Services.Abstract;

namespace Connectify.Server.Utils
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            string userId = null;
            IFriendService friendService = null;
            CreateMap<User, UserDTO>()
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.ProfileCover, opt => opt.MapFrom(src => src.ProfileCover))
                .ForMember(dest => dest.Avatar, opt => opt.MapFrom(src => src.Avatar));

            CreateMap<User, UserSearchDTO>()
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Avatar, opt => opt.MapFrom(src => src.Avatar));
            CreateMap<User, UserBasicDTO>()
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.ProfileCover, opt => opt.MapFrom(src => src.ProfileCover))
                .ForMember(dest => dest.Avatar, opt => opt.MapFrom(src => src.Avatar))
                .ForMember(dest => dest.UserP2PStatus, opt => opt.MapFrom(src => friendService.GetUsersP2PStatus(userId, src.Id)));
        }
    }
}
