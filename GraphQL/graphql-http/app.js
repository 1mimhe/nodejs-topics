const express = require('express');
const { createHandler } = require("graphql-http/lib/use/express")
const expressPlayground = require('graphql-playground-middleware-express').default;
// const { graphqlHTTP } = require('express-graphql');
const graphQLSchema = require("./schema/index.graphql");
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/graphql-db").then(() => console.log("Connected to DB."));

const context = async (req) => ({
    req
});

app.all("/graphql", createHandler({ schema: graphQLSchema, context }));
// handler options (https://github.com/graphql/graphql-http/blob/a1cc086987990940ad687238f5b736b9870d7925/docs/modules/handler.md): 
// context: A value which is provided to every resolver and holds important contextual information
//  like the currently logged in user.

app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

// deprecated package.
// app.use('/graphql', graphqlHTTP({
//         schema: graphQLSchema,
//         graphiql: true,
//     }),
// );

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));