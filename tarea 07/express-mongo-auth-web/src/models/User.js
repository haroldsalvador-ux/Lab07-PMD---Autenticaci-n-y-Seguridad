import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    roles: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Role' 
    }],
    name: { 
        type: String,
        required: [true, 'El nombre es requerido'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'El apellido es requerido'],
        trim: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'El teléfono es requerido'],
        trim: true
    },
    birthdate: {
        type: Date,
        required: [true, 'La fecha de nacimiento es requerida']
    },
    url_profile: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Edad calculada a partir de birthdate (no se guarda en la BD)
UserSchema.virtual('age').get(function () {
    if (!this.birthdate) return null;
    const today = new Date();
    let age = today.getFullYear() - this.birthdate.getFullYear();
    const m = today.getMonth() - this.birthdate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < this.birthdate.getDate())) age--;
    return age;
});

export default mongoose.model('User', UserSchema);
