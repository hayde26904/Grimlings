const joi = require('joi');
const petRules = require('../formValidationRules/petRules.json');

const petSchema = joi.object({
    petName: joi.string().min(petRules.minNameLength).max(petRules.maxNameLength).required(),
    speciesID: joi.string().alphanum().required()
});

module.exports = petSchema;