using System.ComponentModel.DataAnnotations;

namespace BackEnd.Dto
{
    public class Login
    {
        [Required(ErrorMessage = "Email is required", AllowEmptyStrings = false)]
        public string Email { get; set; }

        [Required(ErrorMessage = "The Password field is required.", AllowEmptyStrings = false)]

        public string Password { get; set; }
    }
}
