using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Connectify.BusinessObjects.Authen
{
    public class User : IdentityUser
    {
        [StringLength(40)]
        public string FirstName { get; set; }
        [StringLength(100)]
        public string LastName { get; set; }
        [NotMapped]
        public string FullName { get { return FirstName + " " + LastName; } }
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }
    }
}
