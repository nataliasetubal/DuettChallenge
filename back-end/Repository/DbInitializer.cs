using System;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;
using Backend.Data;
using Backend.Models;

namespace Backend.Data
{
    public static class DbInitializer
    {
        public static void Initialize(UserRepository context)
        {
            if (context.Users.Any())
            {
                return;  
            }

            
            context.Users.Add(new User
            {
                Name = "Admin",
                Email = "admin@example.com",
                Password = "admin@123", 
                CPF = "12345678900",
                Role = "Admin"
            });

           
            context.Users.Add(new User
            {
                Name = "User1",
                Email = "user1@example.com",
                Password = "user1@123", 
                CPF = "98765432100",
                Role = "User"
            });

            Random random = new Random();

            for (int i = 2; i <= 50; i++)
            {
                string roleName = random.Next(2) == 0 ? "Admin" : "User"; // Aleatoriamente escolhe entre Admin e User
                string name = $"User{i}";
                string email = $"user{i}@example.com";
                string password = $"user{i}@123";
                string cpf = random.Next(1000000, 9999999).ToString(); // CPF aleatório de 11 dígitos

                context.Users.Add(new User
                {
                    Name = name,
                    Email = email,
                    Password = password,
                    CPF = cpf,
                    Role = roleName
                });
            }

            context.SaveChanges();
        }
    }
}
