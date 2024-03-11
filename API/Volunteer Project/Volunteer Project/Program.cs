using FoodPortal.Repos;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using Volunteer_Project.Interface.RepositoryInterface;
using Volunteer_Project.Interface.ServiceInterface;
using Volunteer_Project.Mapper;
using Volunteer_Project.Middleware;
using Volunteer_Project.Models;
using Volunteer_Project.Repository;
using Volunteer_Project.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ITokenGenerate,TokenService>();
builder.Services.AddScoped<IVolunteerDetailsCrud, VolunteerRepo>();
builder.Services.AddScoped<IVolunteerService, VolunteerService>();
builder.Services.AddScoped<IUserRepo,UserRepo>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IRequestRepo, RequestRepo>();
builder.Services.AddScoped<IRequestService, RequestService>();
builder.Services.AddScoped<IDisasterNeedsRepo, DisasterNeedsRepo>();
builder.Services.AddScoped<IDisasterNeedsService, DisasterNeedService>();
builder.Services.AddScoped<IVolunteerMappingRepo, VolunteerMappingRepo>();
builder.Services.AddScoped<IVolunteerMappingService, VolunteerMappingService>();
builder.Services.AddScoped<IRequestDetailService, RequestDetailService>();
builder.Services.AddScoped<IRequestDetailRepo, RequestDetailRepo>();
builder.Services.AddScoped<IDisasterRepo, DisastersRepo>();
builder.Services.AddScoped<IDisasterService,DisasterService>();
builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddTransient<GlobalExceptionMiddleware>();





builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
               .AddJwtBearer(options =>
               {
                   options.TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidateIssuerSigningKey = true,
                       IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"]!)),
                       ValidateIssuer = false,
                       ValidateAudience = false,
                       ValidateLifetime = true, // Ensure token has not expired
                       ClockSkew = TimeSpan.Zero // Set clock skew to zero for exact expiration checks
                   };
               });
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme."
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
                 {
                     {
                           new OpenApiSecurityScheme
                             {
                                 Reference = new OpenApiReference
                                 {
                                     Type = ReferenceType.SecurityScheme,
                                     Id = "Bearer"
                                 }
                             },
                             new string[] {}

                     }
                 });
});

builder.Services.AddDbContext<VanContext>(
    optionsAction: options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString(name: "SQLConnection")));

builder.Services.AddCors(opts =>
{
    opts.AddPolicy("CORS", options =>
    {
        options.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CORS");


app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseMiddleware<GlobalExceptionMiddleware>();


app.MapControllers();

app.Run();
