const Sequelize = require('sequelize')
const { sequelize } = require('../db/conn')
const User = require('./user')

const Product = sequelize.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 35]
            }
        }
    },
    brand: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING
    }
})

module.exports = Product