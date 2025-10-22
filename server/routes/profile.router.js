const express = require("express");
const router = express.Router();
const {changePassword, changeInfo, uploadAvatar} = require("../controller/ProfileController");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const upload = require('../middleware/upload');

router.put('/change-password', auth, changePassword);
router.put('/changeUserInfo', auth, changeInfo);
router.post("/upload-avatar", auth, upload.single("avatar"), uploadAvatar);

module.exports = router;