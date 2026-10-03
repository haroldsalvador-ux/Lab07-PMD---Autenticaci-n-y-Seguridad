# Tarea 07 – Frontend con Express, EJS y Materialize (JWT)

## Ejecutar
1. MongoDB corriendo en `localhost:27017` (con Docker: `docker start mongo-auth`).
2. Crear el archivo `.env` (no se incluye en el repositorio):
   - `PORT`, `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `BCRYPT_SALT_ROUNDS`
   - `ADMIN_EMAIL` y `ADMIN_PASSWORD`: credenciales del administrador que crea `seedUsers.js`
     (si el password tiene `#`, escribirlo entre comillas).
3. `npm i`
4. `npm run dev` y abrir http://localhost:3000

Al iniciar se crean los roles (`seedRoles.js`) y el usuario administrador (`seedUsers.js`).
Los usuarios con rol `user` se registran desde `/signUp`.

## Páginas
| Ruta | Descripción | Acceso |
|------|-------------|--------|
| `/signIn` | Inicio de sesión, guarda el JWT en sessionStorage | público |
| `/signUp` | Registro (rol user por defecto) | público |
| `/dashboard` | Dashboard de usuario | user o superior |
| `/profile` | Mi cuenta: ver y editar datos | user o superior |
| `/admin` | Lista de usuarios | admin |
| `/admin/users/:id` | Detalle de un usuario | admin |
| `/403` | Acceso denegado | – |
| cualquier otra | 404 No encontrada | – |

## API
| Método | Ruta | Acceso |
|--------|------|--------|
| POST | `/api/auth/signUp` | público |
| POST | `/api/auth/signIn` | público |
| GET | `/api/users` | admin |
| GET | `/api/users/me` | autenticado |
| PUT | `/api/users/me` | autenticado |
| GET | `/api/users/:id` | admin |
