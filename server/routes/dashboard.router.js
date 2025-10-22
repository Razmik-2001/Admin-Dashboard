const express = require('express');
const router = express.Router();
const {getAllUsers, deleteUser, updateUser, getUserTask} = require('../controller/DashboardController')
const isAdmin = require('../middleware/isAdmin');
const {addUser} = require('../controller/DashboardController');

router.get('/getUsers', getAllUsers);
router.delete('/delete/user:id', isAdmin, deleteUser);
router.put('/update/user/:id', isAdmin, updateUser);
router.post('/addUser', isAdmin, addUser);
router.get('/get-user-tasks/:id', getUserTask);

module.exports = router;