import authService from '../services/AuthService.js';

class AuthController {

    async signUp(req, res, next) {
        try {
            const { email, password, name, lastName, phoneNumber, birthdate, url_profile, address } = req.body;
            if (!email || !password) 
                return res.status(400).json({ message: 'El email y password son requeridos' });
            
            // El registro público siempre asigna el rol user
            const user = await authService.signUp({ email, password, name, lastName, phoneNumber, birthdate, url_profile, address });
            return res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    }

    async signIn(req, res, next) {
        try {
            const { email, password } = req.body;
            
            if (!email || !password) 
                return res.status(400).json({ message: 'El email y password son requeridos' });
            
            const token = await authService.signIn({ email, password });
            return res.status(200).json(token);
        } catch (err) {
            next(err);
        }
    }
}

export default new AuthController();
