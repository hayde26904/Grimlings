//Let it be known that this code is authored by Hayden Frobenius and Robert Ambartsumyan

const express = require('express');
const app = express();
const path = require('path');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const sql = require('sqlite3').verbose();
const dotenv = require('dotenv');
dotenv.config();

const localsMiddleware = require('./middleware/locals');
const requirePet = require('./middleware/requirePet');

const homeRoutes = require('./routes/homeRoutes');
const userRoutes = require('./routes/userRoutes');
const petRoutes = require('./routes/petRoutes');
const gameRoutes = require('./routes/gameRoutes');

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(localsMiddleware);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', homeRoutes);
app.use('/user', userRoutes);
app.use('/pet', petRoutes);
app.use('/game', gameRoutes);

app.listen(process.env.PORT);