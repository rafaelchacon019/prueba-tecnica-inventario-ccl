using InventarioCcl.Api.DTOs;
using InventarioCcl.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace InventarioCcl.Api.Controllers;

[ApiController]
[Route("auth")]
public class AuthController:ControllerBase
{
    private readonly JwtService jwtService;

    public AuthController(JwtService jwtService)
    {
        this.jwtService = jwtService;
    }

    [HttpPost("login")]
    public ActionResult<LoginResponse> Login(LoginRequest request)
    {
        const string usuarioTest = "admin";
        const string passwordTest = "admin123";

        if (request.Usuario != usuarioTest || request.Password != passwordTest)
        {
            return Unauthorized("Credenciales invalidad.");
        }

        var token = jwtService.GenerateToken(request.Usuario);

        return Ok(new LoginResponse
        {
           Token = token 
        });

    }

}