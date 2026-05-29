-- Script de referencia para crear la base de datos del proyecto

CREATE DATABASE "T001_inventario_ccl";

-- Después de crear la base de datos, conectarse a "T001_inventario_ccl"
-- y ejecutar la creación de la tabla:

CREATE TABLE IF NOT EXISTS "Productos" (
    "Id" SERIAL PRIMARY KEY,
    "Nombre" TEXT NOT NULL,
    "Cantidad" INTEGER NOT NULL
);