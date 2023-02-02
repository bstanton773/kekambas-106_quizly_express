const MainDashboardRouter = require('express').Router();


MainDashboardRouter.route('/')
    .get(require('./dashboard.view'))


module.exports = MainDashboardRouter
