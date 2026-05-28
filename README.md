# Prueba Tecnica - Inventario CCL

MiniSistema de Gestion de Inventario desarrollado como prueba tecnica con backend en .NET 9, frontend Angular 19 y PostgreSQL.

## Tecnologias

### Backend

- .NET 9 / ASP.NET Core Web API
- Entity Framework Core
- PostgreSQL
- JWT Bearer Authentication

### Frontend

- Angular 19
- TypeScript
- SCSS
- Angular Router
- HttpClient

## Funcionalidades

- Login basico con credenciales fijas en memoria.
- Generacion y uso de JWT Bearer Token.
- Registro de entradas y salidas de productos.
- Consulta del inventario actual.
- Validaciones basicas de cantidad, tipo de movimiento y stock disponible.
- Rutas protegidas en frontend mediante Auth Guard.

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

## Configuracion local

El archivo versionado `Backend/InventarioCcl.Api/appsettings.json` contiene placeholders seguros.

Para ejecucion local, configurar los valores reales en:

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
    "issuer": "InventarioCcApi",
    "audience": "InventarioCclFront"
  }
}
```

`appsettings.Development.json` esta ignorado por Git porque puede contener credenciales locales.

## Ejecucion backend

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

Si `dotnet ef` no esta disponible, instalar la herramienta:

```bash
dotnet tool install --global dotnet-ef
```

## Ejecucion frontend

Desde la carpeta del frontend:

```bash
cd Frontend/InventarioCcl-front
npm install
npx ng serve
```

La aplicacion queda disponible en:

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

## Verificacion antes de entregar

Backend:

```bash
dotnet build
```

Frontend:

```bash
npx ng build
```

## Nota de seguridad

Para esta prueba tecnica el token JWT se almacena en `localStorage` y las credenciales del login estan fijas en memoria. En un entorno productivo se deberian usar credenciales gestionadas de forma segura, claves fuera del repositorio y una estrategia de almacenamiento de token mas robusta, por ejemplo cookies HttpOnly seguras.
