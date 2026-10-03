import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import webRoutes from './routes/web.routes.js';
import seedRoles from './utils/seedRoles.js';
import seedUsers from './utils/seedUsers.js';
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Habilitar CORS para todos
app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/', webRoutes);

// Validar estado del servidor
app.get('/health', (req, res) => res.status(200).json({ ok: true }));

// 404 - Ruta no encontrada
app.use((req, res) => {
    if (req.path.startsWith('/api')) return res.status(404).json({ message: 'Ruta no encontrada' });
    res.status(404).render('404', { title: 'No encontrada' });
});

// Manejador global de errores
app.use((err, req, res, next) => {
    console.error(err);
    // Errores de validación de Mongoose => 400
    if (err.name === 'ValidationError' || err.name === 'CastError') err.status = 400;
    res.status(err.status || 500).json({ message: err.message || 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, { autoIndex: true })
    .then( async () => {
        console.log('Mongo connected');
        await seedRoles();
        await seedUsers();
        app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
    })
    .catch(err => {
        console.error('Error al conectar con Mongo:', err);
        process.exit(1);
    });
