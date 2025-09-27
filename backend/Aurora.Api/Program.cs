var builder = WebApplication.CreateBuilder(args);

// ===== SERVICE CONFIGURATION =====

// API Controllers
builder.Services.AddControllers();

// OpenAPI/Swagger
builder.Services.AddOpenApi();

// CORS Configuration for Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevelopmentPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Vite default port
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// Health Checks
builder.Services.AddHealthChecks();

// ===== APPLICATION PIPELINE =====

var app = builder.Build();

// Development Environment Configuration
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseCors("DevelopmentPolicy");
}
else
{
    // Only redirect to HTTPS in production
    app.UseHttpsRedirection();
}

// Routing
app.UseRouting();

// Controllers
app.MapControllers();

// Health Check Endpoint
app.MapHealthChecks("/health");

// Start the application
app.Run();
