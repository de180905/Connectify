using Connectify.Server.DTOs;
using Connectify.Server.DTOs.AdminDTOs;
using Connectify.Server.Services.Abstract;
using Microsoft.AspNetCore.Mvc;

namespace Connectify.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserManagementController : ControllerBase
    {
        private readonly IManageUser _manageUserService;

        public UserManagementController(IManageUser manageUserService)
        {
            _manageUserService = manageUserService;
        }

        // Lấy thông tin người dùng theo ID
        [HttpGet("GetUserById/{userId}")]
        public async Task<IActionResult> GetUserById(string userId)
        {
            var user = await _manageUserService.GetUserById(userId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // Lọc người dùng dựa trên các tiêu chí
        [HttpPost("FilterUsers")]
        public async Task<IActionResult> FilterUsers([FromBody] UserFilterOptions filterOptions)
        {
            var users = await _manageUserService.FilterUsers(filterOptions);
            return Ok(users);
        }

        // Khóa tài khoản người dùng
        [HttpPost("LockUser/{userId}")]
        public async Task<IActionResult> LockUser(string userId)
        {
            var result = await _manageUserService.LockUser(userId);
            if (!result)
            {
                return BadRequest("Unable to lock user.");
            }
            return Ok();
        }

        // Mở khóa tài khoản người dùng
        [HttpPost("UnlockUser/{userId}")]
        public async Task<IActionResult> UnlockUser(string userId)
        {
            var result = await _manageUserService.UnlockUser(userId);
            if (!result)
            {
                return BadRequest("Unable to unlock user.");
            }
            return Ok();
        }

        // Xóa tài khoản người dùng
        [HttpDelete("DeleteUser/{userId}")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            var result = await _manageUserService.DeleteUser(userId);
            if (!result)
            {
                return BadRequest("Unable to delete user.");
            }
            return Ok();
        }

        // Cập nhật thông tin người dùng
        [HttpPut("UpdateUser/{userId}")]
        public async Task<IActionResult> UpdateUser(string userId, [FromBody] UserDTO userDto)
        {
            var result = await _manageUserService.UpdateUser(userId, userDto);
            if (!result)
            {
                return BadRequest("Unable to update user.");
            }
            return Ok();
        }
    }
}
