const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/auth');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/dashboard', isLoggedIn, (req, res) => {
    res.render('dashboard');
});

module.exports = router;