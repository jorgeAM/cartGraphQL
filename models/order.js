const Sequelize = require('sequelize')
const { sequelize } = require('../db/conn')

const Order = sequelize.define('order', {
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
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