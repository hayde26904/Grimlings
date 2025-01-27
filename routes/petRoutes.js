const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/auth');
const requirePet = require('../middleware/requirePet');

const petController = require('../controllers/petController');
const redirectWhenDone = require('../middleware/redirect');

router.get('/createpet', isLoggedIn, petController.petCreationPage);
router.post('/createpet', isLoggedIn, petController.createPet);

router.get('/choosepet', isLoggedIn, petController.choosePetPage)
router.post('/choosepet', isLoggedIn, petController.choosePet, redirectWhenDone);

module.exports = router;