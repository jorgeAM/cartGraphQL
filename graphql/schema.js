const { buildSchema } = require('graphql');

// GraphQL schema
const schema = buildSchema(`
    type Query {
        search(term: String, page: Int, limit: Int): [Product]
    }

    type Mutation {
        signUp(name: String!, email: String!, password: String!): AuthPayload
        login(email: String!, password: String!): AuthPayload
        createProduct(name: String!, brand: String!, price: Float!, image: String): Product
        updateProduct(id: ID!, name: String, brand: String, price: Float, image: String): Product
        deleteProduct(id: ID!): Product
        addProductToCart(ProductId: ID!, quantity: Int!): Cart
        updateProductInCart(ProductId: ID!, quantity: Int!): Cart
        pullOutProductInCart(productId: ID): Cart
        createOrder(cartId: ID!): Order
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