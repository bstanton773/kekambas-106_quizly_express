const MainAuthRouter = require('express').Router();

MainAuthRouter.route('/register')
    .get((req, res) => {
        res.render('register')
    })
    .post((req, res) => {
        res.send('Post Auth Router Register')
    })

MainAuthRouter.route('/login')
    .get((req, res) => {
        res.render('login')
    })
    .post((req, res) => {
        res.send('Post Auth Router Login')
    })

module.exports = MainAuthRouter
