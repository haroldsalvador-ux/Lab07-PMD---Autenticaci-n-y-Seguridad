import express from 'express';

const router = express.Router();

// Las vistas solo se renderizan; la protección se hace en el cliente
// con el token JWT guardado en sessionStorage (ver public/js/auth.js)
router.get('/', (req, res) => res.redirect('/signIn'));
router.get('/signIn', (req, res) => res.render('signIn', { title: 'Iniciar sesión' }));
router.get('/signUp', (req, res) => res.render('signUp', { title: 'Registro' }));
router.get('/dashboard', (req, res) => res.render('dashboard', { title: 'Dashboard' }));
router.get('/admin', (req, res) => res.render('admin', { title: 'Administración' }));
router.get('/admin/users/:id', (req, res) => res.render('userDetail', { title: 'Detalle de usuario', userId: req.params.id }));
router.get('/profile', (req, res) => res.render('profile', { title: 'Mi cuenta' }));
router.get('/403', (req, res) => res.status(403).render('403', { title: 'Acceso denegado' }));

export default router;
