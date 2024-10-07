using Connectify.BusinessObjects;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Connectify.Server.DTOs
{
    public class UserDescriptionDTO
    {
        public string Email { get; set; }
        public string? Bio {  get; set; }
        [StringLength(40)]
        public string FirstName { get; set; }
        [StringLength(100)]
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }
        public string? Location { get; set; }
        public string? Company { get; set; }
    }
}
