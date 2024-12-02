using Connectify.BusinessObjects.Authen;
using Connectify.BussinessObjects.Authen;
using Connectify.Server.DTOs;
using Connectify.Server.Services.Abstract;
using Connectify.Server.Services.FilterOptions;
using Connectify.Server.Services.Implement;
using MailKit.Search;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using YueXiao.Utils;

namespace Connectify.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = AppRole.Admin)]
    public class UserManagementController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IUserService _userService;
        private readonly IEmailSender _emailSender;

        public UserManagementController(UserManager<User> userManager, IUserService userService, IEmailSender emailSender)
        {
            _userManager = userManager;
            _userService = userService;
            _emailSender = emailSender;
        }

        // Khóa tài khoản người dùng
        [HttpPost("lock")]
        public async Task<IActionResult> LockUser([FromBody] LockUnlockRequestDTO request)
        {
            var user = await _userManager.FindByIdAsync(request.UserId);
            if (user == null)
                return NotFound(new { Message = "User not found" });

            user.LockoutEnd = DateTimeOffset.UtcNow.AddMinutes(request.LockDurationInMinutes);
            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                await _emailSender.SendEmailAsync(user.Email, "Lock account", $"We locked your account until {user.LockoutEnd}");
                return Ok(new { Message = "User locked successfully" });
            }
            return BadRequest(result.Errors);
        }
        [HttpPost("unlock")]
        public async Task<IActionResult> UnlockUser([FromBody] LockUnlockRequestDTO request)
        {
            var user = await _userManager.FindByIdAsync(request.UserId);
            if (user == null)
                return NotFound(new { Message = "User not found" });

            user.LockoutEnd = null; // Remove lock
            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
                return Ok(new { Message = "User unlocked successfully" });

            return BadRequest(result.Errors);
        }
        // Get users for admin 
        [HttpGet("users")]
        public async Task<IActionResult> GetUsersForAdminAsync([FromQuery]string? emailSearch, [FromQuery] UserStatus? status, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                // Call service to get paginated users
                var result = await _userService.GetUsersForAdminAsync(emailSearch, status, pageNumber, pageSize);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

    }
}
