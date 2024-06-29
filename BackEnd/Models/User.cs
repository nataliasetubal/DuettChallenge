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

        [Required(ErrorMessage = "The Password field is required.")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at most {1} characters long.", MinimumLength = 8)]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?#&]{8,}$",
        ErrorMessage = "The {0} must contain at least one uppercase letter, one digit, and one special character.")]
        public string Password { get; set; }

        [Required(ErrorMessage = "The CPF field is required.")]
        [StringLength(11, MinimumLength = 11, ErrorMessage = "The CPF must be exactly 11 characters.")]
        [RegularExpression(@"^\d{11}$", ErrorMessage = "The CPF must contain only numeric characters and must be exactly 11 digits.")]
        public string CPF { get; set; }



        public string Role { get; set; }
    }
}
