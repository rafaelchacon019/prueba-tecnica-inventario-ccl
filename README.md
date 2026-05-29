Prueba Técnica - Inventario CCL

MiniSistema de Gestión de Inventario desarrollado como prueba técnica con backend en .NET 9, frontend Angular 19 y PostgreSQL.

Tecnologías
Backend
.NET 9 / ASP.NET Core Web API
Entity Framework Core
PostgreSQL
JWT Bearer Authentication
Frontend
Angular 19
TypeScript
SCSS
Angular Router
HttpClient
Funcionalidades
Login básico con autenticación JWT utilizando credenciales de prueba en memoria.
Generación y uso de JWT Bearer Token.
Registro de entradas y salidas de productos.
Consulta del inventario actual.
Validaciones básicas de cantidad, tipo de movimiento y stock disponible.
Rutas protegidas en frontend mediante Auth Guard.
Arquitectura

El backend sigue una arquitectura por capas sencilla separando Controllers, DTOs, Models, Services y Data.

El frontend utiliza Angular standalone components con separación por pages, services y guards.

Estructura
Inventario_ccl/
├── Backend/
│   └── InventarioCcl.Api/
├── Frontend/
│   └── InventarioCcl-front/
└── README.md
Requisitos previos

Para ejecutar el proyecto se recomienda usar las siguientes versiones:

.NET SDK 9.0.314
Descarga: https://dotnet.microsoft.com/es-es/download/dotnet/thank-you/sdk-9.0.314-windows-x64-installer
Node.js 22 LTS
Descarga: https://nodejs.org/
PostgreSQL
Descarga: https://www.postgresql.org/download/
Git
Descarga: https://git-scm.com/downloads

No es necesario instalar Angular CLI de forma global, ya que el proyecto utiliza Angular 19 localmente mediante:

npx ng serve
Base de datos

Crear en PostgreSQL la base de datos usada por el proyecto:

CREATE DATABASE "T001_inventario_ccl";

La tabla Productos se crea mediante migraciones de Entity Framework Core.

Configuración local

El archivo versionado Backend/InventarioCcl.Api/appsettings.json contiene placeholders seguros.

Para ejecución local, configurar los valores reales en:

Backend/InventarioCcl.Api/appsettings.Development.json

Ejemplo:

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

appsettings.Development.json está ignorado por Git porque puede contener credenciales locales.

Ejecución backend

Desde la carpeta del backend:

cd Backend/InventarioCcl.Api
dotnet restore

Si dotnet ef no está disponible, instalar la herramienta:

dotnet tool install --global dotnet-ef

Validar instalación:

dotnet ef --version

Aplicar migraciones:

dotnet ef database update

Nota: en una base de datos nueva puede aparecer inicialmente un mensaje relacionado con __EFMigrationsHistory. Si al final aparece Applying migration ... Done., la migración fue aplicada correctamente.

Ejecutar API:

dotnet run

La API queda disponible en:

http://localhost:5054
Ejecución frontend

Desde la carpeta del frontend:

cd Frontend/InventarioCcl-front
npm install
npx ng serve

La aplicación queda disponible en:

http://localhost:4200
Credenciales de prueba
Usuario: admin
Password: admin123
Endpoints principales
Login
POST /auth/login

Body:

{
  "usuario": "admin",
  "password": "admin123"
}
Consultar inventario
GET /productos/inventario
Authorization: Bearer {token}
Registrar movimiento
POST /productos/movimiento
Authorization: Bearer {token}

Body:

{
  "nombre": "Teclado",
  "cantidad": 1,
  "tipoMovimiento": "entrada"
}

tipoMovimiento acepta entrada o salida.