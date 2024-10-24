const { default: mongoose } = require("mongoose");
const Blog = require("../../models/blog.model");
require("../../models/author.model");

/*
resolver:
fieldName(parent, args, context, info) {}
- parent: This is the data that came from the previous step. If this is the first step, it's called the rootValue.
    (It is not used in queries)
- args: These are the details you specify in your query, like asking for a user by their ID.
- context: A shared space for all resolvers during a request. It's used for keeping track of things like who's asking for data and where to get it from.
- info: This tells you more about the query itself, helping the resolver understand more about what data to fetch.
*/


async function getBlogs(parent, args, context, info) {
    // args:
    // In query: blogs(field: "test", anotherField: "test2")
    console.log(args); // args: { field: 'test', anotherField: 'test2' }
    // InputObjectType:
    // args: { filters: { _id: '6708e6c77e663881a3bbe6a8', title: 'Blog Post 1' } }

    // headers:
    const { authorization } = context.req.headers;
    console.log(authorization);

    return await Blog.find({});
}

async function getAuthorBlog(parent, args, context, info) {
    const { _id } = parent;
    console.log(_id);
    console.log(await Author.findOne({ _id }));
    return await Author.findOne({ _id });
}

async function createBlog(parent, args, context, info) {
    const { title, description } = args;
    let { author } = args;
    author = new mongoose.Types.ObjectId(author);
    await Blog.create({ title, description, author });
    return {
        message: "Blog created successfully."
    }
}

module.exports = {
    getBlogs,
    getAuthorBlog,
    createBlog
}