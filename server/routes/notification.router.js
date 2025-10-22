const express = require('express');
const router = express.Router();
const {getNotifications, readAll, readOne} = require('../controller/NotificationController');
const auth = require('../middleware/auth');

router.get('/notifications', auth, getNotifications);
router.put('/read-all', auth, readAll);
router.get('/notification/:id', auth, readOne);

module.exports = router;