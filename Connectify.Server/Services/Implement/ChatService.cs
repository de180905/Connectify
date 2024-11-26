﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using BussinessObjects.MediaFeature;
using Connectify.BusinessObjects;
using Connectify.BusinessObjects.Authen;
using Connectify.BusinessObjects.ChatFeature;
using Connectify.Server.DataAccess;
using Connectify.Server.DTOs;
using Connectify.Server.DTOs.ChatDTOs;
using Connectify.Server.DTOs.PostDTOs;
using Connectify.Server.Services.Abstract;
using Connectify.Server.Services.FilterOptions;
using Connectify.Server.Utils;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using YueXiao.Utils;

namespace Connectify.Server.Services.Implement
{
    public class ChatService : IChatService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICloudStorageService _cloudStorageService;

        public ChatService(AppDbContext context, IMapper mapper, ICloudStorageService cloudStorageService)
        {
            _context = context;
            _mapper = mapper;
            _cloudStorageService = cloudStorageService;
        }
        public async Task<ChatRoom> CreateGroupChatAsync(string creatorId, CreateGroupChatDTO dto)
        {
            var chatRoom = new ChatRoom
            {
                Name = dto.Name,
                CreatedAt = DateTime.UtcNow,
            };
            _context.ChatRooms.Add(chatRoom);
            await _context.SaveChangesAsync();
            // Add initial members if provided
            _context.ChatRoomMembers.Add(new ChatRoomMember
            {
                ChatRoomId = chatRoom.ChatRoomId,
                UserId = creatorId,
                Role = MemberRole.Admin,
                JoinedAt = DateTime.UtcNow,
            });
            foreach (var memberId in dto.MemberIds)
            {
                _context.ChatRoomMembers.Add(new ChatRoomMember
                {
                    ChatRoomId = chatRoom.ChatRoomId,
                    UserId = memberId,
                    Role = MemberRole.Member,
                    JoinedAt = DateTime.UtcNow,
                });
            }
            await _context.SaveChangesAsync();
            return chatRoom;
        }
        public async Task<PaginatedResult<ChatRoomDTO>> GetChatRoomsForUserAsync(string userId, string searchTerm, int pageNumber, int pageSize)
        {
            var query = _context.ChatRooms
                .Where(cr => cr.Members.Any(m => m.UserId == userId));
            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(cr => (cr.Name != null && cr.Name.StartsWith(searchTerm)) ||
                      cr.Members.Any(m =>(m.UserId != userId) && (m.User.FirstName.StartsWith(searchTerm) ||
                                          m.User.LastName.StartsWith(searchTerm))));
            }
            query = query.OrderByDescending(cr => cr.Messages.Max(m => m.SentAt));
            var projectedQuery = query.ProjectTo<ChatRoomDTO>(_mapper.ConfigurationProvider, new { userId = userId });

            return await PaginationHelper.CreatePaginatedResultAsync(projectedQuery, pageNumber, pageSize);
        }
        public async Task<MessageDTO> GetMessageByIdAsync(int id, string userId)
        {
            var msg = await _context.Messages
                .Where(m => m.MessageId == id)
                .ProjectTo<MessageDTO>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();
            if (msg == null)
            {
                throw new KeyNotFoundException("no messages match");
            }
            FinalizeMessageDTO(msg, userId);
            return msg;

        }
        public async Task<int> SendTextMessageAsync(string senderId, SendTextMessageDTO dto)
        {
            if (dto.ReplyToId != null)
            {
                if (!await DoesChatRoomAndMessageMatchAsync(dto.ChatRoomId, (int)dto.ReplyToId))
                {
                    throw new Exception("sth went wrong when trying validating dto");
                }
            }
            if (!await IsUserInChatRoomAsync(dto.ChatRoomId, senderId))
            {
                throw new UnauthorizedAccessException("You have no permissions");
            }
            var message = new Message
            {
                ChatRoomId = dto.ChatRoomId,
                SenderId = senderId,
                Text = dto.Text,
                SentAt = DateTime.UtcNow,
                ReplyToId = dto.ReplyToId,
                Type = MessageType.Text,
            };
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
            return message.MessageId;
        }
        public async Task<int> SendSingleFileMessageAsync(string senderId, SendSingleFileMessageDTO dto)
        {
            if (dto.ReplyToId != null)
            {
                if (!await DoesChatRoomAndMessageMatchAsync(dto.ChatRoomId, (int)dto.ReplyToId))
                {
                    throw new Exception("sth went wrong when trying validating dto");
                }
            }
            if (!await IsUserInChatRoomAsync(dto.ChatRoomId, senderId))
            {
                throw new UnauthorizedAccessException("You have no permissions");
            }
            var message = new Message
            {
                ChatRoomId = dto.ChatRoomId,
                SenderId = senderId,
                SentAt = DateTime.UtcNow,
                ReplyToId = dto.ReplyToId,
                Type = MessageType.SingleFile
            };
            var mediaUrl = await _cloudStorageService.UploadFileAsync(dto.File);
            message.Files.Add(new MessageMedia
            {
                Name = dto.File.FileName,
                Url = mediaUrl,
            });
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
            return message.MessageId;
        }
        public async Task<int> SendMultiFilesMessageAsync(string senderId, SendMultiFilesMessageDTO dto)
        {
            if (dto.ReplyToId != null)
            {
                if (!await DoesChatRoomAndMessageMatchAsync(dto.ChatRoomId, (int)dto.ReplyToId))
                {
                    throw new Exception("sth went wrong when trying validating dto");
                }
            }
            if (!await IsUserInChatRoomAsync(dto.ChatRoomId, senderId))
            {
                throw new UnauthorizedAccessException("You have no permissions");
            }
            var message = new Message
            {
                ChatRoomId = dto.ChatRoomId,
                SenderId = senderId,
                SentAt = DateTime.UtcNow,
                ReplyToId = dto.ReplyToId,
                Type = MessageType.MultiFiles
            };
            // make sure all files are images
            if (dto.Files.Any(f => !f.ContentType.StartsWith("image/")))
            {
                throw new Exception("Invalid file type");
            }
            var urls = await _cloudStorageService.UploadFilesAsync(dto.Files);
            for (int i = 0; i < urls.Count; i++)
            {
                message.Files.Add(new MessageMedia
                {
                    Name = dto.Files[i].FileName,
                    Url = urls[i],
                });
            }
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
            return message.MessageId;
        }
        public async Task ReactToMessageAsync(string userId, ReactToMessageDTO dto)
        {
            var existingReaction = await _context.MessageReactions
                .FirstOrDefaultAsync(mr => mr.MessageId == dto.MessageId && mr.UserId == userId);
            if (existingReaction == null)
            {
                var reaction = new MessageReaction
                {
                    MessageId = dto.MessageId,
                    UserId = userId,
                    Reaction = dto.Reaction
                };
                _context.MessageReactions.Add(reaction);
            }
            else
            {
                existingReaction.Reaction = dto.Reaction;
            }
            await _context.SaveChangesAsync();
        }
        public async Task AddMemberAsync(AddMemberDTO dto)
        {
            var member = new ChatRoomMember
            {
                ChatRoomId = dto.ChatRoomId,
                UserId = dto.UserId
            };
            _context.ChatRoomMembers.Add(member);
            await _context.SaveChangesAsync();
        }
        public async Task RemoveMemberAsync(RemoveMemberDTO dto)
        {
            var member = await _context.ChatRoomMembers
                .FirstOrDefaultAsync(m => m.ChatRoomId == dto.ChatRoomId && m.UserId == dto.UserId);

            if (member != null)
            {
                _context.ChatRoomMembers.Remove(member);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<PaginatedResult<MessageDTO>> GetMessagesAsync(string userId, ChatMessageFilterOptions options, int pageNumber, int pageSize)
        {
            if (!await IsUserInChatRoomAsync(options.ChatRoomId, userId))
            {
                throw new UnauthorizedAccessException("You have no permissions");
            }
            var query = _context.Messages.AsQueryable();
            if (options.ToDate != null)
            {
                query = query.Where(m => m.SentAt < options.ToDate);
            }
            if (options.FromDate != null)
            {
                query = query.Where(m => m.SentAt > options.FromDate);
            }
            var projectedQuery = query
                .Where(m => m.ChatRoomId == options.ChatRoomId)
                .OrderByDescending(m => m.SentAt)
                .ProjectTo<MessageDTO>(_mapper.ConfigurationProvider);
            var res = await PaginationHelper.CreatePaginatedResultAsync(projectedQuery, pageNumber, pageSize);
            foreach (var item in res.Items)
            {
                FinalizeMessageDTO(item, userId);
            }
            return res;
        }
        private void FinalizeMessageDTO(MessageDTO dto, string userId)
        {
            dto.IsSent = dto.SenderId == userId;
            if (!CanUserViewMessageAsync(dto, userId))
            {
                dto.Text = null;
                dto.Files = null;
                dto.Deleted = true;
            }
            if (dto.ReplyToId != null && !CanUserViewMessageAsync(new MessageDTO { MessageId = (int)dto.ReplyToId, Deleted = (bool)dto.ReplyToDeleted}, userId))
            {
                dto.ReplyToDeleted = true;
            }
        }
        private bool CanUserViewMessageAsync(MessageDTO dto, string userId)
        {
            var res1 = !dto.Deleted;
            var res2 = !_context.MessageVisibilities.Any(mv => mv.MessageId == dto.MessageId && mv.UserId == userId);
            var res = !dto.Deleted && !_context.MessageVisibilities.Any(mv => mv.MessageId == dto.MessageId && mv.UserId == userId);
            return res;
        }
        public async Task<ChatRoomDTO> GetPrivateChatRoomAsync(string currentUserId, string otherUserId)
        {
            var chatRoomId = await GetPrivateChatRoomIdAsync(currentUserId, otherUserId);
            var query = _context.ChatRooms.Where(cr => cr.ChatRoomId == chatRoomId);
            return await ProjectToChatRoomDTO(query, currentUserId).SingleAsync();
        }
        private async Task<bool> DoesChatRoomAndMessageMatchAsync(int roomId, int messageId)
        {
            return await _context.Messages.AnyAsync(msg => msg.ChatRoomId == roomId
            && msg.MessageId == messageId);
        }
        private async Task<bool> IsUserInChatRoomAsync(int roomId, string userId)
        {
            return await _context.ChatRoomMembers.AnyAsync(crm => crm.ChatRoomId == roomId && crm.UserId == userId);
        }
        public async Task<int> GetPrivateChatRoomIdAsync(string userId1, string userId2)
        {
            var chatRoom = await _context.ChatRooms
                .Where(cr => cr.IsPrivate && cr.Members.Any(m => m.UserId == userId1) && cr.Members.Any(m => m.UserId == userId2))
                .FirstOrDefaultAsync();
            if (chatRoom != null)
            {
                return chatRoom.ChatRoomId;
            }
            chatRoom = new ChatRoom
            {
                CreatedAt = DateTime.UtcNow,
                IsPrivate = true
            };
            _context.ChatRooms.Add(chatRoom);
            await _context.SaveChangesAsync();
            _context.ChatRoomMembers.Add(new ChatRoomMember
            {
                ChatRoomId = chatRoom.ChatRoomId,
                UserId = userId1,
                Role = MemberRole.Member,
                JoinedAt = DateTime.UtcNow,
            });
            _context.ChatRoomMembers.Add(new ChatRoomMember
            {
                ChatRoomId = chatRoom.ChatRoomId,
                UserId = userId2,
                Role = MemberRole.Member,
                JoinedAt = DateTime.UtcNow,
            });
            await _context.SaveChangesAsync();
            return chatRoom.ChatRoomId;
        }
        public async Task DetachMessageAsync(int messageId, string userId)
        {
            var message = await _context.Messages
                .FirstOrDefaultAsync(m => m.MessageId == messageId);
            if (message == null)
            {
                throw new Exception("Message not found.");
            }
            var softDelete = new MessageVisibility
            {
                UserId = userId,
                MessageId = messageId,
                DeletedAt = DateTime.UtcNow
            };
            _context.MessageVisibilities.Add(softDelete);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteMessageAsync(int messageId, string userId)
        {
            var message = await _context.Messages
                .Include(m => m.Reactions)
                .Include(m => m.Files)
                .FirstOrDefaultAsync(m => m.MessageId == messageId);

            if (message == null)
            {
                throw new Exception("Message not found.");
            }
            // Owner: Soft delete the text and remove associated files but keep the message
            message.Text = null; // Clear the message text
            var filesToDelete = message.Files.Select(f => f.Url).ToList();
            // Remove all associated files
            _context.Media.RemoveRange(message.Files);
            message.Files.Clear(); // Clear the collection to avoid dangling references
            // Optionally, remove reactions too if desired
            _context.MessageReactions.RemoveRange(message.Reactions);
            message.Reactions.Clear(); // Clear the reactions
            message.Deleted = true;
            Task.Run(() => { _cloudStorageService.DeleteFilesAsync(filesToDelete); });
            await _context.SaveChangesAsync();
        }
        private IQueryable<ChatRoomDTO> ProjectToChatRoomDTO(IQueryable<ChatRoom> chatRooms, string userId)
        {
            return chatRooms.Select(cr => cr.IsPrivate
                ? new ChatRoomDTO
                {
                    ChatRoomId = cr.ChatRoomId,
                    IsPrivate = true,
                    Name = cr.Members.Where(m => m.UserId != userId).Select(m => m.User.FullName).FirstOrDefault(),
                    Avatar = cr.Members.Where(m => m.UserId != userId).Select(m => m.User.Avatar).FirstOrDefault(),
                    IsOnline = cr.Members.Any(m => m.User.IsOnline && m.UserId != userId),
                    LastOnline = cr.Members.Where(m => m.UserId != m.UserId).Select(m => m.User.LastOnline).FirstOrDefault(),
                    LastAction = cr.Messages.OrderByDescending(m => m.SentAt).Take(1).Select(m => new ActionDTO
                    {
                        ActorName = m.Sender.FirstName,
                        ActionMsg = m.Type == MessageType.Text ? TextHelper.ShrinkText(m.Text, 10) : "[File]",
                        IsActor = m.Sender.Id == userId,
                        DidAt = m.SentAt
                    }).FirstOrDefault(),
                    HasSeen = !cr.Messages.Any() || cr.Members.Where(m => m.UserId == userId).Select(m => m.LastSeen).FirstOrDefault() >= cr.Messages.Max(m => m.SentAt)
                } :
                new ChatRoomDTO
                {
                    ChatRoomId = cr.ChatRoomId,
                    IsPrivate = false,
                    Name = string.IsNullOrEmpty(cr.Name)
                        ? string.Join(", ", cr.Members
                            .Where(m => m.UserId != userId)
                            .OrderBy(m => m.JoinedAt)
                            .Take(3)
                            .Select(m => m.User.FullName))
                        : cr.Name,
                    IsOnline = cr.Members.Any(m => m.User.IsOnline && m.UserId != userId),
                    LastOnline = cr.Members.Where(m => m.UserId != m.UserId).Select(m => m.User.LastOnline).FirstOrDefault(),
                    LastAction = cr.Messages.OrderByDescending(m => m.SentAt).Take(1).Select(m => new ActionDTO
                    {
                        ActorName = m.Sender.FirstName,
                        ActionMsg = m.Type == MessageType.Text ? TextHelper.ShrinkText(m.Text, 10) : "[File]",
                        IsActor = m.Sender.Id == userId,
                        DidAt = m.SentAt
                    }).FirstOrDefault(),
                    HasSeen = cr.Members.Where(m => m.UserId == userId).Select(m => m.LastSeen).FirstOrDefault() > cr.Messages.Max(m => m.SentAt)
                });
        }

        public async Task<PaginatedResult<UserDTO>> GetChatRoomMembers(string currentUserId, int chatRoomId, int pageNumber, int pageSize = -1)
        {
            var query = _context.ChatRoomMembers
                        .Where(crm => crm.ChatRoomId == chatRoomId)
                        .Select(crm => _mapper.Map<UserDTO>(crm.User));
            return await PaginationHelper.CreatePaginatedResultAsync(query, pageNumber, pageSize);

        }
        //public async Task<PaginatedResult<UserDTO>> GetChatRoomMemberIds(string currentUserId, int chatRoomId, int pageNumber, int pageSize = -1)
        //{
        //    var query = _context.ChatRoomMembers
        //                .Where(crm => crm.ChatRoomId == chatRoomId)
        //                .Select(crm => crm.UserId);
        //    return await PaginationHelper.CreatePaginatedResultAsync(query, pageNumber, pageSize);

        //}

        public async Task<ChatRoomDTO?> GetChatRoomByIdAsync(string userId, int chatRoomId)
        {
            var query = _context.ChatRooms
                .Where(cr => cr.ChatRoomId == chatRoomId && cr.Members.Any(m => m.UserId == userId));
            var projectedQuery = query.ProjectTo<ChatRoomDTO>(_mapper.ConfigurationProvider, new { userId = userId });
            return await projectedQuery.FirstOrDefaultAsync();
        }

        public async Task SetMemberLastSeenAsync(string memId, int chatRoomId, DateTime time)
        {
            var mem = await _context.ChatRoomMembers.FirstOrDefaultAsync(cm => cm.ChatRoomId == chatRoomId && cm.UserId == memId);
            if(mem == null)
            {
                throw new KeyNotFoundException();
            }
            mem.LastSeen = time;
            await _context.SaveChangesAsync();
        }

    }
}