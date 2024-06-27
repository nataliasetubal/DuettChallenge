﻿using System;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;
using Backend.Data;
using Backend.Models;

namespace Backend.Data
{
    public static class DbInitializer
    {
        public static void Initialize(UserContext context)
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
                Admin = true
            });

           
            context.Users.Add(new User
            {
                Name = "User1",
                Email = "user1@example.com",
                Password = "user1@123", 
                CPF = "98765432100",
                Admin = false
            });

            context.SaveChanges();
        }
    }
}