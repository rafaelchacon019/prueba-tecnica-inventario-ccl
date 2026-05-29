# 📦 Prueba Técnica - Inventario CCL

MiniSistema de Gestión de Inventario desarrollado como prueba técnica utilizando backend en **.NET 9**, frontend en **Angular 19** y base de datos **PostgreSQL**.

---

# 🚀 Tecnologías

## Backend

* .NET 9 / ASP.NET Core Web API
* Entity Framework Core
* PostgreSQL
* JWT Bearer Authentication

## Frontend

* Angular 19
* TypeScript
* SCSS
* Angular Router
* HttpClient

---

# ✅ Funcionalidades

* Login básico con credenciales fijas en memoria.
* Generación y uso de JWT Bearer Token.
* Registro de entradas y salidas de productos.
* Consulta del inventario actual.
* Validaciones básicas de cantidad, tipo de movimiento y stock disponible.
* Rutas protegidas en frontend mediante Auth Guard.

---

# 🏗️ Arquitectura

El backend sigue una arquitectura por capas sencilla separando:

* Controllers
* DTOs
* Models
* Services
* Data

El frontend utiliza Angular standalone components con separación por:

* pages
* services
* guards

---

# 📁 Estructura

```text id="rkg09h"
Inventario_ccl/
├── Backend/
│   └── InventarioCcl.Api/
├── Frontend/
│   └── InventarioCcl-front/
├── database.sql
└── README.md
```

---

# 🛠️ Requisitos previos

Para ejecutar el proyecto se recomienda usar las siguientes versiones:

| Herramienta | Versión recomendada |
| ----------- | ------------------- |
| .NET SDK    | 9.0.314             |
| Node.js     | 22 LTS              |
| PostgreSQL  | Última estable      |
| Git         | Última estable      |

## Descargas

### .NET SDK 9.0.314

https://dotnet.microsoft.com/es-es/download/dotnet/thank-you/sdk-9.0.314-windows-x64-installer

### Node.js

https://nodejs.org/

### PostgreSQL

https://www.postgresql.org/download/

### Git

https://git-scm.com/downloads

> No es necesario instalar Angular CLI de forma global, ya que el proyecto utiliza Angular 19 localmente mediante `npx`.

---

# 🗄️ Base de datos

Crear en PostgreSQL la base de datos usada por el proyecto:

```sql id="y7b62m"
CREATE DATABASE "T001_inventario_ccl";
```

La tabla `Productos` se crea mediante migraciones de Entity Framework Core.

También se incluye el archivo `database.sql` en la raíz del proyecto como script de referencia para crear la base de datos y la tabla manualmente.

---

# ⚙️ Configuración local

El archivo versionado:

```text id="y7l0kg"
Backend/InventarioCcl.Api/appsettings.json
```

contiene placeholders seguros.

Para ejecución local, configurar los valores reales en:

```text id="x0vov9"
Backend/InventarioCcl.Api/appsettings.Development.json
```

## Ejemplo

```json id="9z4g5c"
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

> `appsettings.Development.json` está ignorado por Git porque puede contener credenciales locales.

---

# ▶️ Ejecución backend

Desde la carpeta del backend:

```bash id="gljlwm"
cd Backend/InventarioCcl.Api
dotnet restore
```

## Instalar Entity Framework CLI (si es necesario)

```bash id="u95phj"
dotnet tool install --global dotnet-ef
```

## Validar instalación

```bash id="p3rsyu"
dotnet ef --version
```

## Aplicar migraciones

```bash id="mjlwmf"
dotnet ef database update
```

> Nota: en una base de datos nueva puede aparecer inicialmente un mensaje relacionado con `__EFMigrationsHistory`.
> Si al final aparece `Applying migration ... Done.`, la migración fue aplicada correctamente.

## Ejecutar API

```bash id="jlwm6p"
dotnet run
```

La API queda disponible en:

```text id="o4z0v9"
http://localhost:5054
```

---

# ▶️ Ejecución frontend

Desde la carpeta del frontend:

```bash id="mxs3qj"
cd Frontend/InventarioCcl-front
```

## Instalar dependencias

```bash id="6c1aj8"
npm install
```

## Ejecutar aplicación

```bash id="tq6ccl"
npx ng serve
```

La aplicación queda disponible en:

```text id="ulxjtp"
http://localhost:4200
```

---

# 🔑 Credenciales de prueba

```text id="qjlwm8"
Usuario: admin
Password: admin123
```

---

# 🌐 Endpoints principales

## 🔐 Login

```http id="jlwm9n"
POST /auth/login
```

### Body

```json id="a7w8x4"
{
  "usuario": "admin",
  "password": "admin123"
}
```

---

## 📦 Consultar inventario

```http id="jlwmab"
GET /productos/inventario
Authorization: Bearer {token}
```

---

## 🔄 Registrar movimiento

```http id="jlwmcd"
POST /productos/movimiento
Authorization: Bearer {token}
```

### Body

```json id="k8r0pd"
{
  "nombre": "Teclado",
  "cantidad": 1,
  "tipoMovimiento": "entrada"
}
```

`tipoMovimiento` acepta:

* `entrada`
* `salida`

---

# ✅ Verificación antes de entregar

## Backend

```bash id="r1c5qw"
dotnet build
```

## Frontend

```bash id="3b8zv4"
npx ng build
```

---

# 🔒 Nota de seguridad

Para esta prueba técnica el token JWT se almacena en `localStorage` y las credenciales del login están fijas en memoria.

En un entorno productivo se deberían usar:

* credenciales gestionadas de forma segura,
* claves fuera del repositorio,
* almacenamiento seguro de tokens,
* y autenticación persistente mediante cookies HttpOnly o mecanismos equivalentes.
