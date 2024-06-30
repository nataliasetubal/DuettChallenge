using Backend.Data;
using Backend.Models;
using BackEnd.Dto;
using BackEnd.Services.Interface;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BackEnd.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;
        private readonly UserRepository _userRepository;
        public TokenService(IConfiguration configuration, UserRepository userRepository)
        {
            _configuration = configuration;
            _userRepository = userRepository;
        }        


        public async Task<string> GenerateToken(Login login)
        {
             var result =  await _userRepository.Users.FirstOrDefaultAsync(u => u.Email == login.Email);
            if (result != null)
            {
                if ( login.Password != result.Password)
                {
                    throw new ArgumentException("Senha incorreta");
                }
            }
            else
            {
                throw new ArgumentException("email n encontrado");
            }

            var secretyKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? string.Empty));

            var signinCredentials = new SigningCredentials(secretyKey, SecurityAlgorithms.HmacSha256);

            var tokenOptions = new JwtSecurityToken(
                claims: new[]
                {
                    new Claim(type: ClaimTypes.Email, result.Email),                   
                    new Claim(type: ClaimTypes.Role, result.Role),

                },
                expires: DateTime.Now.AddHours(8),
                signingCredentials: signinCredentials);
            

            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            

            return ("Bearer " + token);
        }

        
    }
}
