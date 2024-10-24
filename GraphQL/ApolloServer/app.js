const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { expressMiddleware } = require("@apollo/server/express4");
const { typeDefs } = require("./schema/typeDefs");
const { Query } = require("./resolvers/Query.resolvers");
const { Mutation } = require("./resolvers/Mutation.resolvers");
const { Product } = require("./resolvers/Product.resolvers");
const { Category } = require("./resolvers/Category.resolvers");
const products = require("./data/products.json");
const categories = require("./data/categories.json");

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Mutation,
        Product,
        Category
    }
});

// context should be an async function and return an object.
const context = async ({ req }) => ({
    products,
    categories,
    req
});
// we mostly use it for headers and db models.

// The expressMiddleware function enables you to attach Apollo Server to an Express server.
// Arguments: an Apollo Server instance and optional configuration options like context.
// app.use('/graphql', expressMiddleware(server, { context }));

startStandaloneServer(server, { context }).then(({ url }) => console.log(`Server run on ${url}`));