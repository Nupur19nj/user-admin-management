import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.model.js';
import OTPModel from '../models/OTP.model.js';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendOTP = async (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    const newOTP = new OTPModel({ email, otp });
    await newOTP.save();
};

export const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });
        if (existingUser) return res.status(400).json({ message: 'Username or email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({ username, password: hashedPassword, email });
        await newUser.save();

        await sendOTP(email);

        res.status(201).json({ message: 'User registered successfully. Check your email for OTP.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const validOTP = await OTPModel.findOne({ email, otp });
        if (!validOTP) return res.status(400).json({ message: 'Invalid OTP' });

        await UserModel.updateOne({ email }, { isVerified: true });

        await OTPModel.deleteOne({ email, otp });

        res.status(200).json({ message: 'User verified successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {};

export const getUser = async (req, res) => {};

export const updateUser = async (req, res) => {};
