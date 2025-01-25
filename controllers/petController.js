const jwt = require('jsonwebtoken');
const urlHelper = require('../util/urlHelper.js');

const joi = require('joi');

const petService = require('../services/petService.js');

const petRules = require('../formValidationRules/petRules.json');
const petSpecies = require('../data/species.json');

async function petCreationPage(req, res){
    res.render('pages/createPet', {species: petSpecies});
}

async function petChoosePage(req, res) {
    const userId = req.session.user.uid;

    try {
        const pets = await petService.getUserPets(userId);
        res.render('pages/choosepet', { species: petSpecies, pets: pets });
    } catch (error) {
        res.render('error', { error: new Error('Error fetching pets') });
    }
}

async function choosePet(req, res) {
    try {
        const userPets = await petService.getUserPets(req.session.user.uid);
        res.render('pages/choosepet', { pets: userPets, species: petSpecies });
    } catch (error) {
        res.render('error', { error: new Error('Error retrieving pets') });
    }
}

async function createPet(req, res){
    const data = {
        petName: req.body.petName,
        speciesID: req.body.speciesID
    }

    try {    
        const petUID = petService.registerPet(req.session.user.uid, data.speciesID, data.petName);
        return res.redirect('/');
    } catch(error){
        return res.render('error', {error: new Error('Error creating pet')});
    }

}

module.exports = {
    petCreationPage,
    createPet,
    petChoosePage,
    choosePet
}