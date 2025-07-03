const express = require('express');
const router = express.Router();
const playerController = require('../controllers/player.controller');
const auth = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');

// Public routes
router.get('/', playerController.getPlayers);
router.get('/:id', playerController.getPlayerById);
router.post('/:id/comments', auth, playerController.addComment);

// Admin routes
router.post('/', auth, isAdmin, playerController.createPlayer);
router.put('/:id', auth, isAdmin, playerController.updatePlayer);
router.delete('/:id', auth, isAdmin, playerController.deletePlayer);

module.exports = router;
