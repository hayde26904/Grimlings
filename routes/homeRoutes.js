const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/auth');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/menu', isLoggedIn, (req, res) => {
    res.render('menu');
});

router.get('/newGame', isLoggedIn, (req, res) => {
    res.render('newGame');
});

/*
router.get('/about', (req, res) => {
    res.render('about');
});
*/

module.exports = router;