const path = require('path');
const sql = require('sqlite3').verbose();
const db = require('../util/dbAsyncWrapper');
const joi = require('joi');

const petSchema = require('../models/petModel');

async function registerPet(userUID, speciesID, petName){

    const data = {
        petName,
        speciesID
    }

    const { error } = petSchema.validate(data);

    if (error) {
        throw new Error('Invalid data: ' + error.message);
    }  

    try {
        //register pet into db
        let lastID = await db.run('INSERT INTO pets (user_uid, species_id, name, health, food, happiness) VALUES(?, ?, ?, ?, ?, ?);', [userUID, data.speciesID, data.petName, 100, 100, 100]);
        return lastID;

    } catch(error){
        throw new Error('Error registering pet: ' + error.message);
    }
}

async function getUserPets(userUID){
    let pets = await db.all('SELECT * FROM pets WHERE user_uid = ?;', [userUID]);
    //console.log(pets);
    return pets ?? null;
}

module.exports = {
    registerPet,
    getUserPets,
}