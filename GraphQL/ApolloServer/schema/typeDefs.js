// Scalar types => String, Int, Float, Boolean, ID
// * ID is like String, defining it as an ID signifies that it is not intended to be human‐readable.
// ! => can't be null.

const typeDefs = `#graphql
    type Query {
        products(filters: ProductFilters): [Product!]! # inner ! => not-nullable array elements. Outer ! => not-nullable type.
        product(id: ID!): Product
        categories: [Category!]!
        category(id: ID!): Category!
    }

    type Mutation {
        createCategory(input: CreateCategoryInput!): Category!
    }

    type Product {
        id: String
        name: String!
        description: String!
        quantity: Int!
        price: Float!
        image: String!
        onSale: Boolean
        category: Category!
    }

    type Category {
        id: String!
        name: String!
        products(filters: ProductFilters): [Product!]!
    }

    input ProductFilters {
        onSale: Boolean
    }

    input CreateCategoryInput {
        name: String!
    }
`;


module.exports = {
    typeDefs
}