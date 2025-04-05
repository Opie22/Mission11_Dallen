using Microsoft.AspNetCore.Http.HttpResults;
using Mission11_Openshaw_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Mission11_Openshaw_Backend.Controllers;

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
    public IActionResult GetBooks(
        [FromQuery(Name = "currentPage")] int currentPage = 1,
        int pageSize = 5,
        string sortBy = "Title",
        bool ascending = true,
        string? category = null)
    {
        var query = _context.Books.AsQueryable();

        if (!string.IsNullOrEmpty(category))
        {
            query = query.Where(b => b.Category == category);
        }

        switch (sortBy)
        {
            case "Author":
                query = ascending ? query.OrderBy(b => b.Author) : query.OrderByDescending(b => b.Author);
                break;
            case "Price":
                query = ascending ? query.OrderBy(b => b.Price) : query.OrderByDescending(b => b.Price);
                break;
            default:
                query = ascending ? query.OrderBy(b => b.Title) : query.OrderByDescending(b => b.Title);
                break;
        }

        var totalCount = query.Count();

        var pagedBooks = query
            .Skip((currentPage - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        return Ok(new
        {
            books = pagedBooks,
            totalCount = totalCount
        });
    }

    [HttpGet("categories")]
    public IActionResult GetCategories()
    {
        var categories = _context.Books
            .Select(b => b.Category)
            .Distinct()
            .OrderBy(c => c)
            .ToList();

        return Ok(categories);
    }

    // POST: /api/books
    [HttpPost]
    public IActionResult AddBook([FromBody] Book book)
    {
        _context.Books.Add(book);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetBooks), new { id = book.BookID }, book);
    }

    // PUT: /api/books/{id}
    [HttpPut("{id}")]
    public IActionResult UpdateBook(int id, [FromBody] Book updatedBook)
    {
        var existing = _context.Books.Find(id);
        if (existing == null) return NotFound();

        existing.Title = updatedBook.Title;
        existing.Author = updatedBook.Author;
        existing.Publisher = updatedBook.Publisher;
        existing.ISBN = updatedBook.ISBN;
        existing.Classification = updatedBook.Classification;
        existing.Category = updatedBook.Category;
        existing.PageCount = updatedBook.PageCount;
        existing.Price = updatedBook.Price;

        _context.SaveChanges();
        return NoContent();
    }

    // DELETE: /api/books/{id}
    [HttpDelete("{id}")]
    public IActionResult DeleteBook(int id)
    {
        var book = _context.Books.Find(id);
        if (book == null) return NotFound();

        _context.Books.Remove(book);
        _context.SaveChanges();
        return NoContent();
    }
    
    
    [HttpGet("all")]
    public IActionResult GetAllBooks()
    {
        var books = _context.Books
            .OrderBy(b => b.Title)
            .ToList();

        return Ok(books);
    }
}


