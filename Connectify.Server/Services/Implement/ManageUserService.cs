using AutoMapper;
using Connectify.BusinessObjects;
using Connectify.BusinessObjects.Authen;
using Connectify.Server.DataAccess;
using Connectify.Server.DTOs;
using Connectify.Server.DTOs.AdminDTOs;  
using Connectify.Server.Services.Abstract;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Connectify.Server.Services.Implement
{
    public class ManageUserService : IManageUser
    {
        private readonly UserManager<User> _userManager;
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public ManageUserService(UserManager<User> userManager, AppDbContext dbContext, IMapper mapper)
        {
            _userManager = userManager;
            _dbContext = dbContext;
            _mapper = mapper;
        }

        // Lấy thông tin người dùng dựa trên userId
        public async Task<UserDTO?> GetUserById(string userId)
        {
            var user = await _dbContext.Users.Where(u => u.Id == userId)
                                             .Select(u => new UserDTO
                                             {
                                                 Id = u.Id,
                                                 FirstName = u.FirstName,
                                                 LastName = u.LastName,
                                                 Avatar = u.Avatar
                                             })
                                             .FirstOrDefaultAsync();

            if (user == null)
            {
                return null;
            }

            return user;
        }

        // Lọc người dùng dựa trên các tiêu chí từ UserFilterOptions
        public async Task<IEnumerable<UserDTO>> FilterUsers(UserFilterOptions filterOptions)
        {
            var query = _dbContext.Users.AsQueryable();

            // Lọc theo IsLockedOut
            if (filterOptions.IsLockedOut.HasValue)
            {
                query = query.Where(u => (u.LockoutEnd != null) == filterOptions.IsLockedOut.Value);
            }

            // Lọc theo Gender
            if (!string.IsNullOrEmpty(filterOptions.Gender))
            {
                if (Enum.TryParse(typeof(Gender), filterOptions.Gender, out var genderEnum))
                {
                    query = query.Where(u => u.Gender == (Gender)genderEnum);
                }
                else
                {
                    throw new Exception("Invalid gender value");
                }
            }


            // Thực hiện chuyển đổi dữ liệu
            var users = await query.ToListAsync();

            // Chuyển đổi từ User sang UserDTO
            var userDtos = users.Select(u => new UserDTO
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Avatar = u.Avatar
            });

            return userDtos;
        }


        // Khóa tài khoản người dùng
        public async Task<bool> LockUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return false;
            }

            user.LockoutEnd = DateTimeOffset.UtcNow.AddYears(100); // Khóa vô thời hạn
            var result = await _userManager.UpdateAsync(user);
            return result.Succeeded;
        }

        // Mở khóa tài khoản người dùng
        public async Task<bool> UnlockUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return false;
            }

            user.LockoutEnd = null; // Mở khóa tài khoản
            var result = await _userManager.UpdateAsync(user);
            return result.Succeeded;
        }

        // Xóa tài khoản người dùng
        public async Task<bool> DeleteUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return false;
            }

            var result = await _userManager.DeleteAsync(user);
            return result.Succeeded;
        }

        // Cập nhật thông tin tài khoản người dùng
        public async Task<bool> UpdateUser(string userId, UserDTO userDto)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new Exception("User not found");
            }

            // Cập nhật các trường nếu có
            if (!string.IsNullOrEmpty(userDto.FirstName))
            {
                user.FirstName = userDto.FirstName;
            }

            if (!string.IsNullOrEmpty(userDto.LastName))
            {
                user.LastName = userDto.LastName;
            }

            if (!string.IsNullOrEmpty(userDto.Avatar))
            {
                user.Avatar = userDto.Avatar;
            }

            if (userDto.DateOfBirth != DateTime.MinValue)
            {
                user.DateOfBirth = userDto.DateOfBirth;
            }

            if (!string.IsNullOrEmpty(userDto.Gender))
            {
                if (Enum.TryParse<Gender>(userDto.Gender, out var parsedGender))
                {
                    user.Gender = parsedGender;
                }
                else
                {
                    throw new Exception("Invalid gender value");
                }
            }

            // Cập nhật email nếu có
            if (!string.IsNullOrEmpty(userDto.Email))
            {
                var existingUser = await _userManager.FindByEmailAsync(userDto.Email);
                if (existingUser != null && existingUser.Id != userId)
                {
                    throw new Exception("Email already in use by another user");
                }

                var token = await _userManager.GenerateChangeEmailTokenAsync(user, userDto.Email);
                var emailUpdateResult = await _userManager.ChangeEmailAsync(user, userDto.Email, token);
                if (!emailUpdateResult.Succeeded)
                {
                    throw new Exception("Failed to update email");
                }

                // Nếu email được cập nhật thành công, cũng cập nhật UserName (nếu hệ thống sử dụng email làm UserName)
                user.UserName = userDto.Email;
            }

            // Cập nhật thông tin còn lại
            var result = await _userManager.UpdateAsync(user);
            return result.Succeeded;
        }




    }
}
