const path = require('path');
const sql = require('sqlite3').verbose();
const db = require('../util/dbAsyncWrapper');
const joi = require('joi');

const petRules = require('../formValidationRules/petRules.json');

const petSchema = joi.object({
    name: joi.string().alphanum().min(petRules.minNameLength).max(petRules.maxNameLength).required(),
    speciesID: joi.string().alphanum().required()
});

const dbInstance = new sql.Database(process.env.DB_PATH);

async function registerPet(userUID, speciesID, name){

    const data = {
        name,
        speciesID
    }

    const { error, validatedData } = petSchema.validate(data);

    if (error) {
        //GET OUT
        return
    }
    
    //register pet into db
    let lastID = await db.run(dbInstance, 'INSERT INTO pets (user_uid, species_id, name) VALUES(?,?, ?);', [userUID, validatedData.speciesID, validatedData.name]);
    return lastID;
}

async function getUserPets(userUID){
    let pets = await db.all(dbInstance, 'SELECT * FROM pets WHERE user_uid = ?;', [userUID]);
    return pets ?? null;
}

module.exports = {
    registerPet,
    getUserPets,
}