using Backend.Data;
using Backend.Models;
using BackEnd.Services.Interface;


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
            if (await _userRepository.EmailExistsAsync(user.Email))
            {
                throw new ArgumentException("Email is already in use.");
            }

            if (await _userRepository.CPFExistsAsync(user.CPF))
            {
                throw new ArgumentException("CPF is already in use.");
            }

            if (!string.IsNullOrEmpty(user.Role))
            {
                if (user.Role != "Admin" && user.Role != "User")
                {
                    throw new ArgumentException($"Invalid Role '{user.Role}'. Role must be 'Admin' or 'User'.");
                }
            }

            await _userRepository.AddUserAsync(user);
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _userRepository.GetUserByIdAsync(id);
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _userRepository.GetUserByEmailAsync(email);
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _userRepository.GetAllUsersAsync();
        }

        public async Task UpdateUserAsync(User user)
        {
            await _userRepository.UpdateUserAsync(user);
        }

        public async Task DeleteUserAsync(int id)
        {
            await _userRepository.DeleteUserAsync(id);
        }
    }
}
