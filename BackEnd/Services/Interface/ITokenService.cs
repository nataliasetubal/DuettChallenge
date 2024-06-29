using Backend.Models;
using BackEnd.Models;

namespace BackEnd.Services.Interface
{
    public interface ITokenService
    {
     Task<string> GenerateToken(Login login);
    }
}
