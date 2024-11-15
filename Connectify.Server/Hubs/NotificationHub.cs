using CloudinaryDotNet;
using Connectify.Server.DataAccess;
using Connectify.Server.Services.Abstract;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace Connectify.Server.Hubs
{
    public class NotificationHub : Hub
    {
        private readonly AppDbContext _context;
        private readonly IAccountService _accountService;
        public NotificationHub(AppDbContext context, IAccountService accountService)
        {
            _context = context;
            _accountService = accountService;
        }
        public override async Task OnConnectedAsync()
        {
            var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if(userId != null)
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
