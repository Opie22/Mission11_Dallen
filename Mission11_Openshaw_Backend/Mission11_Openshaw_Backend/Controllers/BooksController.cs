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

}