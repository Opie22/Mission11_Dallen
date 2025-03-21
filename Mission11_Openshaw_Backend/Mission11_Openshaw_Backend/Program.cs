using Microsoft.EntityFrameworkCore;
using Mission11_Openshaw_Backend.Models;

var builder = WebApplication.CreateBuilder(args);

// Configure CORS to allow any origin (for testing)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});


// Configure SQLite database connection
builder.Services.AddDbContext<BookstoreContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ✅ Apply CORS Policy (Make sure this is BEFORE `app.UseAuthorization()`)
app.UseCors("AllowAll");
app.UseCors(policy => 
    policy.WithOrigins("http://localhost:5173")
        .AllowAnyMethod()
        .AllowAnyHeader()
);


app.UseAuthorization();
app.MapControllers();
app.Run();