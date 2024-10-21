using System.ComponentModel.DataAnnotations;

namespace Connectify.Server.DTOs.UpdateProfileDTO
{
    public class ChangePasswordDTO
    {
        [Required(ErrorMessage = "Current password is required")]
        public required string CurrentPassword { get; set; }

        [Required(ErrorMessage = "New password is required")]
        [StringLength(100, MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters long")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$",
            ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")]
        public required string NewPassword { get; set; }

        [Required(ErrorMessage = "Please confirm the new password")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match")]
        public required string ConfirmPassword { get; set; }
    }
}
