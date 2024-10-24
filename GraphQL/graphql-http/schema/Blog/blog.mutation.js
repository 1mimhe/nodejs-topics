const { GraphQLString } = require("graphql");
const ResponseType = require("../typeDefs/response.type");
const { createBlog } = require("./blog.resolver");

const CreateBlog = {
    type: ResponseType,
    args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        author: { type: GraphQLString }
    },
    resolve: createBlog
}

module.exports = {
    CreateBlog
}