const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
// const { BlogType } = require("../Blog/blog.type");
 
const AuthorType = new GraphQLObjectType({
    name: "AuthorType",
    fields: {
        _id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        LastName: { type: GraphQLString },
        // blogs: { type: new GraphQLList(BlogType) } => make circular dependency.. so we use buildSchema() or ApolloServer
    }
});

module.exports = {
    AuthorType
}