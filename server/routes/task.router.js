const express = require('express');
const router = express.Router();
const {addTask, getTasks, deleteTask, updateStatus, getAllTask} = require('../controller/TaskController');
const isAdmin = require('../middleware/isAdmin');
const auth = require('../middleware/auth');

router.post('/addTask/:id', isAdmin, addTask);
router.get('/getTasks', auth, getTasks);
router.put('/update-status/:id', updateStatus);
router.delete('/delete-task/:id', deleteTask);
router.get('/get-all-task', getAllTask);


module.exports = router;