# `📦 Prueba Técnica - Inventario CCL`

MiniSistema de Gestión de Inventario desarrollado como prueba técnica utilizando **.NET 9**, **Angular 19** y **PostgreSQL**.

---

# 📑 Tabla de Contenidos

* [🚀 Tecnologías](#-tecnologías)
* [✅ Funcionalidades](#-funcionalidades)
* [🏗️ Arquitectura](#️-arquitectura)
* [📁 Estructura del Proyecto](#-estructura-del-proyecto)
* [🛠️ Requisitos Previos](#️-requisitos-previos)
* [🗄️ Configuración de Base de Datos](#️-configuración-de-base-de-datos)
* [⚙️ Configuración Local](#️-configuración-local)
* [▶️ Ejecución del Backend](#️-ejecución-del-backend)
* [▶️ Ejecución del Frontend](#️-ejecución-del-frontend)
* [🔑 Credenciales de Prueba](#-credenciales-de-prueba)
* [🌐 Endpoints Principales](#-endpoints-principales)
* [✅ Validaciones Implementadas](#-validaciones-implementadas)
* [📄 Notas Finales](#-notas-finales)

---

# 🚀 Tecnologías

## Backend

* .NET 9 / ASP.NET Core Web API
* Entity Framework Core
* PostgreSQL
* JWT Bearer Authentication

## Frontend
## Frontend

* Angular 19
* TypeScript
* SCSS
* Angular Router
* HttpClient
* Angular 19
* TypeScript
* SCSS
* Angular Router
* HttpClient

---

# ✅ Funcionalidades
---

# ✅ Funcionalidades

* Login básico con autenticación JWT utilizando credenciales de prueba en memoria.
* Generación y validación de JWT Bearer Token.
* Registro de entradas y salidas de productos.
* Consulta de inventario actualizado.
* Validaciones de:

  * stock disponible,
  * cantidades inválidas,
  * tipo de movimiento.
* Protección de rutas mediante Auth Guard.
* Actualización dinámica del inventario después de registrar movimientos.

---

# 🏗️ Arquitectura

## Backend

El backend sigue una arquitectura por capas sencilla separando responsabilidades en:

* `Controllers`
* `DTOs`
* `Models`
* `Services`
* `Data`
* `Migrations`

## Frontend

El frontend utiliza Angular standalone components y separación por:

* `pages`
* `services`
* `guards`
* `routes`

---

# 📁 Estructura del Proyecto

```text id="3cx7sj"
Inventario_ccl/
├── Backend/
│   └── InventarioCcl.Api/
├── Frontend/
│   └── InventarioCcl-front/
├── database.sql
└── README.md
```

---

# 🛠️ Requisitos Previos

Para ejecutar el proyecto se recomienda utilizar las siguientes versiones:

| Herramienta | Versión recomendada |
| ----------- | ------------------- |
| .NET SDK    | 9.0.314             |
| Node.js     | 22 LTS              |
| PostgreSQL  | Última estable      |
| Git         | Última estable      |

## 📥 Descargas

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

# 🗄️ Configuración de Base de Datos

Crear en PostgreSQL la siguiente base de datos:

```sql id="lqfktx"
CREATE DATABASE "T001_inventario_ccl";
```

La tabla `Productos` se genera automáticamente mediante migraciones de Entity Framework Core.

---

# ⚙️ Configuración Local

El archivo:

```text id="iqrjlwm"
Backend/InventarioCcl.Api/appsettings.json
```

contiene placeholders seguros.

Para entorno local configurar:

```text id="z1t04h"
Backend/InventarioCcl.Api/appsettings.Development.json
```

## Ejemplo
## Ejemplo

```json id="trf8ea"
{
  "ConnectionStrings": {
    "defaultConnection": "Host=localhost;Port=5432;Database=T001_inventario_ccl;Username=postgres;Password=TU_PASSWORD"
  },
  "jwt": {
    "key": "TU_CLAVE_LOCAL_DE_AL_MENOS_32_CARACTERES",
    "issuer": "InventarioCclApi",
    "issuer": "InventarioCclApi",
    "audience": "InventarioCclFront"
  }
}
```

> `appsettings.Development.json` está ignorado por Git porque puede contener credenciales locales.

---
> `appsettings.Development.json` está ignorado por Git porque puede contener credenciales locales.

---

# ▶️ Ejecución del Backend

Ingresar a la carpeta del backend:

```bash id="r3epyr"
cd Backend/InventarioCcl.Api
```

## Restaurar dependencias

```bash id="0d66yn"
dotnet restore
```

## Instalar Entity Framework CLI (si es necesario)

```bash id="6hcb8s"
dotnet tool install --global dotnet-ef
```

## Validar instalación

```bash id="blz0ew"
dotnet ef --version
```

## Ejecutar migraciones

```bash id="6j9e6o"
dotnet ef database update
```

> Nota: en una base de datos nueva puede aparecer inicialmente un mensaje relacionado con `__EFMigrationsHistory`.
> Si al final aparece `Applying migration ... Done.`, la migración fue aplicada correctamente.

## Ejecutar API

```bash id="r4w0zv"
dotnet run
```

La API queda disponible en:

```text id="4m04ht"
http://localhost:5054
```

---

# ▶️ Ejecución del Frontend

Ingresar a la carpeta del frontend:

```bash id="3jx9bn"
cd Frontend/InventarioCcl-front
```

## Instalar dependencias

```bash id="0n80dc"
npm install
```

## Ejecutar aplicación

```bash id="d16nn6"
npx ng serve
```

La aplicación queda disponible en:
La aplicación queda disponible en:

```text id="7g3l3e"
http://localhost:4200
```

---

# 🔑 Credenciales de Prueba

```text id="3jgkr5"
Usuario: admin
Password: admin123
```

---

# 🌐 Endpoints Principales

## 🔐 Login
## 🔐 Login

```http id="h10yye"
POST /auth/login
```

### Body
### Body

```json id="sck2wt"
{
  "usuario": "admin",
  "password": "admin123"
}
```

---

## 📦 Consultar Inventario

```http id="th2ogq"
GET /productos/inventario
Authorization: Bearer {token}
```

---

## 🔄 Registrar Movimiento

```http id="x1g1li"
POST /productos/movimiento
Authorization: Bearer {token}
```

### Body
### Body

```json id="zjkylh"
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

# ✅ Validaciones Implementadas

* Login inválido.
* Cantidades menores o iguales a cero.
* Salidas con stock insuficiente.
* Bloqueo de salida para productos nuevos.
* Protección de rutas sin JWT.

---

# 📄 Notas Finales

* El proyecto fue probado en entorno limpio.
* Backend y frontend compilan correctamente.
* Se validó funcionamiento de migraciones y conexión PostgreSQL.
* El proyecto utiliza Angular 19 local mediante `npx`.
* El README incluye instrucciones completas de instalación y ejecución.

```
```
