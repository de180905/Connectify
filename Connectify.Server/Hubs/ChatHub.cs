using Connectify.BusinessObjects.ChatFeature;
using Connectify.Server.DataAccess;
using Connectify.Server.DTOs.ChatDTOs;
using Connectify.Server.Services.Abstract;
using Connectify.Server.Services.Implement;
using Connectify.Server.Utils;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;
using System.Runtime.CompilerServices;
using System.Security.Claims;

namespace Connectify.Server.Hubs
{
    public class ChatHub : Hub
    {
        private readonly AppDbContext _context;
        private readonly IChatService _chatService;
        private readonly IAccountService _accountService;
        public ChatHub(AppDbContext context, IChatService chatService, IAccountService accountService)
        {
            _context = context;
            _chatService = chatService;
            _accountService = accountService;
        }
        public override async Task OnConnectedAsync()
        {
            var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId != null)
            {
                try
                {
                    await _accountService.TrackUserConnectionAsync(userId, true);
                }
                catch
                {

                }
            }

        }
        public async Task<ChatRoomDTO> AcknowledgeMessage(int chatRoomId, bool hasSeen)
        {
            var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (hasSeen)
            {
                await _chatService.SetMemberLastSeenAsync(userId, chatRoomId, DateTime.UtcNow);
            }
            var chatroom = await _chatService.GetChatRoomByIdAsync(userId, chatRoomId);
            return chatroom;
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId != null)
            {
                try
                {
                    await _accountService.TrackUserConnectionAsync(userId, false);
                }
                catch
                {

                }
            }
        }
    }
}
