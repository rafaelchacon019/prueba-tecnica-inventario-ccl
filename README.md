# Prueba Técnica - Inventario CCL

MiniSistema de Gestión de Inventario desarrollado como prueba técnica con backend en .NET 9, frontend Angular 19 y PostgreSQL.

## Tecnologías

### Backend

* .NET 9 / ASP.NET Core Web API
* Entity Framework Core
* PostgreSQL
* JWT Bearer Authentication

### Frontend

* Angular 19
* TypeScript
* SCSS
* Angular Router
* HttpClient

## Funcionalidades

* Login básico con autenticación JWT utilizando credenciales de prueba en memoria.
* Generación y uso de JWT Bearer Token.
* Registro de entradas y salidas de productos.
* Consulta del inventario actual.
* Validaciones básicas de cantidad, tipo de movimiento y stock disponible.
* Rutas protegidas en frontend mediante Auth Guard.

## Arquitectura

El backend sigue una arquitectura por capas sencilla separando Controllers, DTOs, Models, Services y Data.

El frontend utiliza Angular standalone components con separación por pages, services y guards.

## Estructura

```text
Inventario_ccl/
├── Backend/
│   └── InventarioCcl.Api/
├── Frontend/
│   └── InventarioCcl-front/
└── README.md
```

## Base de datos

Crear en PostgreSQL la base de datos usada por el proyecto:

```sql
CREATE DATABASE "T001_inventario_ccl";
```

La tabla `Productos` se crea mediante migraciones de Entity Framework Core.

## Configuración local

El archivo versionado `Backend/InventarioCcl.Api/appsettings.json` contiene placeholders seguros.

Para ejecución local, configurar los valores reales en:

```text
Backend/InventarioCcl.Api/appsettings.Development.json
```

Ejemplo:

```json
{
  "ConnectionStrings": {
    "defaultConnection": "Host=localhost;Port=5432;Database=T001_inventario_ccl;Username=postgres;Password=TU_PASSWORD"
  },
  "jwt": {
    "key": "TU_CLAVE_LOCAL_DE_AL_MENOS_32_CARACTERES",
    "issuer": "InventarioCclApi",
    "audience": "InventarioCclFront"
  }
}
```

`appsettings.Development.json` está ignorado por Git porque puede contener credenciales locales.

## Ejecución backend

Desde la carpeta del backend:

```bash
cd Backend/InventarioCcl.Api
dotnet restore
dotnet ef database update
dotnet run
```

La API queda disponible en:

```text
http://localhost:5054
```

Si `dotnet ef` no está disponible, instalar la herramienta:

```bash
dotnet tool install --global dotnet-ef
```

## Ejecución frontend

Desde la carpeta del frontend:

```bash
cd Frontend/InventarioCcl-front
npm install
npx ng serve
```

La aplicación queda disponible en:

```text
http://localhost:4200
```

## Credenciales de prueba

```text
Usuario: admin
Password: admin123
```

## Endpoints principales

### Login

```http
POST /auth/login
```

Body:

```json
{
  "usuario": "admin",
  "password": "admin123"
}
```

### Consultar inventario

```http
GET /productos/inventario
Authorization: Bearer {token}
```

### Registrar movimiento

```http
POST /productos/movimiento
Authorization: Bearer {token}
```

Body:

```json
{
  "nombre": "Teclado",
  "cantidad": 1,
  "tipoMovimiento": "entrada"
}
```

`tipoMovimiento` acepta `entrada` o `salida`.
