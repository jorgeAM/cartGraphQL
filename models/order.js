const Sequelize = require('sequelize')
const { sequelize } = require('../db/conn')
const User = require('./user')

const Order = sequelize.define('order', {
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

module.exports = Order