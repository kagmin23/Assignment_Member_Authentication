const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');
const {
  getAllMembers,
  updateSelf,
  changePassword,
  getSelf,
} = require('../controllers/member.controller');

// Admin: get all members
router.get('/accounts', auth, isAdmin, getAllMembers);

// Member: update own profile
router.get("/me", auth, getSelf);
router.put('/me', auth, updateSelf);

// Member: change own password
router.put('/me/change-password', auth, changePassword);

module.exports = router;
