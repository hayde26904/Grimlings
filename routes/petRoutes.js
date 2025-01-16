const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/auth');

const petController = require('../controllers/petController');

router.get('/createpet', isLoggedIn, (req, res) => {
    res.render('pages/createpet');
});

router.get('/games', isLoggedIn, (req, res) => {
    res.render('pages/games');
});

router.post('/createpet', isLoggedIn, petController.createPet);

module.exports = router;