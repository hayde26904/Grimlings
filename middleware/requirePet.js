function requirePet(req, res, next) {
    if (!req.session.chosenPet) {
        return res.redirect('/pet/choosepet');
    }
    next();
}

module.exports = requirePet;