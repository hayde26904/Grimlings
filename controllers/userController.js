const jwt = require('jsonwebtoken');
const urlHelper = require('../util/urlHelper.js');

const userService = require('../services/userService.js');

async function login(req, res, next) {
    
    if (!req.query.token) {
        const path = req.get('Referer');
        const host = req.get('Host');
        const protocol = req.protocol;
        //reinstate when formbar fixes
        //const redirectURL = `${protocol}://${host}/user/login?redirect=${path}`;
        const redirectURL = `${protocol}://${host}/user/login`

        return res.redirect(urlHelper.addQueryParams(process.env.FB_AUTH_URL, {redirectURL}));
    }

    const tokenData = jwt.decode(req.query.token);
    req.session.token = tokenData;

    try {
        const existingUser = await userService.getUserByFormbarID(tokenData.id);

        if(existingUser) {
            req.session.user = existingUser;
            return next();
        }

        const uid = await userService.registerUser(tokenData.id, tokenData.username);
        const newUser = await userService.getUserByUID(uid);
        req.session.user = newUser;

        return next();

    } catch (error) {

        res.render('pages/error', {errorMessage: error});
    
    }

}

module.exports = {
    login
}