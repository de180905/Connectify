using Connectify.Server.DTOs.ChatDTOs;
using Connectify.Server.Hubs;
using Connectify.Server.Services.Abstract;
using Connectify.Server.Services.FilterOptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Security.Claims;

namespace Connectify.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IChatService _chatService;
        private readonly IHubContext<ChatHub> _chatHubContext;
        public ChatController(IChatService chatSerivce, IHubContext<ChatHub> chatHubContext)
        {
            _chatService = chatSerivce;
            _chatHubContext = chatHubContext;
        }

        [HttpPost("create-chatroom")]
        public async Task<IActionResult> CreateChatRoom(CreateGroupChatDTO dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var chatRoom = await _chatService.CreateGroupChatAsync(userId, dto);
            return Ok(chatRoom);
        }

        [HttpGet("chatrooms")]
        public async Task<IActionResult> GetChatRoomsForUser([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Assuming an extension method to get the user ID
            var chatRooms = await _chatService.GetChatRoomsForUserAsync(userId, "", pageNumber, pageSize);
            return Ok(chatRooms);
        }

        [HttpGet("chatrooms/{id}/members")]
        public async Task<IActionResult> GetMembersOfChatRoom(int id, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = -1)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Assuming an extension method to get the user ID
            var res = await _chatService.GetChatRoomMembers(userId, id, pageNumber, pageSize);
            return Ok(res);
        }

        [HttpPost("send-text-message")]
        public async Task<IActionResult> SendTextMessage([FromBody] SendTextMessageDTO dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var msgId = await _chatService.SendTextMessageAsync(userId, dto);
            var msg = await _chatService.GetMessageByIdAsync(msgId, userId);
            var mems = await _chatService.GetChatRoomMembers(userId, dto.ChatRoomId, 1);
            foreach (var mem in mems.Items)
            {
                msg.IsSent = mem.Id == userId;
                await _chatHubContext.Clients.User(mem.Id).SendAsync("ReceiveMessage", msg);
            }
            return Ok(new { success = true });
        }

        [HttpPost("send-single-file-message")]
        public async Task<IActionResult> SendSingleFileMessage([FromForm] SendSingleFileMessageDTO dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var msgId = await _chatService.SendSingleFileMessageAsync(userId, dto);
            var msg = await _chatService.GetMessageByIdAsync(msgId, userId);
            var mems = await _chatService.GetChatRoomMembers(userId, dto.ChatRoomId, 1);
            foreach (var mem in mems.Items)
            {
                msg.IsSent = mem.Id == userId;
                await _chatHubContext.Clients.User(mem.Id).SendAsync("ReceiveMessage", msg);
            }
            return Ok(new { success = true });
        }

        [HttpPost("send-multi-files-message")]
        public async Task<IActionResult> SendMultiFilesMessage([FromForm] SendMultiFilesMessageDTO dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var msgId = await _chatService.SendMultiFilesMessageAsync(userId, dto);
            var msg = await _chatService.GetMessageByIdAsync(msgId, userId);
            var mems = await _chatService.GetChatRoomMembers(userId, dto.ChatRoomId, 1);
            foreach (var mem in mems.Items)
            {
                msg.IsSent = mem.Id == userId;
                await _chatHubContext.Clients.User(mem.Id).SendAsync("ReceiveMessage", msg);
            }
            return Ok(new { success = true });
        }

        [HttpPost("react-to-message")]
        public async Task<IActionResult> ReactToMessage(ReactToMessageDTO dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _chatService.ReactToMessageAsync(userId, dto);
            return Ok();
        }

        [HttpPost("add-member")]
        public async Task<IActionResult> AddMember(AddMemberDTO dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _chatService.AddMemberAsync(dto);
            return Ok();
        }

        [HttpPost("remove-member")]
        public async Task<IActionResult> RemoveMember(RemoveMemberDTO dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _chatService.RemoveMemberAsync(dto);
            return Ok();
        }

        [HttpGet("get-messages")]
        public async Task<IActionResult> GetMessages([FromQuery] ChatMessageFilterOptions options, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var messages = await _chatService.GetMessagesAsync(userId, options, pageNumber, pageSize);
            return Ok(messages);
        }
        [HttpDelete("messages/{messageId}")]
        public async Task<IActionResult> DeleteMessage(int messageId, [FromQuery] string mode)
        {
            // Get the currently authenticated user's ID
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }
            try
            {
                if(mode == "detach")
                {
                    await _chatService.DetachMessageAsync(messageId, userId);
                    await _chatHubContext.Clients.User(userId).SendAsync("deleteMessage", messageId);

                }
                else if(mode == "delete")
                {
                    await _chatService.DeleteMessageAsync(messageId, userId);
                    var msg = await _chatService.GetMessageByIdAsync(messageId, userId);
                    var mems = await _chatService.GetChatRoomMembers(userId, msg.ChatRoomId, 1);
                    foreach (var mem in mems.Items)
                    {
                        await _chatHubContext.Clients.User(mem.Id).SendAsync("deleteMessage", messageId);
                    }
                } 
                // Return success response
                return NoContent(); // 204 No Content on successful deletion
            }
            catch (Exception ex)
            {
                // Log the error and return a 500 status code if something went wrong
                return StatusCode(500, "An error occurred while trying to delete the message.");
            }
        }


        [HttpGet("private-chatroom/{otherUserId}")]
        public async Task<IActionResult> GetPrivateChatRoomId(string otherUserId)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Assuming an extension method to get the user ID
            var chatRoom = await _chatService.GetPrivateChatRoomAsync(currentUserId, otherUserId);
            return Ok(chatRoom);
        }
        [HttpGet("chatrooms/{id}")]
        public async Task<IActionResult> GetChatRoom(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Assuming an extension method to get the user ID
            var res = await _chatService.GetChatRoomById(userId, id);
            return Ok(new {success = true, data = res});
        }
    }
}
