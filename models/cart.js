const Sequelize = require('sequelize')
const { sequelize } = require('../db/conn')
const User = require('./user')

const Cart = sequelize.define('cart', {
    total: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    tax: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    subTotal: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
})

module.exports = Cart