const path = require('path');
const sql = require('sqlite3').verbose();
const db = require('../util/dbAsyncWrapper');

const dbInstance = new sql.Database(process.env.DB_PATH);

async function registerUser(fbID, fbName){
    let lastID = await db.run(dbInstance, 'INSERT INTO users (fb_id, fb_name) VALUES(?,?);', [fbID, fbName]);
    return lastID;
}

async function getUserByUID(uid){
    let user = await db.get(dbInstance, 'SELECT * FROM users WHERE uid = ?;', [uid]);
    return user ?? null;
}

async function getUserByFormbarID(fbID){
    let user = await db.get(dbInstance, 'SELECT * FROM users WHERE fb_id = ?;', [fbID]);
    return user ?? null;
}

module.exports = {
    registerUser,
    getUserByUID,
    getUserByFormbarID
}