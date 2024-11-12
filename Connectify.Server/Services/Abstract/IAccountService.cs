using Connectify.Server.DTOs;
using Microsoft.AspNetCore.Identity;

namespace Connectify.Server.Services.Abstract
{
    public interface IAccountService
    {
        Task<IdentityResult> SignUpAsync(SignUpDTO dto);
        Task<TokenDTO> SignInAsync(SignInDTO dto);
        Task<bool> ConfirmEmailAsync(string userId, string token);
        Task<bool> RequireEmailConfirmAsync(string email);
        Task<bool> SendPasswordResetLinkAsync(string email);
        Task<bool> ResetPasswordAsync(ResetPasswordDTO resetPasswordDTO);

    }
}
