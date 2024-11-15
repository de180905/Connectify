using Connectify.Server.DTOs;
using Connectify.Server.Services.FilterOptions;
using Microsoft.AspNetCore.Identity;
using YueXiao.Utils;

namespace Connectify.Server.Services.Abstract
{
    public interface IAccountService
    {
        Task<IdentityResult> SignUpAsync(SignUpDTO dto);
        Task<TokenDTO> SignInAsync(SignInDTO dto);
        Task<bool> ConfirmEmailAsync(string userId, string token);
        Task<bool> RequireEmailConfirmAsync(string email);
        Task<IdentityResult> UpdateUserDescription(string userId, UserDescriptionDTO dto);
        Task<UserDescriptionDTO?> GetUserDescription(string userId);
        Task<IdentityResult> ChangePasswordAsync(string userId, ChangePasswordDTO dto);
        Task<UserDTO> GetMyUser(string userId);
        Task<string> UploadAvatarAsync(string userId, UploadAvatarDTO dto);
        Task<bool> SendPasswordResetLinkAsync(string email);
        Task<bool> ResetPasswordAsync(ResetPasswordDTO resetPasswordDTO);
        Task UploadProfileCoverAsync(string userId, IFormFile file);
        Task TrackUserConnectionAsync(string userId, bool isOnline);
    }
}
