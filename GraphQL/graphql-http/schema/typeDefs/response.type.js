const { GraphQLObjectType, GraphQLString } = require("graphql");

const ResponseType = new GraphQLObjectType({
    name: "ResponseType",
    fields: {
        message: { type: GraphQLString }
    }
});

module.exports = ResponseType;