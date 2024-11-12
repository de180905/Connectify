using Connectify.Server.DTOs;
using Connectify.Server.DTOs.AdminDTOs;

namespace Connectify.Server.Services.Abstract
{
    public interface IManageUser
    {
        Task<UserDTO?> GetUserById(string userId);
        Task<IEnumerable<UserDTO>> FilterUsers(UserFilterOptions filterOptions);
        Task<bool> LockUser(string userId);
        Task<bool> UnlockUser(string userId);
        Task<bool> DeleteUser(string userId);
        Task<bool> UpdateUser(string userId, UserDTO userDto);
    }
}
