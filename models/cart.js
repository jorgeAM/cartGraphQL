const Sequelize = require('sequelize')
const { sequelize } = require('../db/conn')

const Cart = sequelize.define('cart', {
    total: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    tax: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    subTotal: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    state: {
        type: Sequelize.ENUM,
        values: ['pending', 'paid'],
        defaultValue: 'pending'
    }
})


module.exports = Cart