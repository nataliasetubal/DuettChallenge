using Backend.Models;
using BackEnd.Dto;

namespace BackEnd.Services.Interface
{
    public interface ITokenService
    {
     Task<TokenData> GenerateToken(Login login);
    }
}
