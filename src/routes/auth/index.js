const MainAuthRouter = require('express').Router();

MainAuthRouter.route('/register')
    .get(require('./register.view'))
    .post(require('./register'))

MainAuthRouter.route('/login')
    .get(require('./login.view'))
    .post(require('./login'))

module.exports = MainAuthRouter
