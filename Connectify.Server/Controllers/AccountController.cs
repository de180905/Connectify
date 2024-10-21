using Connectify.BusinessObjects.Authen;
using Connectify.Server.DTOs;
using Connectify.Server.DTOs.UpdateProfileDTO;
using Connectify.Server.DTOs.UpdateProfileDTOs;
using Connectify.Server.Services.Abstract;
using Connectify.Server.Services.Exceptions;
using Connectify.Server.Services.Implement;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Connectify.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService accountRepo;
        public AccountController(IAccountService accountRepo, UserManager<User> userManager)
        {
            this.accountRepo = accountRepo;         
        }

        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp(SignUpDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await accountRepo.SignUpAsync(dto);
            if (result.Succeeded)
            {
                return Ok(result.Succeeded);
            }
            return BadRequest(result.Errors);
        }
        [HttpGet("Confirmemail")]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            var result = await accountRepo.ConfirmEmailAsync(userId, token);
            if (result)
            {
                return Ok("Email confirmed successfully.");
            }
            return BadRequest("Email confirmation failed.");
        }
        [HttpGet("RequireEmailConfirm/{email}")]
        public async Task<IActionResult> RequireEmailConfirm(string email)
        {
            var result = await accountRepo.RequireEmailConfirmAsync(email);
            if (result)
            {
                return Ok(new
                {
                    success = true,
                    message = "please check your inbox"
                });
            }
            return BadRequest(new
            {
                success = false,
                message = "something went wrong"
            });
        }
        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn(SignInDTO dto)
        {
            TokenDTO result = null;
            try
            {
                result = await accountRepo.SignInAsync(dto);
            }catch(EmailNotVerifiedException)
            {
                return Ok(new {needEmailVerified = true});
            }
            if (result == null)
            {
                return Unauthorized(new {message = "Wrong Email or Password"});
            }
            return Ok(result);
        }

        // Update profile
        [HttpPut("UpdateProfile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDTO dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized(new { massage = "User does not exist !" });
            }
            try
            {
                var result = await accountRepo.UpdateProfileAsync(userId, dto);
                return result ? Ok(new { message = "Update information successfully." }) : BadRequest();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
           

        }
        [HttpPut("ChangePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDTO dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);            
            if(userId == null)
            {
                return Unauthorized(new {message="You are not logged in or User does not exsit ! "});
            }
            try
            {
                var result = await accountRepo.ChangePasswordAsync(userId, dto);
                return result ? Ok(new { message = "Password changed successfully." }) : BadRequest(new { message = "Failed to change password." });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }
        
    }
}
