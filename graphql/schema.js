const { buildSchema } = require('graphql');

// GraphQL schema
const schema = buildSchema(`
    scalar Upload

    type Query {
        search(term: String, page: Int, limit: Int): [Product]
        myOrders: [Order]
    }

    type Mutation {
        signUp(name: String!, email: String!, password: String!): AuthPayload
        login(email: String!, password: String!): AuthPayload
        createProduct(name: String!, brand: String!, price: Float!): Product
        deleteProduct(id: ID!): Product
        addProductToCart(productId: ID!, quantity: Int!): Cart
        updateProductInCart(productId: ID!, quantity: Int!): Cart
        pullOutProductInCart(productId: ID!): Cart
        createOrder(cartId: ID!): Order
        uploadImageToProduct(productId: ID!, file: Upload!): File!
    }

    type File {
        id: ID
        path: String
        filename: String
        mimetype: String
        encoding: String
    }

    type User {
        id: ID
        name: String
        email: String
        products: [Product]
        orders: [Order]
    }

    type AuthPayload {
        token: String
        user: User
    }

    type Product {
        id: ID
        name: String
        image: String
        brand: String
        price: Float
        createdBy: User
    }

    type Cart {
        id: ID
        total: Float
        tax: Float
        subTotal: Float
        owner: User
        products: [Product]
    }

    type Order {
        id: ID
        code: String
        total: Float
        tax: Float
        subTotal: Float
        customer: User
        products: [Product]
    }
`)

module.exports = schema