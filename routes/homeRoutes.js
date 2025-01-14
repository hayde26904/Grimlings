const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/auth');

router.get('/', (req, res) => {
    res.render('pages/index');
});

module.exports = router;