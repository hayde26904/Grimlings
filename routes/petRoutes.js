const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/auth');
const requirePet = require('../middleware/requirePet');

const petController = require('../controllers/petController');

router.get('/createpet', isLoggedIn, petController.petCreationPage);
router.post('/createpet', isLoggedIn, petController.createPet);

router.get('/choosepet', isLoggedIn, petController.petChoosePage)
router.post('/choosepet', isLoggedIn, petController.choosePet);

module.exports = router;