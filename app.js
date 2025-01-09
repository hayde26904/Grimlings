const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const session = require('express-session');
const sql = require('sqlite3').verbose();
const dotenv = require('dotenv');
dotenv.config();

let db = new sql.Database(process.env.DB_PATH);

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: 'guh',
    resave: false,
    saveUninitialized: false
}));

function isAuthenticated(req, res, next) {
    if (req.session.user) next()
    else res.redirect('/login')
};

app.listen(process.env.PORT);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    console.log(req.query.token);
    if (req.query.token) {
        let tokenData = jwt.decode(req.query.token);
        req.session.token = tokenData;
        req.session.user = tokenData.username;

        db.get("SELECT * FROM users WHERE fb_id = ?", [tokenData.id], (err, row) => {
            if (err){ console.log(err); res.render('error'); return; }
            if(!row){
                db.run("INSERT INTO users (fb_id, fb_name, profile_checked) VALUES(?,?,?)", [tokenData.id, tokenData.username, 0], (err) => {
                    if(err) res.render('error');
                    res.redirect('/');
                });
            } else {
                res.redirect('/');
            }
        });

   } else {
        res.redirect(`${process.env.FB_AUTH_URL}?redirectURL=${process.env.HOST + ':' + process.env.PORT}/login`);
   };
});