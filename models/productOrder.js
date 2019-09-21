const Sequelize = require('sequelize')
const { sequelize } = require('../db/conn')
const Product = require('./product')
const Order = require('./order')

const ProductOrder = sequelize.define('productOrder', {
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
    orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Order,
            key: 'id'
        }
    }
})

module.exports = ProductOrder