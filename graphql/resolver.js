const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')
const Order = require('../models/order')

const signUp = async ({ name, email, password }) => {
    try {
        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, 10)
        })
        return {
            token: jwt.sign({ id: user.id }, process.env.JWT_SECRET),
            user
        }
    } catch(err) {
        throw new Error('User already exists')
    }    
}

const login = async ({ email, password }) => {
    const user = await User.findOne({ where : { email }})
    if (!user) throw new Error('User not found')
    const ok = await bcrypt.compare(password, user.password)
    if (!ok)throw new Error('Oops! incorrect password')
    return {
        token: jwt.sign({ id: user.id }, process.env.JWT_SECRET),
        user
    }
}

const createProduct = async({ name, brand, price, image }, req) => {
    if (!req.user) throw new Error('Not authenticated')
    const product = await Product.create({ name, brand, price })
    product.setUser(req.user)
    return product
}

const deleteProduct = async({ id }, req) => {
    if (!req.user) throw new Error('Not authenticated')
    const product = await Product.findOne({ where : { id }})
    if (product.userId != req.user) throw new Error('You cannot delete this product')
    product.destroy()
    return product
}

// Root resolver
const root = {
    signUp,
    login,
    createProduct,
    deleteProduct
}

module.exports = root