using Connectify.Server.DTOs;
using Connectify.Server.Services.Abstract;
using Connectify.Server.Services.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
    }
}
