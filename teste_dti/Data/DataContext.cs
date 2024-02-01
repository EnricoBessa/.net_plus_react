using Microsoft.EntityFrameworkCore;

namespace teste_dti.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        public DbSet<Lembrete> Lembretes { get; set; }

    }
}