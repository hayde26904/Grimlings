const jwt = require('jsonwebtoken');
const urlHelper = require('../util/urlHelper.js');

const joi = require('joi');

const petService = require('../services/petService.js');

const petRules = require('../formValidationRules/petRules.json');
const petSpecies = require('../data/species.json');

//Pet Creation
async function petCreationPage(req, res) {
    res.render('pages/createPet', { species: petSpecies });
}

async function createPet(req, res) {
    const data = {
        petName: req.body.petName,
        speciesID: req.body.speciesID
    }

    try {
        const petUID = petService.registerPet(req.session.user.uid, data.speciesID, data.petName);
        return res.redirect('/');
    } catch (error) {
        return res.render('pages/error', { error: new Error('Error creating pet') });
    }

}

//Pet Choose
async function petChoosePage(req, res) {
    const userId = req.session.user.uid;

    try {
        const pets = await petService.getUserPets(userId);
        res.render('pages/choosepet', { species: petSpecies, pets: pets });
    } catch (error) {
        res.render('pages/error', { error: new Error('Error fetching pets') });
    }
}

async function choosePet(req, res) {
    const petUID = req.body.pet_uid;
    // console.log(petUID, '(pet controller: function choosePet: petUID)');

    try {
        const pet = await petService.getPetByUID(petUID);
        req.session.chosenPet = pet;
        // console.log(req.session.chosenPet, '(pet controller: function choosePet)');
        res.redirect('/');
    }catch (error) {
        res.render('pages/error', { error: new Error('Error choosing pet') });
    }
}

module.exports = {
    petCreationPage,
    createPet,
    petChoosePage,
    choosePet
}