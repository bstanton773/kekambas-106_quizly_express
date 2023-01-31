// Import Schema from graphql
const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const queries = require('./queries');
const mutations = require('./mutations');

const QueryType = new GraphQLObjectType(
    {
        name: 'QueryType',
        description: 'Queries',
        fields: queries
    }
)

const MutationType = new GraphQLObjectType(
    {
        name: 'MutationType',
        description: 'Mutations',
        fields: mutations
    }
)


module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
})
