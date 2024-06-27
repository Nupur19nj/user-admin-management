import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true }
});

const AdminModel = mongoose.model('Admin', AdminSchema);

export default AdminModel;
