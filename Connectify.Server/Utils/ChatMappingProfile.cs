using AutoMapper;
using Connectify.BusinessObjects.ChatFeature;
using Connectify.Server.DTOs.ChatDTOs;

namespace Connectify.Server.Utils
{
    public class ChatMappingProfile : Profile
    {
        public ChatMappingProfile()
        {
            string userId = null;
            CreateMap<ChatRoom, ChatRoomDTO>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src =>
                    src.IsPrivate
                        ? src.Members.Where(m => m.UserId != userId)
                            .Select(m => m.User.FullName).FirstOrDefault()
                        : string.IsNullOrEmpty(src.Name)
                            ? string.Join(", ", src.Members
                                .Where(m => m.UserId != userId)
                                .OrderBy(m => m.JoinedAt)
                                .Take(3)
                                .Select(m => m.User.FullName))
                            : src.Name))
                .ForMember(dest => dest.Avatar, opt => opt.MapFrom(src =>
                    src.IsPrivate ? src.Members.Where(m => m.UserId != userId)
                        .Select(m => m.User.Avatar).FirstOrDefault() : null))
                .ForMember(dest => dest.IsOnline, opt => opt.MapFrom(src =>
                    src.Members.Any(m => m.User.IsOnline && m.UserId != userId)))
                .ForMember(dest => dest.LastOnline, opt => opt.MapFrom(src =>
                    src.Members.Where(m => m.UserId != m.UserId).Select(m => m.User.LastOnline).FirstOrDefault()))
                .ForMember(dest => dest.LastAction, opt => opt.MapFrom(src =>
                    src.Messages.OrderByDescending(m => m.SentAt).Take(1).Select(m => new ActionDTO
                    {
                        ActorName = m.Sender.FirstName,
                        ActionMsg = m.Deleted? "[deleted]" : (m.Type == MessageType.Text ? TextHelper.ShrinkText(m.Text, 10) : "[File]"),
                        IsActor = m.Sender.Id == userId,
                        DidAt = m.SentAt
                    }).FirstOrDefault()))
                .ForMember(dest => dest.HasSeen, opt => opt.MapFrom(src =>
                    !src.Messages.Any() || src.Members.Where(m => m.UserId == userId.ToString())
                        .Select(m => m.LastSeen).FirstOrDefault() >= src.Messages.Max(m => m.SentAt)));
        }
    }

}
