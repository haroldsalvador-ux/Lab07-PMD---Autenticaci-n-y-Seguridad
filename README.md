# Laboratorio 07 – Seguridad en aplicaciones con JWT

Desarrollo de Aplicaciones Web Avanzado – Tecsup 2026

| Carpeta | Contenido |
|---------|-----------|
| [`lab 07/express-mongo-auth`](lab%2007/express-mongo-auth) | API REST con Express, MongoDB (Mongoose), bcrypt y JWT (laboratorio) |
| [`tarea 07/express-mongo-auth-web`](tarea%2007/express-mongo-auth-web) | Frontend con EJS + Materialize integrado a la API, roles user/admin (tarea) |

## Ejecutar
```bash
cd "tarea 07/express-mongo-auth-web"   # o "lab 07/express-mongo-auth"
npm i
npm run dev
```
Requiere MongoDB en `mongodb://localhost:27017`.

## Variables de entorno
Los archivos `.env` no se incluyen en el repositorio. Crear un archivo `.env` en la raíz del proyecto con estas variables:

| Variable | Descripción |
|----------|-------------|
| `PORT` | Puerto del servidor (ej. 3000) |
| `MONGODB_URI` | Cadena de conexión, ej. `mongodb://localhost:27017/auth_db` |
| `JWT_SECRET` | Clave secreta para firmar y verificar los tokens |
| `JWT_EXPIRES_IN` | Tiempo de expiración del token (ej. `1h`) |
| `BCRYPT_SALT_ROUNDS` | Rondas de hashing de bcrypt (ej. `10`) |

La tarea además usa `ADMIN_EMAIL` y `ADMIN_PASSWORD` para crear el usuario administrador (si el password tiene `#`, escribirlo entre comillas).

