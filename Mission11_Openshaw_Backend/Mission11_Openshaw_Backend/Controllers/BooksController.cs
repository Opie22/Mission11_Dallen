using Mission11_Openshaw_Backend.Models;

namespace Mission11_Openshaw_Backend.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class BooksController : ControllerBase
{
    private readonly BookstoreContext _context;

    public BooksController(BookstoreContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Book>>> GetBooks(
        [FromQuery] int page = 1, 
        [FromQuery] int pageSize = 5, 
        [FromQuery] string sortBy = "Title", 
        [FromQuery] bool ascending = true)
    {
        var booksQuery = _context.Books.AsQueryable();

        // Sorting
        booksQuery = ascending ? booksQuery.OrderBy(b => EF.Property<object>(b, sortBy))
            : booksQuery.OrderByDescending(b => EF.Property<object>(b, sortBy));

        // Pagination
        var books = await booksQuery.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
        return Ok(books);
    }
}
