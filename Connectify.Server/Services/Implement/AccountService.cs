using AutoMapper;
using AutoMapper.QueryableExtensions;
using Azure.Core;
using Connectify.BusinessObjects.Authen;
using Connectify.BussinessObjects.Authen;
using Connectify.Server.DataAccess;
using Connectify.Server.DTOs;
using Connectify.Server.DTOs.PostDTOs;
using Connectify.Server.Services.Abstract;
using Connectify.Server.Services.Exceptions;
using Connectify.Server.Services.FilterOptions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Encodings.Web;
using System.Web;
using YueXiao.Utils;


namespace Connectify.Server.Services.Implement { 
    public class AccountService : IAccountService
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IConfiguration configuration;
        private readonly AppDbContext dbContext;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IEmailSender emailSender;
        private readonly ICloudStorageService _cloudStorageService;
        private readonly IMapper _mapper;

        public AccountService(UserManager<User> userManager,
            SignInManager<User> signInManager, AppDbContext dbContext,
            IConfiguration configuration, RoleManager<IdentityRole> roleManager
            ,IEmailSender emailSender, ICloudStorageService cloudStorageService,
            IMapper mapper)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
            this.dbContext = dbContext;
            this.roleManager = roleManager;
            this.emailSender = emailSender;
            this._cloudStorageService = cloudStorageService;
            this._mapper = mapper;
        }
        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }
        private string GenerateAccessToken(IEnumerable<Claim> claims)
        {
            var authKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:SecretKey"]));
            var token = new JwtSecurityToken(
                issuer: configuration["JWT:ValidIssuer"],
                audience: configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddSeconds(1000000000),
                claims: claims,
                signingCredentials: new SigningCredentials(authKey, SecurityAlgorithms.HmacSha512Signature)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        private async Task SaveRefreshTokenAsync(string userId, string refreshToken)
        {
            var token = new RefreshToken
            {
                Token = refreshToken,
                ExpiryDate = DateTime.Now.AddMinutes(5),
                UserId = userId,
                Id = new Guid()
            };
            await dbContext.RefreshTokens.AddAsync(token);
            await dbContext.SaveChangesAsync();
        }
        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:SecretKey"])),
                ValidateLifetime = false // we want to get claims from expired token
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;

            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha512, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid tokasdfen");
            }

            return principal;
        }
        private async Task<bool> ValidateRefreshTokenAsync(string userId, string refreshToken)
        {
            var token = await dbContext.RefreshTokens.FirstOrDefaultAsync(t => t.UserId == userId && t.Token == refreshToken);
            if (token == null || token.ExpiryDate <= DateTime.Now)
            {
                return false;
            }

            dbContext.RefreshTokens.Remove(token);
            await dbContext.SaveChangesAsync();
            return true;
        }
        public async Task<IdentityResult> SignUpAsync(SignUpDTO dto)
        {

            var user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                UserName = dto.Email,
                DateOfBirth = dto.DateOfBirth,
                Gender = dto.Gender,
                Avatar = "https://res.cloudinary.com/dj7lju0cn/image/upload/v1730541203/Connectify/bui9wpcatrjkpjvqypoc.png",
                ProfileCover = "http://res.cloudinary.com/dj7lju0cn/image/upload/v1730547974/Connectify/l5hhwu26y65yqiutslmc.png"
            };
            var result = await userManager.CreateAsync(user, dto.Password);
            if (result.Succeeded)
            {
                if (!await roleManager.RoleExistsAsync(AppRole.NormalUser))
                {
                    await roleManager.CreateAsync(new IdentityRole(AppRole.NormalUser));
                }
                await userManager.AddToRoleAsync(user, AppRole.NormalUser);
                
            }
            return result;
        }
        public async Task<bool> RequireEmailConfirmAsync(string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return false;
            }
            if (await userManager.IsEmailConfirmedAsync(user))
            {
                return false;
            }
            try
            {
                var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
                var encodedToken = HttpUtility.UrlEncode(token.ToString());
                var callbackUrl = $"https://localhost:7094/api/Account/Confirmemail?userId={user.Id}&token={encodedToken}";
                await emailSender.SendEmailAsync(email, "Confirm your email", $"Please confirm your account by clicking this link: <a href='{callbackUrl}'>link</a>");
            }catch (Exception ex)
            {
                return false;
            }
            return true;
        }
        public async Task<bool> ConfirmEmailAsync(string userId, string token)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user == null) return false;

            var result = await userManager.ConfirmEmailAsync(user, token);
            return result.Succeeded;
        }

        public async Task<TokenDTO?> SignInAsync(SignInDTO dto)
        {
            var result = await signInManager.PasswordSignInAsync(dto.Email, dto.Password, false, false);
            if (!result.Succeeded)
            {
                return null;
            }
            var user = await userManager.FindByEmailAsync(dto.Email);
            if (user == null)
            {
                return null;
            }
            if (!await userManager.IsEmailConfirmedAsync(user))
            {
                throw new EmailNotVerifiedException();
            }
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, dto.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            var userRoles = await userManager.GetRolesAsync(user);
            foreach (var role in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, role.ToString()));
            }
            var refreshToken = GenerateRefreshToken();
            await SaveRefreshTokenAsync(user.Id, refreshToken);
            var accessToken = GenerateAccessToken(authClaims);
            return new TokenDTO { AccessToken = accessToken, RefreshToken = refreshToken };
        }
        public async Task<bool> LogoutAsync(string refreshToken)
        {
            var token = await dbContext.RefreshTokens.FirstOrDefaultAsync(t => t.Token == refreshToken);
            if (token == null)
            {
                return false;
            }

            dbContext.RefreshTokens.Remove(token);
            await dbContext.SaveChangesAsync();
            return true;
        }
        public async Task<TokenDTO?> RefreshTokenAsync(TokenDTO tokenDto)
        {
            var principal = GetPrincipalFromExpiredToken(tokenDto.AccessToken);
            var email = principal.FindFirstValue(ClaimTypes.Email);
            var user = await userManager.FindByEmailAsync(email);

            if (user == null || !await ValidateRefreshTokenAsync(user.Id, tokenDto.RefreshToken))
            {
                return null;
            }

            var accessToken = GenerateAccessToken(principal.Claims);
            var refreshToken = GenerateRefreshToken();

            await SaveRefreshTokenAsync(user.Id, refreshToken);

            return new TokenDTO { AccessToken = accessToken, RefreshToken = refreshToken };
        }
        public async Task<IdentityResult> UpdateUserDescription(string userId, UserDescriptionDTO dto)
        {
            var user = await userManager.FindByIdAsync(userId);
            if(user != null)
            {
                user.FirstName = dto.FirstName;
                user.LastName = dto.LastName;
                user.Bio = dto.Bio;
                user.Gender = dto.Gender;
                user.DateOfBirth = dto.DateOfBirth;
                user.Company = dto.Company;
                user.Location = dto.Location;
            }
            return await userManager.UpdateAsync(user);
        }
        public async Task<UserDescriptionDTO?> GetUserDescription(string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user != null)
            {
                return new UserDescriptionDTO
                {
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Location = user.Location,
                    Gender = user.Gender,
                    DateOfBirth = user.DateOfBirth,
                    Company = user.Company,
                    Bio = user.Bio,
                };
            }
            return null;
        }
        public async Task<IdentityResult> ChangePasswordAsync(string userId, ChangePasswordDTO dto)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new Exception("User not found");
            }

            if (dto.NewPassword != dto.ConfirmNewPassword)
            {
                var error = new IdentityError { Description = "Passwords do not match" };
                return IdentityResult.Failed(error);
            }

            var result = await userManager.ChangePasswordAsync(user, dto.CurrentPassword, dto.NewPassword);
            return result;
        }
        public async Task<UserDTO?> GetMyUser(string userId)
        {
            return await dbContext.Users.Where(u => u.Id == userId).
                ProjectTo<UserDTO>(_mapper.ConfigurationProvider).FirstOrDefaultAsync();
        }
        public async Task<string> UploadAvatarAsync(string userId, UploadAvatarDTO dto)
        {
            if (dto.File == null || dto.File.Length == 0 || !dto.File.ContentType.StartsWith("image/"))
            {
                throw new ArgumentException("Avatar file not valid.");
            }

            // Find the user and update their avatar URL
            var user = await dbContext.Users.FindAsync(userId);
            if (user == null)
            {
                throw new KeyNotFoundException("User not found.");
            }

            // Upload the avatar to cloud storage
            var mediaUrl = await _cloudStorageService.UploadFileAsync(dto.File);
            var oldFile = user.Avatar;
            user.Avatar = mediaUrl; // Assuming you have AvatarUrl property in your User entity
            await dbContext.SaveChangesAsync();
            if (oldFile != null)
            {
                Task.Run(() => { _cloudStorageService.DeleteFileAsync(oldFile); });
            }
            return mediaUrl; // Return the uploaded avatar URL
        }
        public async Task UploadProfileCoverAsync(string userId, IFormFile file)
        {
            if (file == null || !file.ContentType.StartsWith("image/"))
            {
                throw new ArgumentException("Only accept image");
            }
            // Find the user and update their avatar URL
            var user = await dbContext.Users.FindAsync(userId);
            if (user == null)
            {
                throw new KeyNotFoundException("User not found.");
            }
            // Upload the avatar to cloud storage
            var mediaUrl = await _cloudStorageService.UploadFileAsync(file);
            var oldFile = user.ProfileCover;
            user.ProfileCover = mediaUrl; // Assuming you have AvatarUrl property in your User entity
            await dbContext.SaveChangesAsync();
            if (oldFile != null)
            {
                Task.Run(() => { _cloudStorageService.DeleteFileAsync(oldFile); });
            }
        }

        public async Task<bool> SendPasswordResetLinkAsync(string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null || !(await userManager.IsEmailConfirmedAsync(user)))
            {
                return false;
            }
            var token = await userManager.GeneratePasswordResetTokenAsync(user);

            user.PasswordResetTokenExpires = DateTime.UtcNow.AddHours(1);
            await userManager.UpdateAsync(user);
            var encodedToken = HttpUtility.UrlEncode(token);
            var callbackUrl = $"https://localhost:5173/account/reset-password?email={user.Email}&token={encodedToken}";
            await emailSender.SendEmailAsync(email, "Reset password",
                $"Please reset your password by clicking this link: " +
                $"<a href='{callbackUrl}'>link</a><br>If you do not wish to reset your password, ignore this message. " +
                $"It will expire in 1 hours."
               );
            return true;
        }
        // phương thức reset password
        public async Task<bool> ResetPasswordAsync(ResetPasswordDTO resetPasswordDTO)
        {
            var user = await userManager.FindByEmailAsync(resetPasswordDTO.Email);
            if (user == null || user.PasswordResetTokenExpires < DateTime.UtcNow)
                return false;

            var decodedToken = HttpUtility.UrlDecode(resetPasswordDTO.Token);
            var result = await userManager.ResetPasswordAsync(user, decodedToken, resetPasswordDTO.Password);
            if (result.Succeeded)
            {
                user.PasswordResetTokenExpires = null;
                await userManager.UpdateAsync(user);
                return true;
            }
            return false;
        }
        public async Task TrackUserConnectionAsync(string userId, bool isOnline)
        {
            var user = await userManager.FindByIdAsync(userId);
            if(user != null)
            {
                user.IsOnline = isOnline;
                if(!isOnline) user.LastOnline = DateTime.UtcNow;
                await userManager.UpdateAsync(user);
                await dbContext.SaveChangesAsync();
            }
        }
    }    
}
