using Microsoft.EntityFrameworkCore;
using InventarioCcl.Api.Models;

namespace InventarioCcl.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
            : base (options)
    {
    }

    public DbSet<Producto> Productos => Set<Producto>();

}