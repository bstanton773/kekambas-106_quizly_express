// Import Types from graphql
const { GraphQLList, GraphQLID, GraphQLString } = require('graphql');
// Import our own created type(s)
const { UserType, QuizType } = require('./types');
// Import model so we can get data from MongoDB
const { User, Quiz } = require('../models');


const users = {
    type: new GraphQLList(UserType),
    description: 'Get all users from the database',
    resolve(parent, args){
        return User.find()
    }
}


const user = {
    type: UserType,
    description: 'Query single user from database by ID',
    args: {
        id: { type: GraphQLID }
    },
    resolve(parent, args){
        return User.findById(args.id)
    }
}


const quizBySlug = {
    type: QuizType,
    description: 'Query quiz by its unique slug',
    args: {
        slug: { type: GraphQLString }
    },
    resolve(parent, args){
        return Quiz.findOne({ slug: args.slug })
    }
}


module.exports = {
    users,
    user,
    quizBySlug,
}
