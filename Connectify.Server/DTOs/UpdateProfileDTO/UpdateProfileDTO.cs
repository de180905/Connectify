using Connectify.BusinessObjects;
using System.ComponentModel.DataAnnotations;

namespace Connectify.Server.DTOs.UpdateProfileDTOs
{
    public class UpdateProfileDTO
    {
        [Required (ErrorMessage ="First name is required !")]
        public required string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required !")]
        public required string LastName { get; set; }          
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }

    }
}
