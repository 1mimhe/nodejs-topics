const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLInputObjectType } = require("graphql");
const { AuthorType } = require("../Author/author.type");

/*
GraphQL Types (https://graphql.org/graphql-js/type):
- GraphQLInt
- GraphQLFloat
- GraphQLString
- GraphQLBoolean
- GraphQLObjectType
- GraphQLList
- GraphQLNonNull => !
- GraphQLInputObjectType => input
- ,...
*/

const BlogType = new GraphQLObjectType({
    name: "BlogType",
    fields: {
        _id: { type: new GraphQLNonNull(GraphQLString)},
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        author : { type: new GraphQLNonNull(AuthorType) },
        tags: { type: new GraphQLList(GraphQLString) }
    }
});

const BlogInputType = new GraphQLInputObjectType({
    name: "BlogInputType",
    fields: {
        _id: { type: new GraphQLNonNull(GraphQLString)},
        title: { type: new GraphQLNonNull(GraphQLString) }
    }
});

module.exports = {
    BlogType,
    BlogInputType
};