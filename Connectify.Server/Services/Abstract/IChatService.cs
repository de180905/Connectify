﻿
using Connectify.BusinessObjects.ChatFeature;
using Connectify.Server.DTOs;
using Connectify.Server.DTOs.ChatDTOs;
using Connectify.Server.Services.FilterOptions;
using YueXiao.Utils;

namespace Connectify.Server.Services.Abstract
{
    public interface IChatService
    {
        Task<ChatRoom> CreateGroupChatAsync(string creatorId, CreateGroupChatDTO dto);
        Task<PaginatedResult<ChatRoomDTO>> GetChatRoomsForUserAsync(string userId, string searchTerm, int pageNumber, int pageSize);
        Task<int> SendTextMessageAsync(string senderId, SendTextMessageDTO dto);
        Task<int> SendSingleFileMessageAsync(string senderId, SendSingleFileMessageDTO dto);
        Task<int> SendMultiFilesMessageAsync(string senderId, SendMultiFilesMessageDTO dto);
        Task ReactToMessageAsync(string userId, ReactToMessageDTO dto);
        Task AddMemberAsync(AddMemberDTO dto);
        Task RemoveMemberAsync(RemoveMemberDTO dto);
        Task<PaginatedResult<MessageDTO>> GetMessagesAsync(string userId, ChatMessageFilterOptions options, int pageNumber, int pageSize);
        Task<int> GetPrivateChatRoomIdAsync(string currentUserId, string otherUserId);
        Task<ChatRoomDTO> GetPrivateChatRoomAsync(string currentUserId, string otherUserId);
        Task<MessageDTO> GetMessageByIdAsync(int id, string userId);
        Task<PaginatedResult<UserDTO>> GetChatRoomMembers(string currentUserId,  int chatRoomId, int pageNumber, int pageSize = -1);
        Task<ChatRoomDTO?> GetChatRoomByIdAsync(string userId, int chatRoomId);
        Task DetachMessageAsync(int messageId, string userId);
        Task DeleteMessageAsync(int messageId, string userId);
        Task SetMemberLastSeenAsync(string memId, int chatRoomId, DateTime time);
    }

}
