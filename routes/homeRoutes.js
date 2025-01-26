const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/auth');

router.get('/', (req, res) => {
    res.render('pages/index');
});

router.get('/end', isLoggedIn, (req, res) => {
    res.render('pages/end');
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Failed to destroy session.");
        }
        res.redirect('/');
    });
});

module.exports = router;