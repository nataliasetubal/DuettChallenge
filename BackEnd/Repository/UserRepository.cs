using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class UserRepository : DbContext
    {
        public UserRepository(DbContextOptions<UserRepository> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}
