using Connectify.BusinessObjects.Authen;
using Connectify.BusinessObjects.ChatFeature;
using Connectify.Server.DTOs.ChatDTOs;
using Connectify.Server.Filters;
using Connectify.Server.Hubs;
using Connectify.Server.Services.Abstract;
using Connectify.Server.Services.FilterOptions;
using Connectify.Server.Services.Implement;
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
            var chatroomId = await _chatService.CreateGroupChatAsync(userId, dto);
            try
            {
                var memIds = await _chatService.GetChatroomMemberIdsAsync(chatroomId);
                var tasks = memIds.Select(async memId =>
                {
                    await _chatHubContext.Clients.User(memId).SendAsync("ChatroomUpdate", chatroomId);
                });
                Task.WhenAll(tasks);
            }
            catch
            {

            }
            return Ok();
        }

        [HttpGet("chatrooms")]
        public async Task<IActionResult> GetChatRoomsForUser([FromQuery] string? type, [FromQuery] string? searchTerm, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Assuming an extension method to get the user ID
            var chatRooms = await _chatService.GetChatRoomsForUserAsync(userId, type, searchTerm, pageNumber, pageSize);
            return Ok(chatRooms);
        }

        [HttpGet("chatrooms/{id}/members")]
        public async Task<IActionResult> GetMembersOfChatRoom(int id, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = -1)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Assuming an extension method to get the user ID
            var res = await _chatService.GetChatroomMembers(id, pageNumber, pageSize);
            return Ok(res);
        }

        [HttpPost("send-text-message")]
        public async Task<IActionResult> SendTextMessage([FromBody] SendTextMessageDTO dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var msgId = await _chatService.SendTextMessageAsync(userId, dto);
            var msg = await _chatService.GetMessageByIdAsync(msgId, userId);
            var mems = await _chatService.GetChatRoomMembers(userId, dto.ChatRoomId, 1);

            var tasks = mems.Items.Select(async mem =>
            {
                msg.IsSent = mem.Id == userId;
                await _chatHubContext.Clients.User(mem.Id).SendAsync("ReceiveMessage", msg);
            });

            Task.WhenAll(tasks);
            return Ok(new { success = true });
        }

        [HttpPost("send-single-file-message")]
        public async Task<IActionResult> SendSingleFileMessage([FromForm] SendSingleFileMessageDTO dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var msgId = await _chatService.SendSingleFileMessageAsync(userId, dto);
            var msg = await _chatService.GetMessageByIdAsync(msgId, userId);
            var mems = await _chatService.GetChatRoomMembers(userId, dto.ChatRoomId, 1);

            var tasks = mems.Items.Select(async mem =>
            {
                msg.IsSent = mem.Id == userId;
                await _chatHubContext.Clients.User(mem.Id).SendAsync("ReceiveMessage", msg);
            });
            Task.WhenAll(tasks);
            return Ok(new { success = true });
        }

        [HttpPost("send-multi-files-message")]
        public async Task<IActionResult> SendMultiFilesMessage([FromForm] SendMultiFilesMessageDTO dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var msgId = await _chatService.SendMultiFilesMessageAsync(userId, dto);
            var msg = await _chatService.GetMessageByIdAsync(msgId, userId);
            var mems = await _chatService.GetChatRoomMembers(userId, dto.ChatRoomId, 1);

            var tasks = mems.Items.Select(async mem =>
            {
                msg.IsSent = mem.Id == userId;
                await _chatHubContext.Clients.User(mem.Id).SendAsync("ReceiveMessage", msg);
            });
            Task.WhenAll(tasks);
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
            await _chatService.SetMemberLastSeenAsync(userId, options.ChatRoomId, DateTime.UtcNow);
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
                    var tasks = mems.Items.Select(async mem =>
                    {
                        await _chatHubContext.Clients.User(mem.Id).SendAsync("deleteMessage", messageId);
                    });
                    Task.WhenAll(tasks);
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

        [HttpGet("private")]
        public async Task<IActionResult> GetOrCreatePrivateChatRoom([FromQuery] string user2Id)
        {
            var user1Id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            try
            {
                int chatRoomId = await _chatService.GetPrivateChatRoomIdAsync(user1Id, user2Id);
                return Ok(chatRoomId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }
        [HttpGet("chatrooms/{id}")]
        public async Task<IActionResult> GetChatRoom(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Assuming an extension method to get the user ID
            var res = await _chatService.GetChatRoomByIdAsync(userId, id);
            return Ok(new {success = true, data = res});
        }
        [HttpDelete("chatrooms/{chatroomId}/members/{memId}")]
        public async Task<IActionResult> RemoveMember(int chatroomId, string memId)
        {
            try
            {
                var executerId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                // Call the service to remove the member
                await _chatService.RemoveChatroomMemberAsync(executerId, chatroomId, memId);

                // Return a success response
                return Ok(new { message = "Member removed successfully" });
            }
            catch (KeyNotFoundException ex)
            {
                // Handle when the member is not found
                return NotFound(new { message = ex.Message });
            }
            catch (UnauthorizedAccessException ex)
            {
                // Handle unauthorized access error
                return Unauthorized(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // Handle general exceptions
                return StatusCode(500, new { message = "An error occurred", details = ex.Message });
            }
        }
        [HttpDelete("chatrooms/{chatroomId}/leave")]
        public async Task<IActionResult> LeaveChatroom(int chatroomId)
        {
            try
            {
                var memId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                // Call the service to remove the member
                await _chatService.LeaveChatroomAsync(chatroomId, memId);

                // Return a success response
                return Ok(new { message = "Member removed successfully" });
            }
            catch (KeyNotFoundException ex)
            {
                // Handle when the member is not found
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // Handle general exceptions
                return StatusCode(500, new { message = "An error occurred", details = ex.Message });
            }
        }
        [HttpPost("chatrooms/{chatroomId}/members")]
        public async Task<IActionResult> AddMemberToChatroom(int chatroomId, [FromBody]List<string> userIds)
        {
            try
            {
                var executerId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (executerId == null)
                {
                    return Unauthorized();
                }

                await _chatService.AddUsersToChatroomAsync(executerId, chatroomId, userIds);
                return Ok(new { Message = "User added successfully" });
            }
            catch (UnauthorizedAccessException)
            {
                return Forbid();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }
        [HttpPost("chatrooms/{chatroomId}/avatar")]
        public async Task<IActionResult> UploadAvatar(
        [FromRoute] int chatroomId,
        [FromForm] UploadChatroomAvatarDTO dto)
        {
            // Assuming you have a method to get the current user ID
            var executerId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(executerId))
            {
                return Unauthorized(new { Message = "User is not authenticated." });
            }

            try
            {
                var mediaUrl = await _chatService.UploadChatroomAvatarAsync(executerId, chatroomId, dto);
                try
                {
                    var memIds = await _chatService.GetChatroomMemberIdsAsync(chatroomId);
                    var tasks = memIds.Select(async memId =>
                    {
                        await _chatHubContext.Clients.User(memId).SendAsync("ChatroomUpdate", chatroomId);
                    });
                    Task.WhenAll(tasks);
                }
                catch
                {

                }
                return Ok(new { AvatarUrl = mediaUrl });
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { Message = "Chatroom not found or access denied." });
            }
            catch (Exception ex)
            {
                // Log the exception as needed
                return StatusCode(500, new { Message = "An error occurred.", Details = ex.Message });
            }
        }

        [HttpPost("chatrooms/{chatroomId}/name")]
        public async Task<IActionResult> RenameChatroom(
        [FromRoute] int chatroomId,
        [FromBody] RenameChatroomDTO dto)
        {
            var executerId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(executerId))
            {
                return Unauthorized(new { Message = "User is not authenticated." });
            }
            try
            {
                await _chatService.RenameChatroomAsync(executerId, chatroomId, dto);
                try
                {
                    var memIds = await _chatService.GetChatroomMemberIdsAsync(chatroomId);
                    var tasks = memIds.Select(async memId =>
                    {
                        await _chatHubContext.Clients.User(memId).SendAsync("ChatroomUpdate", chatroomId);
                    });
                    Task.WhenAll(tasks);
                }
                catch
                {

                }
                return NoContent(); // Indicates the update was successful
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { Message = "Chatroom not found or access denied." });
            }
            catch (Exception ex)
            {
                // Log the exception as needed
                return StatusCode(500, new { Message = "An error occurred.", Details = ex.Message });
            }
        }
    }
}
