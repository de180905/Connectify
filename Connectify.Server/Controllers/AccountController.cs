using Connectify.Server.DTOs;
using Connectify.Server.Services.Abstract;
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

        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn(SignInDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await accountRepo.SignInAsync(dto);
            if (result == null)
            {
                return Unauthorized();
            }
            return Ok(result);
        }
    }
}
