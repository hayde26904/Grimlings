const jwt = require('jsonwebtoken');
const urlHelper = require('../util/urlHelper.js');

const joi = require('joi');

//sometimes its better to get sleep and be productive instead of a zombie - Robert Ambartsumyan at 1:01 AM

const gameService = require('../services/gameService.js');

//Clicker Game
async function clickerGame(req, res) {
    res.render('pages/games/clickergame');
}

async function clickerGameHandler(req, res) {
    //setup
}

//Main map
async function mainMap(req, res) {
    res.render('pages/games/mainmap');
}

async function mainMapHandler(req, res) {
    //Gonna put most of this into service file
    //I love being clean an moist - Robert Ambartsumyan at 1:03 AM
    const { building } = req.body;

    if (!building) {
        res.render('pages/error', { message: 'Building not specified.' });
    }

    console.log(`Building clicked: ${building}`);

    switch (building) {
        case 'bank':
            break;
        case 'arcade':
            break;
        case 'bar':
            break;
        case 'house':
            break;
        default:
            res.render('pages/error', { message: 'Unknown building.' });
    }
}

module.exports = {
    clickerGame,
    clickerGameHandler,
    mainMap,
    mainMapHandler
};