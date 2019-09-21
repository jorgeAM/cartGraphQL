const Sequelize = require('sequelize')
const { sequelize } = require('../db/conn')

const User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            min: 6,
        }
    }
})

module.exports = User