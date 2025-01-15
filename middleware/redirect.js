const urlHelper = require('../util/urlHelper');

function redirectWhenDone(req, res){
    const redirectURL = req.session.redirectURL;
    console.log(redirectURL);
    
    if(!redirectURL){
        res.redirect('/');
        return;
    }

    req.session.redirectURL = null;
    res.redirect(redirectURL);
}

module.exports = redirectWhenDone