import bcrypt from 'bcrypt';
import userRepository from '../repositories/UserRepository.js';
import roleRepository from '../repositories/RoleRepository.js';

export default async function seedUsers() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !password) return;

    const existing = await userRepository.findByEmail(email);
    if (existing) return;

    const userRole = await roleRepository.findByName('user');
    const adminRole = await roleRepository.findByName('admin');
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10);

    await userRepository.create({
        email,
        password: await bcrypt.hash(password, saltRounds),
        name: 'Administrador',
        lastName: 'Sistema',
        phoneNumber: '999999999',
        birthdate: new Date('1995-01-15'),
        address: 'Tecsup - Arequipa',
        roles: [userRole._id, adminRole._id]
    });
    console.log(`Seeded admin: ${email}`);
}
