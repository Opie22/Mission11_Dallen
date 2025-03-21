namespace Mission11_Openshaw_Backend.Models;

using System.ComponentModel.DataAnnotations;

using System.ComponentModel.DataAnnotations.Schema;

public class Book
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int BookID { get; set; }

    [Required]
    public required string Title { get; set; }  // ✅ No warning

    
    public  string? Author { get; set; }  // ✅ No warning

    
    public  string? Publisher { get; set; }  // ✅ No warning

    
    public  string? ISBN { get; set; }  // ✅ No warning

    
    public  string? Classification { get; set; }  // ✅ No warning

    
    public  string? Category { get; set; }  // ✅ No warning

    
    public int PageCount { get; set; }

    
    public float Price { get; set; }
}

