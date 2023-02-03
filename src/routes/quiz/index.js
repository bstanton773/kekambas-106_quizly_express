const QuizDashboardRouter = require('express').Router();


QuizDashboardRouter.route('/create')
    .get(require('./editor'));


module.exports = QuizDashboardRouter;
