// Import built-in graphql types
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLInputObjectType, GraphQLList, GraphQLFloat } = require('graphql');
// Import the User Model
const { User, Quiz, Question, Submission } = require('../models');


const UserType = new GraphQLObjectType(
    {
        name: 'User',
        description: 'User Type',
        fields: () => ({
            id: { type: GraphQLID },
            username: { type: GraphQLString },
            email: { type: GraphQLString },
            quizzes: {
                type: new GraphQLList(QuizType),
                resolve(parent, args){
                    return Quiz.find( { userId: parent.id })
                }
            },
            submissions: {
                type: new GraphQLList(SubmissionType),
                resolve(parent, args){
                    return Submission.find( { userId: parent.id })
                }
            }
        })
    }
)


const QuizType = new GraphQLObjectType(
    {
        name: 'Quiz',
        description: 'Quiz Type',
        fields: () => ({
            id: { type: GraphQLID },
            slug: { type: GraphQLString },
            title: { type: GraphQLString },
            description: { type: GraphQLString },
            userId: { type: GraphQLID },
            user: {
                type: UserType,
                resolve(parent, args){
                    return User.findById(parent.userId)
                }
            },
            questions: {
                type: new GraphQLList(QuestionType),
                resolve(parent, args){
                    return Question.find( { quizId: parent.id })
                }
            },
            submissions: {
                type: new GraphQLList(SubmissionType),
                resolve(parent, args){
                    return Submission.find({ quizId: parent.id })
                }
            },
            avgScore: {
                type: GraphQLFloat,
                async resolve(parent, args){
                    const submissions = await Submission.find({ quizId: parent.id })
                    if (!submissions.length){
                        return 0
                    }
                    let score = 0;

                    for (const submission of submissions){
                        score += submission.score
                    }

                    return score / submissions.length;
                }
            }
        })
    }
)

// Create a Question Type (INPUT) for mutation of creating a quiz
const QuestionInputType = new GraphQLInputObjectType(
    {
        name: 'QuestionInput',
        description: 'Question Input Type',
        fields: () => ({
            title: { type: GraphQLString },
            order: { type: GraphQLInt },
            correctAnswer: { type: GraphQLString }
        })
    }
)


// Create a Question Type for queries
const QuestionType = new GraphQLObjectType(
    {
        name: 'Question',
        description: 'Question Type',
        fields: () => ({
            id: { type: GraphQLID },
            title: { type: GraphQLString },
            correctAnswer: { type: GraphQLString },
            order: { type: GraphQLInt },
            quizId: { type: GraphQLID },
            quiz: {
                type: QuizType,
                resolve(parent, args){
                    return Quiz.findById(parent.quizId)
                }
            }
        })
    }
)


// Create an Answer Input Type for submitting a quiz
const AnswerInputType = new GraphQLInputObjectType(
    {
        name: 'AnswerInput',
        description: 'Answer Input Type',
        fields: () => ({
            questionId: { type: GraphQLID },
            answer: { type: GraphQLString }
        })
    }
);


const SubmissionType = new GraphQLObjectType(
    {
        name: 'Submission',
        description: 'Submission Type',
        fields: () => ({
            id: { type: GraphQLID },
            quizId: { type: GraphQLID },
            userId: { type: GraphQLID },
            score: { type: GraphQLInt },
            user: {
                type: UserType,
                resolve(parent, args){
                    return User.findById(parent.userId)
                }
            },
            quiz: {
                type: QuizType,
                resolve(parent, args){
                    return Quiz.findById(parent.quizId)
                }
            }
        })
    }
)


module.exports = {
    UserType,
    QuizType,
    QuestionInputType,
    AnswerInputType,
}
