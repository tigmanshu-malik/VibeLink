const express = require('express');
const router = express.Router();
const { getUsers, getUser, updateProfile, changePassword } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// Protect all routes in this router
router.use(protect);

// User routes
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/profile', updateProfile);
router.put('/changepassword', changePassword);

module.exports = router;
