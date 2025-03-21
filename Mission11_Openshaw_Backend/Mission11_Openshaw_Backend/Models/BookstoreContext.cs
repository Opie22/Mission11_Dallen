namespace Mission11_Openshaw_Backend.Models;

using Microsoft.EntityFrameworkCore;

public class BookstoreContext : DbContext
{
    public BookstoreContext(DbContextOptions<BookstoreContext> options) : base(options) {}

    public DbSet<Book> Books { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Book>().ToTable("Books"); // Explicitly map to "Books" table
    }
}
