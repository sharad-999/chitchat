function auth(req, res, next) {
    if (req.cookies.authToken) {
        console.log(req.cookies.authToken);
        return next()
    }
    return res.redirect('/login')
}

module.exports = auth