import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    isVerified: { type: Boolean, default: false },
    location: String,
    age: Number,
    work: String,
    dob: Date,
    description: String
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
