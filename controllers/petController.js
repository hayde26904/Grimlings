const jwt = require('jsonwebtoken');
const urlHelper = require('../util/urlHelper.js');

const joi = require('joi');

const petService = require('../services/petService.js');

const petRules = require('../formValidationRules/petRules.json');
const petSpecies = require('../data/species.json');

const petSchema = joi.object({
    name: joi.string().alphanum().min(petRules.minNameLength).max(petRules.maxNameLength).required(),
    speciesID: joi.string().alphanum().required()
});

async function petCreationPage(req, res){
    res.render('pages/createPet', {species: petSpecies});
}

async function createPet(req, res){
    const data = {
        name: req.body.name,
        speciesID: req.body.speciesID
    }

    const { error, validatedData } = petSchema.validate(data);

    if (error) {
        //GET OUT
        res.redirect('/error');
    }

    const petUID = petService.registerPet(req.session.user.uid, validatedData.speciesID, validatedData.name);

    res.redirect('/');

}

module.exports = {
    createPet
}