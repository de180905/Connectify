namespace Connectify.Server.DTOs.AdminDTOs

{
    public class UserFilterOptions
    {
        public bool? IsLockedOut { get; set; }       // Lọc theo trạng thái khóa tài khoản
        public string? Gender { get; set; }          // Lọc theo giới tính của người dùng
        
        
    }
}

