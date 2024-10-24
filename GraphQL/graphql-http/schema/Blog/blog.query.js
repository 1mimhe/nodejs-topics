const { BlogType, BlogInputType } = require("./blog.type");
const { getBlogs } = require("./blog.resolver");
const { GraphQLList } = require("graphql");

const blogs = {
    type: new GraphQLList(BlogType),
    // args definition:
    args: {
        // field: { type: GraphQLString },
        // anotherField: { type: GraphQLString }
        filters: { type: BlogInputType }
    },
    resolve: getBlogs
}

module.exports = {
    blogs
};