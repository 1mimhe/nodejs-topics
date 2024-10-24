const { GraphQLList } = require("graphql");
const { getAuthors, getBlogsOfAuthor } = require("./author.resolver");
// const { BlogType } = require("../Blog/blog.type");
const { AuthorType } = require("../Author/author.type");

const authors = {
    type: new GraphQLList(AuthorType),
    resolve: getAuthors
}

// const blogs = {
//     type: new GraphQLList(BlogType),
//     resolve: getBlogsOfAuthor
// }

module.exports = {
    authors
    // blogs
}