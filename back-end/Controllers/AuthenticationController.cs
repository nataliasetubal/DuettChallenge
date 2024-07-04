using Backend.Models;
using BackEnd.Dto;
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
        public async Task<ActionResult<TokenData>> Login(Login login)
        {
            try
            {
                var tokenData = await _tokenService.GenerateToken(login);

                if (tokenData.Token == "")
                {
                    return Unauthorized();
                }
                return Ok(tokenData);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
            
        }
    }
}
