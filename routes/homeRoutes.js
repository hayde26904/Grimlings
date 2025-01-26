const express = require('express');
const router = express.Router();

const isLoggedIn = require('../middleware/auth');
const requirePet = require('../middleware/requirePet');

router.get('/', (req, res) => {

    if(!req.session.user){
        return res.redirect('/about');
    }

    if(!req.session.chosenPet){
        return res.redirect('/pet/choosepet');
    }

    res.redirect('/map');
});

router.get('/about', (req, res) => {
    res.render('pages/index');
});

router.get('/map', requirePet, (req, res) => {
    res.render('pages/map');
});

module.exports = router;