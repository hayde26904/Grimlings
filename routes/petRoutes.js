const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/auth');

const { run } = require('../util/dbAsyncWrapper');
const { get } = require('../util/dbAsyncWrapper');
const { all } = require('../util/dbAsyncWrapper');

router.get('/createpet', isLoggedIn, (req, res) => {
    res.render('pages/createpet');
});

router.get('/games', isLoggedIn, (req, res) => {
    res.render('pages/games');
});

//Hayden I will fix this up for you don't worry i will put all this into petService.
//I just want to get this done rn

router.post('/games', isLoggedIn, async (req, res) => {
    const timesFed = req.body.timesFed;
    const username = req.session.user.fb_name;

    try {
        const sqlSelect = `SELECT feed_count FROM users WHERE fb_name = ?`;
        const result = await get(sqlSelect, [username]);
        const currentFeedCount = result.feed_count;

        if (timesFed > currentFeedCount) {
            const sqlUpdate = `UPDATE users SET feed_count = ? WHERE fb_name = ?`;
            await run(sqlUpdate, [timesFed, username]);
            console.log(`Pet has been fed ${timesFed} times by ${username}`);
        } else {
            console.log(`New feed count ${timesFed} is not greater than current feed count ${currentFeedCount}`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while updating feed count');
    }
});

// router.post('/createpet', isLoggedIn, petController.createPet);

module.exports = router;