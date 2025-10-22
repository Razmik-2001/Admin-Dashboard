const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipientId: {type: mongoose.Schema.Types.ObjectId, required: true},
    recipientRole: {type: String, enum: ['user', 'admin'], required: true},
    type: {type: String, enum: ['message', 'comment', 'report', 'system'], required: true},
    refId: {type: mongoose.Schema.Types.ObjectId, required: false},
    content: {type: String, required: true},
    isRead: {type: Boolean, default: false},
}, {
    timestamps: true,
});

module.exports = mongoose.model('Notification', notificationSchema);
