const express = require('express');
const router = express.Router();
const authRouter = require('../routes/auth.router');
const dashboardRouter = require('../routes/dashboard.router')
const taskRouter = require('./task.router');
const notificationRouter = require('./notification.router');
const profileRouter = require('./profile.router');

router.use('/api', authRouter);
router.use('/api', dashboardRouter);
router.use('/api', taskRouter);
router.use('/api', notificationRouter);
router.use('/api', profileRouter);

module.exports = router;