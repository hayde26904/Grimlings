const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const redirectWhenDone = require('../middleware/redirect');

router.get('/login', userController.login, redirectWhenDone);

module.exports = router;