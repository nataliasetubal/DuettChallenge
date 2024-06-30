using Backend.Models;
using BackEnd.Dto;

namespace BackEnd.Services.Interface
{
    public interface ITokenService
    {
     Task<string> GenerateToken(Login login);
    }
}
