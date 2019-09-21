const Sequelize = require('sequelize')
const { sequelize } = require('../db/conn')
const Product = require('./product')
const Cart = require('./cart')

const ProductCart = sequelize.define('productCart', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
    cartId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Cart,
            key: 'id'
        }
    }
})

module.exports = ProductCart