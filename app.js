const express = require('express');
const app = express();
const path = require('path');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const sql = require('sqlite3').verbose();
const dotenv = require('dotenv');
dotenv.config();

const localsMiddleware = require('./middleware/locals');

const homeRoutes = require('./routes/homeRoutes');
const userRoutes = require('./routes/userRoutes');

//const isLoggedIn = require('./middleware/auth');

const { AUTH } = require('sqlite3');

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.use(localsMiddleware)

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', homeRoutes);
app.use('/user', userRoutes);
app.use('/menu', /*isLoggedIn,*/ homeRoutes);
app.use('/newGame', /*isLoggedIn,*/ homeRoutes);

app.listen(process.env.PORT);