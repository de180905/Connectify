using Connectify.Server.DTOs;
using Microsoft.AspNetCore.Identity;

namespace Connectify.Server.Services.Abstract
{
    public interface IAccountService
    {
        Task<IdentityResult> SignUpAsync(SignUpDTO dto);
        Task<TokenDTO> SignInAsync(SignInDTO dto);
    }
}
