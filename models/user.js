import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nombre es requerido'],
        trim: true,
        minLength: 1,
        maxLength: 20,
    },
    email: {
        type: String,
        required: [true, 'Email es requerido'],
        index: true,
        lowercase: true,
        unique: true,
        trim: true,
        minLength: 5,
        maxLength: 40,
    },
    password: String,
    role: {
        type: String,
        default: 'user', // Puede ser 'admin' o 'user'
    },
    image: String,
    resetCode: {
        data: String,
        expiresAt: {
            type: Date,
            default: () => Date.now() + 10 * 60 * 1000, // 10 minutos
        },
    },
}, { timestamps: true });
userSchema.plugin(uniqueValidator, { message: 'iya existe' });
export default mongoose.models.User || mongoose.model('User', userSchema);