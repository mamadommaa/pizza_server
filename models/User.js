import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

export default mongoose.model('User', UserSchema, "user");
