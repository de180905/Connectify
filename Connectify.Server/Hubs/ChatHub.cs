using Connectify.Server.DataAccess;
using Microsoft.AspNetCore.SignalR;

namespace Connectify.Server.Hubs
{
    public class ChatHub : Hub
    {
        private readonly AppDbContext _context;

        public ChatHub(AppDbContext context)
        {
            _context = context;
        }
        //public override async Task OnConnectedAsync()
        //{
        //    var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        //    // Get all friends and generate group IDs for private chats
        //    var chatRoomIds = _context.ChatRoomMembers.Where(cm => cm.UserId == userId).Select(cm => cm.ChatRoomId).Distinct().ToList();

        //    foreach (var id in chatRoomIds)
        //    {
        //        await Groups.AddToGroupAsync(Context.ConnectionId, id.ToString());
        //    }
        //    await base.OnConnectedAsync();
        //}
    }
}
