namespace Connectify.Server.DTOs
{
    public class UserDTO
    {
        public string Id { get; set; }               // Kiểu string hoặc GUID, tùy bạn
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Avatar { get; set; }
        public DateTime DateOfBirth { get; set; }    // Ngày sinh của người dùng
        public string Gender { get; set; }           // Giới tính của người dùng
        public string Bio { get; set; }              // Thông tin giới thiệu về người dùng
        public string Location { get; set; }         // Địa chỉ của người dùng
        public string Company { get; set; }          // Công ty người dùng làm việc
        public string Email { get; set; }            // Email của người dùng
        public string PhoneNumber { get; set; }      // Số điện thoại của người dùng
        public string UserName { get; set; }         // Tên đăng nhập của người dùng
        public DateTimeOffset? LockoutEnd { get; set; } // Thời gian tài khoản bị khóa
        public bool LockoutEnabled { get; set; }     // Trạng thái khóa tài khoản
    }
}
