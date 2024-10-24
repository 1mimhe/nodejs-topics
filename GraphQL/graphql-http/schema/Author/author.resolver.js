const Blog = require("../../models/blog.model");
const Author = require("../../models/author.model");

async function getAuthors(parent, args, context, info) {
    return await Author.find({});
}

async function getBlogsOfAuthor(parent, args, context, info) {
    const { _id } = parent;
    return await Blog.find({ author: _id });
}

module.exports = {
    getAuthors,
    getBlogsOfAuthor
}