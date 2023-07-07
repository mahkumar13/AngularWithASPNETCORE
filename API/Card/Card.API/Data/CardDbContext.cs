using Card.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Card.API.Data
{
    public class CardDbContext:DbContext
    {
        public CardDbContext(DbContextOptions options):base(options) 
        {       
        }
        public DbSet<CardModel> Cards{ get; set; }
    }
}
