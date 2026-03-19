# Floristeria Web - Fase 3

Proyecto base en **Next.js + Tailwind CSS** con:

- Sitio público para la floristería
- Panel administrador privado
- CRUD de productos
- Botón de admin oculto para usuarios finales
- Modo local con JSON para pruebas
- Integración opcional con **Supabase** para base de datos real e imágenes reales

## 1. Requisitos

Necesitas:

- **Node.js LTS** instalado
- npm funcionando

No necesitas instalar ningún programa adicional en tu PC aparte de Node.js.

## 2. Instalación

Abre una terminal dentro de la carpeta del proyecto y ejecuta:

```bash
npm install
npm run dev
```

Luego abre:

```bash
http://localhost:3000
```

## 3. Acceso al panel administrador

Ruta:

```bash
http://localhost:3000/admin/login
```

Credenciales por defecto:

```bash
Correo: admin@floreriaaura.com
Contraseña: Admin123*
```

## 4. Cambiar credenciales

Crea un archivo `.env.local` en la raíz con este contenido:

```env
ADMIN_EMAIL=tucorreo@dominio.com
ADMIN_PASSWORD=TuClaveSegura123
```

Luego reinicia el servidor.

## 5. Cómo funciona esta fase

### Modo local
Si no configuras Supabase todavía, el proyecto sigue funcionando y guardará productos en:

```bash
data/products.json
```

### Modo producción real con Supabase
Si completas la configuración de Supabase:

- los productos se guardarán en una base de datos real
- las imágenes se podrán subir desde el panel
- los datos dejarán de depender de tu PC

## 6. Configurar Supabase

### Paso 1: crear tu proyecto en Supabase
Crea una cuenta y un proyecto en Supabase.

### Paso 2: crear tablas y bucket
Dentro del zip te dejé este archivo:

```bash
supabase/schema.sql
```

Copia ese SQL y ejecútalo en el SQL Editor de Supabase.

Luego crea un bucket público llamado:

```bash
product-images
```

### Paso 3: obtener credenciales
En Supabase, copia estos valores:

- Project URL
- service_role key

### Paso 4: crear `.env.local`
Ejemplo:

```env
ADMIN_EMAIL=admin@floreriaaura.com
ADMIN_PASSWORD=Admin123*
SUPABASE_URL=https://TU-PROYECTO.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
SUPABASE_PRODUCTS_BUCKET=product-images
```

### Paso 5: reiniciar el proyecto
Después de guardar `.env.local`, reinicia:

```bash
npm run dev
```

## 7. Qué cambia cuando Supabase está activo

- el botón de Panel Admin ya no aparece en la web pública
- el acceso admin queda solo por URL directa
- crear, editar y eliminar productos funciona sobre Supabase
- puedes pegar una URL de imagen o subir una imagen desde tu PC
- si subes un archivo, se guardará en Supabase Storage

## 8. Rutas importantes

```bash
/                   -> página principal
/productos          -> catálogo
/categoria/[slug]   -> categorías
/admin/login        -> login administrador
/admin/dashboard    -> panel
/admin/productos    -> lista de productos
```

## 9. Nota honesta

Esta fase ya deja el proyecto listo para trabajar como demo o como base seria de producción.

Lo siguiente recomendable sería:

- CRUD de categorías desde el panel
- pedidos reales
- integración con WhatsApp con mensaje automático por producto
- deploy en Vercel
- dominios y SEO
