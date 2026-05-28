namespace InventarioCcl.Api.DTOs;

public class MovimientoProductoRequest
{
    public string Nombre { get; set; } = string.Empty;

    public int Cantidad { get; set; }

    public string TipoMovimiento{ get; set; } = string.Empty;
}