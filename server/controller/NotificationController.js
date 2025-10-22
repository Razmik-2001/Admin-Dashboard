const Notif = require('../models/notification.schema');
const mongoose = require('mongoose');

class NotificationController {
    static async getNotifications(req, res) {
        const id = new mongoose.Types.ObjectId(req.userId);

        try {
            const notifications = await Notif.find({recipientId: id});
            if (!notifications) {
                return res.status(404).json({
                    message: 'No notification found.',
                    success: false
                })
            }
            res.status(200).json({
                notifications,
                success: true,
                message: 'Successfully retrieved notifications.'
            });
        } catch (err) {
            console.error('Error retrieving notification', err);
            res.status(500).json({
                message: 'Error retrieving notification',
                success: false
            })
        }
    }

    static async readAll(req, res) {
        try {
            const id = new mongoose.Types.ObjectId(req.userId);

            const result = await Notif.updateMany(
                {recipientId: id, isRead: false},
                {$set: {isRead: true}}
            );

            res.status(200).json({
                success: true,
                message: 'All notifications marked as read.',
                modifiedCount: result.modifiedCount,
            });
        } catch (err) {
            console.error('Error updating notifications', err);
            res.status(500).json({
                message: 'Error marking notifications as read',
                success: false,
                error: err.message,
            });
        }
    }

    static async readOne(req, res) {
        try {
            const notificationId = req.params.id;

            if (!mongoose.Types.ObjectId.isValid(notificationId)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid notification ID.'
                });
            }

            const notification = await Notif.findById(notificationId);

            if (!notification) {
                return res.status(404).json({
                    success: false,
                    message: 'Notification not found.'
                });
            }

            if (!notification.isRead) {
                notification.isRead = true;
                await notification.save();
            }

            res.status(200).json({
                success: true,
                notification
            });
        } catch (err) {
            console.error('Error fetching notification:', err);
            res.status(500).json({
                success: false,
                message: 'Server error fetching notification.'
            });
        }
    }

}

module.exports = NotificationController;