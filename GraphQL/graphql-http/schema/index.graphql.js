const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { blogs } = require("./Blog/blog.query");
const { CreateBlog } = require("./Blog/blog.mutation");
const { authors } = require("./Author/author.query");

const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        blogs,
        authors
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        CreateBlog
    }
});

const graphQLSchema = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
  
module.exports = graphQLSchema;