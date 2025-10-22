const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/user.schema');
const Admin = require('../models/admin.schema');

class authController {
    static async register(req, res) {
        const {name, surname, email, tel, password, confirmPassword, role} = req.body;

        if (!name.trim() || !surname.trim() || !email.trim() || !tel.trim() || !password.trim() || !confirmPassword.trim()) {
            return res.status(400).json({
                success: false,
                message: `fill in all fields!`,
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: 'passwords do not match!',
            })
        }

        if (role !== 'admin' && role !== 'user') {
            return res.status(400).json({
                message: 'invalid role!',
            })
        }

        if (role === 'admin') {
            const adminExists = await Admin.findOne({});
            if (adminExists) {
                return res.status(400).json({
                    success: false,
                    message: 'Admin already exists!',
                });
            }
        }

        const existUser = role === 'admin' ? await Admin.findOne({email}) : await User.findOne({email});
        if (existUser) {
            return res.status(400).json({
                success: false,
                message: `email already exists!`,
            })
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 12);
            let user;
            if (role === 'user') {
                user = new User({name, surname, email, role, tel, password: hashedPassword})
            } else if (role === 'admin') {
                user = new Admin({name, surname, email, role, tel, password: hashedPassword})
            } else {
                return res.status(400).json({message: 'invalid role!'})
            }

            await user.save();

            res.status(200).json({success: true, message: 'User created successfully!', user});
        } catch (err) {
            console.error('register error', err);
            res.status(500).json({success: false, message: 'server error'});
        }
    }

    static async login(req, res) {
        const {email, password} = req.body;

        if (!email.trim() || !password.trim()) {
            return res.status(400).json({success: false, message: `fill in all fields!`});
        }

        const [admin, regularUser] = await Promise.all([
            Admin.findOne({email}),
            User.findOne({email})
        ]);

        const user = admin || regularUser;

        if (!user) {
            return res.status(400).json({success: false, message: 'Incorrect email or password!'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({success: false, message: 'Incorrect email or password!'});
        }

        try {
            const token = jwt.sign(
                {id: user._id, role: user.role},
                process.env.JWT_SECRET,
                {expiresIn: '7d'}
            );

            res.status(200).json({
                success: true,
                message: 'login success!',
                user,
                token
            });
        } catch (error) {
            console.log('Login error', error);
            res.status(500).json({
                success: false,
                message: 'server error',
            })
        }
    }

    static async fetchUser(req, res) {
        const userId = req.userId;

        try {
            const [admin, regularUser] = await Promise.all([
                Admin.findOne({_id: userId}),
                User.findOne({_id: userId})
            ]);

            const user = admin || regularUser;

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found!',
                });
            }

            res.status(200).json({
                success: true,
                message: 'User found!',
                user,
            });
        } catch (error) {
            console.error('Error in fetchUser:', error);
            res.status(500).json({
                success: false,
                message: 'Server error',
            });
        }
    }
}

module.exports = authController;