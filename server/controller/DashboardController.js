const User = require('../models/user.schema');
const Task = require('../models/task.schema');
const Admin = require("../models/admin.schema");
const bcrypt = require("bcrypt");

class DashboardController {
    static getAllUsers = async (req, res) => {
        try {
            const users = await User.find({});

            if (!users || users.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No users found"
                });
            }

            res.status(200).json({
                success: true,
                users,
                message: "Users successfully found"
            });

        } catch (err) {
            console.error('Error retrieving users:', err);
            res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
    }

    static deleteUser = async (req, res) => {
        const {id} = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        try {
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                userId: id
            })
        } catch (err) {
            console.error('Delete error', err);
            res.status(500).json({
                success: false,
                message: "Server error"
            })
        }
    }

    static updateUser = async (req, res) => {
        const {id} = req.params;
        const {status} = req.body;

        try {
            let newStatus;
            if (status === 'Active') {
                newStatus = 'Blocked';
            } else if (status === 'Blocked') {
                newStatus = 'Active';
            } else {
                return res.status(400).json({message: "Invalid status value"});
            }

            const user = await User.findByIdAndUpdate(
                id,
                {status: newStatus},
                {new: true}
            );

            if (!user) {
                return res.status(404).json({message: "User not found"});
            }

            res.status(200).json({message: "User status updated", user});
        } catch (err) {
            console.error('Error updated user', err);
            res.status(500).json({message: "Server error"});
        }
    };

    static addUser = async (req, res) => {
        const {name, surname, email, tel, password, role} = req.body;
        console.log(name, surname, email, tel, password, role);

        if (!name.trim() || !surname.trim() || !email.trim() || !tel.trim() || !password.trim()) {
            return res.status(400).json({
                success: false,
                message: `fill in all fields!`,
            })
        }

        const existUser = await User.findOne({email});
        if (existUser) {
            return res.status(400).json({
                success: false,
                message: `email already exists!`,
            })
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new User({name, surname, email, role, tel, password: hashedPassword})

            await newUser.save();

            res.status(200).json({success: true, message: 'User created successfully!', newUser});
        } catch (err) {
            console.error('register error', err);
            res.status(500).json({success: false, message: 'server error'});
        }
    }

    static getUserTask = async (req, res) => {
        const {id} = req.params

        try {
            const tasks = await Task.find({assignedTo: id});
            if (!tasks && tasks.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No tasks found"
                })
            }

            res.status(200).json({
                success: true,
                tasks
            })
        } catch (err) {
            console.error('Error retrieving task tasks', err);
            res.status(500).json({
                success: false,
                message: "Server error"
            })
        }


    }
}

module.exports = DashboardController;