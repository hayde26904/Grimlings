function requirePet(req, res, next) {
    if (!req.session.chosenPet) {
        req.session.redirectURL = req.get('Referer');
        return res.redirect('/pet/choosepet');
    }
    next();
}

module.exports = requirePet;