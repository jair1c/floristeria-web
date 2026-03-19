# Floristería Web

Sitio web de floristería desarrollado con **Next.js** y **Tailwind
CSS**, con catálogo público y panel de administración para gestionar
productos.

## Características

-   Página principal moderna
-   Catálogo de productos
-   Categorías de productos
-   Panel de administración
-   Crear, editar y eliminar productos
-   Activar o desactivar productos
-   Marcar productos como destacados
-   Subida de imágenes
-   Integración con Supabase

## Tecnologías

-   Next.js
-   React
-   Tailwind CSS
-   Supabase

## Instalación

Clona el proyecto y entra a la carpeta:

git clone https://github.com/jair1c/floristeria-web.git cd
floristeria-web

Instala dependencias:

npm install

Inicia el entorno de desarrollo:

npm run dev

Abre en el navegador:

http://localhost:3000

## Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con esta
estructura:

NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
NEXT_PUBLIC_SUPABASE_BUCKET=product-images

ADMIN_EMAIL=tu_correo_admin ADMIN_PASSWORD=tu_clave_admin

## Panel de administración

Ruta de acceso:

/admin/login

Las credenciales del administrador se configuran únicamente en el
archivo `.env.local`.

## Configuración de Supabase

### 1. Crear proyecto

Crea un proyecto en Supabase.

### 2. Ejecutar el esquema SQL

Usa el archivo correspondiente del proyecto para crear las tablas
necesarias.

### 3. Crear bucket de imágenes

Crea un bucket público llamado:

product-images

### 4. Configurar policies

Debes permitir al menos:

-   INSERT
-   SELECT

para el bucket de imágenes, según la configuración de tu proyecto.

## Estructura general

app/ components/ lib/ public/ data/ supabase/

## Notas

-   No subas `.env.local` al repositorio.
-   No subas `node_modules`.
-   No subas `.next`.
-   Configura las variables de entorno también en Vercel al momento del
    despliegue.

## Deploy

Este proyecto puede desplegarse fácilmente en **Vercel** conectando el
repositorio de GitHub y agregando las variables de entorno del archivo
`.env.local`.

## Estado del proyecto

Base funcional con catálogo público y administración de productos.
Preparado para futuras mejoras como:

-   carrito de compras
-   pedidos por WhatsApp
-   pagos en línea
-   dashboard más avanzado
-   dominio personalizado
