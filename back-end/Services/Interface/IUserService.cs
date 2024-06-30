using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Models;

namespace BackEnd.Services.Interface
{
    public interface IUserService
    {
        Task CreateUserAsync(User user);
        Task<User> GetUserByIdAsync(int id);
        Task<User> GetUserByEmailAsync(string email);
        Task<List<User>> GetAllUsersAsync();
        Task UpdateUserAsync(User user);
        Task DeleteUserAsync(int id);
    }
}
