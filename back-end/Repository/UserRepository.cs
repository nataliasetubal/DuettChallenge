using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Backend.Data
{
    public class UserRepository : DbContext
    {
        public UserRepository(DbContextOptions<UserRepository> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await Users.AnyAsync(u => u.Email == email);
        }

        public async Task<bool> CPFExistsAsync(string cpf)
        {
            return await Users.AnyAsync(u => u.CPF == cpf);
        }

        public async Task AddUserAsync(User user)
        {
            Users.Add(user);
            await SaveChangesAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            var response = await Users.FirstOrDefaultAsync(u => u.Id == id);
            if (response != null) 
            {
                return response;
            }
            else
            {
                throw new ArgumentException("Id Not Found");
            }

        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
           
            var response = await Users.FirstOrDefaultAsync(u => u.Email == email);
            if (response != null)
            {
                return response;
            }
            else
            {
                throw new ArgumentException("email Not Found");
            }
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await Users.ToListAsync();
        }

        public async Task UpdateUserAsync(User user)
        {
            Entry(user).State = EntityState.Modified;
            await SaveChangesAsync();
        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await Users.FindAsync(id);
            if (user != null)
            {
                Users.Remove(user);
                await SaveChangesAsync();
            }
        }
    }
}
