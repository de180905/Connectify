using Connectify.Server.DTOs;
using Connectify.Server.Services.Abstract;
using Connectify.Server.Services.Exceptions;
using Connectify.Server.Services.Implement;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Connectify.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService accountRepo;

        public AccountController(IAccountService accountRepo)
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
        [HttpPut("Settings/Description")]
        public async Task<IActionResult> UpdateDescription(UserDescriptionDTO dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await accountRepo.UpdateUserDescription(userId, dto);
            if (result.Succeeded)
            {
                return Ok(result.Succeeded);
            }
            return BadRequest(result.Errors);
        }
        [HttpGet("Settings/Description")]
        public async Task<IActionResult> GetDescription()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await accountRepo.GetUserDescription(userId);
            return Ok(result);
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
        [HttpPut("Settings/ChangePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var result = await accountRepo.ChangePasswordAsync(userId, dto);

            if (result.Succeeded)
            {
                return Ok(new { message = "Password changed successfully" });
            }

            return BadRequest(result.Errors);
        }
        [Authorize]
        [HttpGet("MyUser")]
        public async Task<IActionResult> GetMyUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var myUser = await accountRepo.GetMyUser(userId);
            return Ok(myUser);
        }
        [Authorize]
        [HttpPost("upload-avatar")]
        public async Task<IActionResult> UploadAvatar([FromForm]UploadAvatarDTO dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Get user ID from claims
            var avatarUrl = await accountRepo.UploadAvatarAsync(userId, dto);
            return Ok(new { AvatarUrl = avatarUrl });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(EmailDTO emailDTO)
        {
            try
            {
                var result = await accountRepo.SendPasswordResetLinkAsync(emailDTO.Email);

                if (result) return Ok(new { message = "Password reset link sent, please check your email!" });
                else throw new Exception("This email does not exist or has not been confirmed. Please check your email.");
            }

            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDTO resetPasswordDTO)
        {
            try
            {
                var result = await accountRepo.ResetPasswordAsync(resetPasswordDTO);
                if (result)
                {
                    return Ok(new { success = true, message = "Password reset successful." });
                }
                return BadRequest(new { error = "Invalid token." });
            }

            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
