using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using BackEnd.Services.Interface;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Backend.Services
{
    public class UserService : IUserService
    {
        private readonly UserRepository _userRepository;

        public UserService(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task CreateUserAsync(User user)
        {
            if (await _userRepository.Users.AnyAsync(u => u.Email == user.Email))
            {
                throw new ArgumentException($"Email is already in use.");
            }

            if (await _userRepository.Users.AnyAsync(u => u.CPF == user.CPF))
            {
                throw new ArgumentException($"CPF is already in use.");
            }

            if (!string.IsNullOrEmpty(user.Role))
            {
                if (user.Role != "Admin" && user.Role != "User")
                {
                    throw new ArgumentException($"Invalid Role '{user.Role}'. Role must be 'Admin' or 'User'.");
                }
            }

            _userRepository.Users.Add(user);
            await _userRepository.SaveChangesAsync();
            


        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _userRepository.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _userRepository.Users.ToListAsync();
        }

        public async Task UpdateUserAsync(User user)
        {
            _userRepository.Entry(user).State = EntityState.Modified;
            await _userRepository.SaveChangesAsync();
        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await _userRepository.Users.FindAsync(id);
            if (user != null)
            {
                _userRepository.Users.Remove(user);
                await _userRepository.SaveChangesAsync();
            }
        }
    }
}
