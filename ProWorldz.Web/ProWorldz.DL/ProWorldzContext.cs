using ProWorldz.DL.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProWorldz.DL
{
    public class ProWorldzContext : DbContext
    {
        public ProWorldzContext() : base("ConnectionString")
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Community> Communities { get; set; }
        public DbSet<UserType> UserTypes { get; set; }
    }
}
