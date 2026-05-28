using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace InventarioCcl.Api.Services;

public class JwtService
{
    private readonly IConfiguration configuration;

    public JwtService(IConfiguration configuration)
    {
        this.configuration = configuration;
    }

    public string GenerateToken(string usuario)
    {
        var jwtKey = configuration["jwt:key"] ?? throw new InvalidOperationException("Jwt key no configurada.");
        var jwtIssuer = configuration["jwt:issuer"];
        var jwtAudience = configuration["jwt:audience"];

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, usuario)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: jwtIssuer,
            audience: jwtAudience,
            claims: claims,
            expires:DateTime.UtcNow.AddHours(2),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);

    }
}