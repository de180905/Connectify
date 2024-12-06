using AutoMapper;
using Connectify.BusinessObjects.Authen;
using Connectify.BusinessObjects.ChatFeature;
using Connectify.Server.DTOs;
using Connectify.Server.DTOs.ChatDTOs;
using Connectify.Server.Services.Abstract;
using Microsoft.AspNetCore.Identity;

namespace Connectify.Server.Utils
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            string userId = null;
            IFriendService friendService = null;
            CreateMap<User, UserDisplayDTO>()
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Avatar, opt => opt.MapFrom(src => src.Avatar));
            CreateMap<ChatRoomMember, ChatroomMemberDTO>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.User.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.User.LastName))
                .ForMember(dest => dest.Avatar, opt => opt.MapFrom(src => src.User.Avatar))
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.ToString()));
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
                .ForMember(dest => dest.Avatar, opt => opt.MapFrom(src => src.Avatar))
                .ForMember(dest => dest.Company, opt => opt.MapFrom(src => src.Company))
                .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location))
                .ForMember(dest => dest.UserP2PStatus, opt => opt.MapFrom(src => friendService.GetUsersP2PStatus(userId, src.Id)))
                .ForMember(dest => dest.MutualFriendsCount, opt => opt.MapFrom(src => friendService.GetMutualFriendsCount(userId, src.Id)))
                .ForMember(dest => dest.MutualFriendAvatars, opt => opt.MapFrom(src => friendService.GetMutualFriendAvatars(userId, src.Id)));
            CreateMap<User, UserBasicDTO>()
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.ProfileCover, opt => opt.MapFrom(src => src.ProfileCover))
                .ForMember(dest => dest.Avatar, opt => opt.MapFrom(src => src.Avatar))
                .ForMember(dest => dest.UserP2PStatus, opt => opt.MapFrom(src => friendService.GetUsersP2PStatus(userId, src.Id)));
            CreateMap<User, UserManageDTO>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => $"{src.FirstName} {src.LastName}"))
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.LockoutEnd.HasValue && DateTimeOffset.UtcNow < src.LockoutEnd ? UserStatus.Locked : UserStatus.Active))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email));
        }
    }
}
