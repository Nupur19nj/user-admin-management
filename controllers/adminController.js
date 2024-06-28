import AdminModel from '../models/Admin.model.js';
import UserModel from '../models/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const registerAdmin = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const existingAdmin = await AdminModel.findOne({ $or: [{ username }, { email }] });
        if (existingAdmin) return res.status(400).json({ message: 'Username or email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new AdminModel({ username, password: hashedPassword, email });
        await newAdmin.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginAdmin = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;

        const admin = await AdminModel.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
        if (!admin) return res.status(400).json({ message: 'Admin not found' });

        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

        const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.header('Authorization', `Bearer ${token}`).json({ message: 'Logged in successfully', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const viewAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select('username');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const viewUserDetails = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await UserModel.findOne({ username }).select('-password');
        if (!user) return res.status(400).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { username } = req.params;
        await UserModel.findOneAndDelete({ username });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
