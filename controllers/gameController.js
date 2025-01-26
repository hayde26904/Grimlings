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

module.exports = {
    clickerGame,
    clickerGameHandler,
};