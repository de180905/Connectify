using Connectify.Server.DTOs;
using Connectify.Server.DTOs.CommentDTOs;
using Connectify.Server.DTOs.UpdateProfileDTO;
using Connectify.Server.DTOs.UpdateProfileDTOs;
using Microsoft.AspNetCore.Identity;

namespace Connectify.Server.Services.Abstract
{
    public interface IAccountService
    {
        Task<IdentityResult> SignUpAsync(SignUpDTO dto);
        Task<TokenDTO> SignInAsync(SignInDTO dto);
        Task<bool> ConfirmEmailAsync(string userId, string token);
        Task<bool> RequireEmailConfirmAsync(string email);

        Task<bool> UpdateProfileAsync(string userId, UpdateProfileDTO dto );
        Task<bool> ChangePasswordAsync(string userId, ChangePasswordDTO dto);
    }
}
