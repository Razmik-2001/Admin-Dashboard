const User = require('../models/user.schema');
const Admin = require('../models/admin.schema');
const bcrypt = require('bcrypt');

class ProfileController {

    static async changePassword(req, res) {
        const id = req.userId;
        const {currentPassword, password, confirmPassword} = req.body;

        try {
            if (password !== confirmPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Passwords do not match",
                });
            }

            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Wrong current password",
                });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user.password = hashedPassword;
            await user.save();

            res.status(200).json({
                success: true,
                message: "Password changed successfully",
            });
        } catch (err) {
            console.error("Change password error:", err);
            res.status(500).json({
                success: false,
                message: "Server error while changing password",
            });
        }
    }

    static async changeInfo(req, res) {
        const id = req.userId;
        const data = req.body;

        try {
            const updatedUser = await User.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true
            });

            if (!updatedUser) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'User information updated successfully',
                user: updatedUser
            });
        } catch (err) {
            console.error('Error updating user info:', err.message);
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
    }

    static async uploadAvatar(req, res) {
        try {
            const userId = req.userId;
            if (!req.file) {
                return res.status(400).json({success: false, message: "No file uploaded"});
            }

            const avatarUrl = `http://localhost:5000/uploads-image/${req.file.filename}`;

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {avatar: avatarUrl},
                {new: true}
            );

            return res.status(200).json({
                success: true,
                message: "Profile image updated",
                user: updatedUser,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({success: false, message: "Server Error"});
        }
    }
}

module.exports = ProfileController;