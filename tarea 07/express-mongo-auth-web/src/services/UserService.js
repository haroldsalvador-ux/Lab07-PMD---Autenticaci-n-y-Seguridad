import mongoose from 'mongoose';
import userRepository from '../repositories/UserRepository.js';

const EDITABLE_FIELDS = ['name', 'lastName', 'phoneNumber', 'birthdate', 'url_profile', 'address'];

function toDTO(user) {
    return {
        id: user._id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        birthdate: user.birthdate,
        age: user.age,
        url_profile: user.url_profile,
        address: user.address,
        roles: user.roles.map(r => r.name),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
}

class UserService {

    async getAll() {
        const users = await userRepository.getAll();
        return users.map(toDTO);
    }

    async getById(id) {
        if (!mongoose.isValidObjectId(id)) {
            const err = new Error('Usuario no encontrado');
            err.status = 404;
            throw err;
        }
        const user = await userRepository.findById(id);
        if (!user) {
            const err = new Error('Usuario no encontrado');
            err.status = 404;
            throw err;
        }
        return toDTO(user);
    }

    async updateMe(id, data) {
        const changes = {};
        for (const f of EDITABLE_FIELDS) {
            if (data[f] !== undefined) changes[f] = data[f];
        }
        const user = await userRepository.update(id, changes);
        if (!user) {
            const err = new Error('Usuario no encontrado');
            err.status = 404;
            throw err;
        }
        return toDTO(user);
    }
}

export default new UserService();
