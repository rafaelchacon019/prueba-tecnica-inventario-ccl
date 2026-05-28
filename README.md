# Prueba Técnica - Inventario CCL

Aplicación web para gestión básica de inventario desarrollada con Angular y ASP.NET Core utilizando autenticación JWT y PostgreSQL.

# Tecnologías utilizadas

## Frontend

* Angular
* TypeScript
* SCSS
* Angular Router
* HttpClient

## Backend

* ASP.NET Core Web API
* Entity Framework Core
* JWT Authentication
* PostgreSQL

## Base de datos

* PostgreSQL

# Funcionalidades implementadas

## Autenticación

* Login básico con JWT.
* Protección de rutas mediante Auth Guard.
* Persistencia del token en localStorage.

## Inventario

* Consulta de inventario actual.
* Registro de entradas de productos.
* Registro de salidas de productos.
* Validación de stock disponible.
* Prevención de salidas para productos inexistentes.

## UX/UI

* Pantallas separadas para:

  * Consulta de inventario.
  * Registro de movimientos.
* Layout responsive básico.

# Estructura del proyecto

```text
Inventario_ccl/
│
├── Backend/
│   └── InventarioCcl.Api/
│
├── Frontend/
│   └── InventarioCcl-front/
│
└── README.md
```

# Configuración de base de datos

Crear una base de datos PostgreSQL llamada:

```sql
inventario_ccl
```

Configurar la cadena de conexión en:

```text
Backend/InventarioCcl.Api/appsettings.json
```

Ejemplo:

```json
"ConnectionStrings": {
  "defaultConnection": "Host=localhost;Port=5432;Database=inventario_ccl;Username=postgres Password=TU_PASSWORD"
}
```

# Ejecución Backend

Ubicarse en:

```bash
Backend/InventarioCcl.Api
```

Restaurar dependencias:

```bash
dotnet restore
```

Ejecutar migraciones:

```bash
dotnet ef database update
```

Ejecutar API:

```bash
dotnet run
```

La API quedará disponible en:

```text
http://localhost:5054
```

# Ejecución Frontend

Ubicarse en:

```bash
Frontend/InventarioCcl-front
```

Instalar dependencias:

```bash
npm install
```

Ejecutar aplicación:

```bash
ng serve
```

La aplicación quedará disponible en:

```text
http://localhost:4200
```

# Credenciales de prueba

```text
Usuario: admin
Contraseña: admin123
```

# Endpoints principales

## Login

```http
POST /auth/login
```

## Consultar inventario

```http
GET /productos/inventario
```

## Registrar movimiento

```http
POST /productos/movimiento
```

# Consideraciones

* Para fines de la prueba técnica el token JWT se almacena en localStorage.
* En un entorno productivo se recomienda el uso de cookies HttpOnly y políticas adicionales de seguridad.
* El frontend utiliza Angular standalone components.
