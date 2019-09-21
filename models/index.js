const User = require('./user')
const Product = require('./product')
const Cart = require('./cart')
const Order = require('./order')
const { sequelize } = require('../db/conn')

module.exports = () => {
    User.hasMany(Product)
    User.hasMany(Order)
    User.hasMany(Cart)
    Product.belongsTo(User)
    Order.belongsTo(User)
    Cart.belongsTo(User)
    Cart.belongsToMany(Product, { through: 'CartProduct' })
    Order.belongsToMany(Product, { through: 'OrderProduct' })

    //sequelize.sync()
}
