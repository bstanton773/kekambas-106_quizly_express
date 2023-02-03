const QuizDashboardRouter = require('express').Router();


QuizDashboardRouter.route('/create')
    .get(require('./editor'))
    .post(require('./create'))


QuizDashboardRouter.route('/results/:id')
    .get(require('./results'))


QuizDashboardRouter.route('/:slug')
    .get(require('./view'))
    .post(require('./submit'))


module.exports = QuizDashboardRouter;
