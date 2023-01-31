// Import Schema from graphql
const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const queries = require('./queries');

const QueryType = new GraphQLObjectType(
    {
        name: 'QueryType',
        description: 'Queries',
        fields: queries
    }
)


module.exports = new GraphQLSchema({
    query: QueryType
})
