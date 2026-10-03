# Tarea 07 – Frontend con Express, EJS y Materialize (JWT)

## Ejecutar
1. MongoDB corriendo en `localhost:27017` (con Docker: `docker start mongo-auth`).
2. `npm i`
3. `npm run dev` y abrir http://localhost:3000

Al iniciar se crean los roles (`seedRoles.js`) y el usuario administrador (`seedUsers.js`)
con las credenciales `ADMIN_EMAIL` / `ADMIN_PASSWORD` del `.env`.

## Cuentas de prueba
| Rol   | Email                          | Password      |
|-------|--------------------------------|---------------|
| admin | admin@tecsup.edu.pe            | ver `.env`    |
| user  | harold.salvador@tecsup.edu.pe  | Harold#2026   |
| user  | maria.quispe@tecsup.edu.pe     | Maria#2026    |
| user  | carlos.mendoza@tecsup.edu.pe   | Carlos#2026   |

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
