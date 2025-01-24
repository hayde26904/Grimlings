const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/auth');

const petController = require('../controllers/petController');

router.get('/createpet', isLoggedIn, petController.petCreationPage);
router.post('/createpet', isLoggedIn, petController.createPet);

router.get('/choosepet', isLoggedIn, petController.petChoosePage)
router.post('/choosepet', isLoggedIn, petController.choosePet);

router.get('/games', isLoggedIn, (req, res) => {
    res.render('pages/games');
});

module.exports = router;