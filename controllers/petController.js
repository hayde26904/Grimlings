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
async function choosePetPage(req, res) {
    const userId = req.session.user.uid;

    try {
        const pets = await petService.getUserPets(userId);
        res.render('pages/choosepet', { species: petSpecies, pets: pets });
    } catch (error) {
        res.render('pages/error', { error: error });
    }
}

async function choosePet(req, res, next) {
    const petUID = req.body.pet_uid;

    try {
        const pet = await petService.getPetByUID(petUID);

        if(pet.user_uid !== req.session.user.uid){
            throw new Error('Not your pet, pal');
        }

        req.session.chosenPet = pet;
        req.session.redirectURL = '/';
        next()

    }catch (error) {
        res.render('pages/error', { error: error });
    }
}

module.exports = {
    petCreationPage,
    createPet,
    choosePetPage,
    choosePet
}