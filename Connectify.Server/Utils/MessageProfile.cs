using AutoMapper;
using Connectify.BusinessObjects.ChatFeature;
using Connectify.Server.DTOs.ChatDTOs;

namespace Connectify.Server.Utils
{
    public class MessageProfile : Profile
    {
        public MessageProfile()
        {
            CreateMap<Message, MessageDTO>()
                .ForMember(dest => dest.MessageId, opt => opt.MapFrom(src => src.MessageId))
                .ForMember(dest => dest.SenderId, opt => opt.MapFrom(src => src.SenderId))
                .ForMember(dest => dest.SenderName, opt => opt.MapFrom(src => src.Sender.FullName))
                .ForMember(dest => dest.SenderAvatar, opt => opt.MapFrom(src => src.Sender.Avatar))
                .ForMember(dest => dest.ReplyToId, opt => opt.MapFrom(src => src.ReplyToId))
                .ForMember(dest => dest.ReplyToContent, opt => opt.MapFrom(src => src.ReplyToId != null ? src.ReplyToMessage.Type == MessageType.Text? TextHelper.ShrinkText(src.ReplyToMessage.Text, 15) : "[Media]" : null))
                .ForMember(dest => dest.ReplyToSender, opt => opt.MapFrom(src => src.ReplyToId != null ? src.ReplyToMessage.Sender.FullName : null))
                .ForMember(dest => dest.ReplyToType, opt => opt.MapFrom(src => src.ReplyToId != null ? src.ReplyToMessage.Type : 0))
                .ForMember(dest => dest.ReplyToDeleted, opt => opt.MapFrom(src => src.ReplyToId != null && src.ReplyToMessage.Deleted))
                .ForMember(dest => dest.ChatRoomId, opt => opt.MapFrom(src => src.ChatRoomId))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
                .ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text))
                .ForMember(dest => dest.Files, opt => opt.MapFrom(src => src.Files.Select(f => new MediaDTO { Name = f.Name, Url = f.Url })));
               

        }
    }
}
