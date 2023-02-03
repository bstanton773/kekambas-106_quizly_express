const QuizDashboardRouter = require('express').Router();


QuizDashboardRouter.route('/create')
    .get(require('./editor'))
    .post(require('./create'))


module.exports = QuizDashboardRouter;
