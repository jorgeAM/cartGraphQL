const User = require('./user')
const Product = require('./product')
const Cart = require('./cart')
const Order = require('./order')
const ProductOrder = require('./productOrder')
const ProductCart = require('./productCart')
const { sequelize } = require('../db/conn')

module.exports = () => {
    User.hasMany(Product)
    User.hasMany(Order)
    User.hasMany(Cart)
    Product.belongsTo(User)
    Order.belongsTo(User)
    Cart.belongsTo(User)
    Product.belongsToMany(Cart, {
        through: ProductCart,
        as: 'carts',
        foreignKey: 'productId',
        otherKey: 'cartId'
    })
    Cart.belongsToMany(Product, {
        through: ProductCart,
        as: 'products',
        foreignKey: 'cartId',
        otherKey: 'productId'
    })
    Product.belongsToMany(Order, {
        through: ProductOrder,
        as: 'orders',
        foreignKey: 'productId',
        otherKey: 'orderId'
    })
    Order.belongsToMany(Product, {
        through: ProductOrder,
        as: 'products',
        foreignKey: 'orderId',
        otherKey: 'productId'
    })

    //sequelize.sync()
}
