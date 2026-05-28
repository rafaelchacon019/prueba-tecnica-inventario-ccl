using InventarioCcl.Api.Data;
using InventarioCcl.Api.DTOs;
using InventarioCcl.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventarioCcl.Api.Controllers;

[ApiController]
[Route("productos")]
[Authorize]
public class ProductosController:ControllerBase
{
    private readonly AppDbContext context;

    public ProductosController(AppDbContext context)
    {
        this.context = context;
    }

    [HttpGet("inventario")]
    public async Task<ActionResult<IEnumerable<Producto>>> GetInventario()
    {
        var productos = await context.Productos
                                     .OrderBy(producto => producto.Id)
                                     .ToListAsync();

        return Ok(productos);                             
    }

    [HttpPost("movimiento")]
    public async Task<ActionResult<Producto>> RegistrarMovimiento(MovimientoProductoRequest request)
    {
        if(request.Cantidad <= 0)
        {
            return BadRequest("La cantidad debe ser mayor a cero.");
        }

        var producto = await context.Productos
                                    .FirstOrDefaultAsync(producto => producto.Nombre.ToLower() == request.Nombre.ToLower());

        if (request.TipoMovimiento.ToLower() != "entrada" && request.TipoMovimiento.ToLower() != "salida")
        {
            return BadRequest("El tipo de movimiento debe ser entrada o salida.");
        }

        if (producto is null)
        {
            if(request.TipoMovimiento.ToLower() == "salida")
            {
                return BadRequest("No se puede registrar salida de un producto inexistente");
            }

            producto = new Producto
            {
                Nombre = request.Nombre,
                Cantidad = request.Cantidad
            };

            context.Productos.Add(producto);
        }
        else
        {
            if(request.TipoMovimiento.ToLower() == "entrada")
            {
                producto.Cantidad += request.Cantidad;
            }
            else
            {
                if (producto.Cantidad < request.Cantidad)
                {
                return BadRequest("No hay cantidad suficiente en inventario.");
                }

                producto.Cantidad -= request.Cantidad;
            }        
        }          

        await context.SaveChangesAsync();

        return Ok(producto);                  
    }

}