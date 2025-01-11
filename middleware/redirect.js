const urlHelper = require('../util/urlHelper');

function redirectWhenDone(req, res){
    const redirectURL = req.query.redirect;

    if(!redirectURL || !urlHelper.isValidURL(redirectURL)){
        res.redirect('/');
        return;
    }

    res.redirect(redirectURL);
}

module.exports = redirectWhenDone