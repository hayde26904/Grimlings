const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/auth');

router.get('/', (req, res) => {
    res.render('pages/index');
});

router.get('/error', (req, res) => {
    res.render('pages/error');
});

router.get('/end', isLoggedIn, (req, res) => {
    res.render('pages/end');
});

module.exports = router;