using System.ComponentModel.DataAnnotations;
//www.macoratti.net/13/12/c_vdda.htm

namespace Backend.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Username is required", AllowEmptyStrings = false)]
        [StringLength(100)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Email is required", AllowEmptyStrings = false)]
        [EmailAddress]
        [RegularExpression(".+\\@.+\\..+", ErrorMessage = "Please provide a valid email...")]
        public string Email { get; set; }

        [Required]
        [StringLength(100)]
        public string Password { get; set; }

        [Required]
        [StringLength(11)]
        public string CPF { get; set; }

        
        public bool Admin { get; set; }
    }
}
