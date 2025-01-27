const express = require('express');
const router = express.Router();
const requirePet = require('../middleware/requirePet');
const isLoggedIn = require('../middleware/auth');

const gameController = require('../controllers/gameController');

router.get('/clickergame', isLoggedIn, requirePet, gameController.clickerGame);
router.post('/clickergame', isLoggedIn, requirePet, gameController.clickerGameHandler);

module.exports = router;