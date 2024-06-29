using Backend.Models;
using BackEnd.Models;
using BackEnd.Services;
using BackEnd.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly ITokenService _tokenService;

        public AuthenticationController(ITokenService tokenService)
        {
            _tokenService = tokenService;
        }

        [HttpPost]
        public async Task<ActionResult<string>> Login(Login login)
        {
            try
            {
                var token = await _tokenService.GenerateToken(login);

                if (token == "")
                {
                    return Unauthorized();
                }
                return Ok(token);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
            
        }
    }
}
