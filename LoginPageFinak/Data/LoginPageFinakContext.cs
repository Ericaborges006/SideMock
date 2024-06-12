using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using LoginPageFinak.Models;

namespace LoginPageFinak.Data
{
    public class LoginPageFinakContext : DbContext
    {
        public LoginPageFinakContext (DbContextOptions<LoginPageFinakContext> options)
            : base(options)
        {
        }

        public DbSet<LoginPageFinak.Models.User> User { get; set; } = default!;
    }
}
