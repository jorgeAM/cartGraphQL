const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')
const Order = require('../models/order')
const bcrypt = require('bcrypt');

const signUp = async (_, { name, email, password }, ctx) => {
    console.log(email)
    const user = await User.create({
        name,
        email,
        password
    })

    return {
        token: 'esto deberia ser un token',
        user
    }
}

// Root resolver
const root = {
    message: () => 'claro p +cota',
    signUp,
}

module.exports = root