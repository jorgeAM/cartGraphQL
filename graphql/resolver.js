const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')
const Order = require('../models/order')
const { updateTotal } = require('../services/updateTotal')
const { sendMail } = require('../services/sendMail')
const { generateOrderCode } = require('../services/generateOrderCode')
const { uploadFile } = require('../services/uploadToCloudinary')

const myOrders = async ({}, req) => {
    if (!req.user) throw new Error('Not authenticated')
    const user = await User.findByPk(req.user)
    return await user.getOrders()
}

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

const createProduct = async ({ name, brand, price }, req) => {
    if (!req.user) throw new Error('Not authenticated')
    const product = await Product.create({ name, brand, price })
    product.setUser(req.user)
    return product
}

const deleteProduct = async ({ id }, req) => {
    if (!req.user) throw new Error('Not authenticated')
    const product = await Product.findOne({ where : { id }})
    if (product.userId != req.user) throw new Error('You cannot delete this product')
    product.destroy()
    return product
}

const addProductToCart = async ({ productId, quantity }, req) => {
    if (!req.user) throw new Error('Not authenticated')
    const product = await Product.findOne({ where : { id: productId }})
    if (product.userId != req.user) throw new Error('You cannot add this product to your shopping cart')
    const [cart, _] = await Cart.findOrCreate({ where: { state: 'pending', userId: req.user}})
    await cart.addProduct(product, { through: { quantity }})
    return updateTotal(cart)
}

const updateProductInCart = async ({ productId, quantity }, req) => {
    if (!req.user) throw new Error('Not authenticated')
    const product = await Product.findOne({ where : { id: productId }})
    const cart = await Cart.findOne({ where: { state: 'pending', userId: req.user}})
    await cart.addProduct(product, { through: { quantity }})
    return updateTotal(cart)
}

const pullOutProductInCart = async ({ productId }, req) => {
    if (!req.user) throw new Error('Not authenticated')
    const product = await Product.findOne({ where : { id: productId }})
    const cart = await Cart.findOne({ where: { state: 'pending', userId: req.user}})
    cart.removeProducts(product)
    return updateTotal(cart)
}

const createOrder = async ({ cartId }, req) => {
    if (!req.user) throw new Error('Not authenticated')
    const cart = await Cart.findByPk(cartId)
    const order = await Order.create({
        code: await generateOrderCode(),
        total: cart.total,
        tax: cart.tax,
        subTotal: cart.subTotal,
        userId: req.user
    })
    let products = await cart.getProducts()
    products.forEach(async product => {
        await order.addProduct(product, { through: { quantity: product.productCart.quantity }})        
    });
    sendMail(order)
    return order
}

const uploadImageToProduct = async ({ productId, file }) => {
    const { filename, mimetype, encoding, createReadStream } = await file
    const stream = createReadStream()
    console.log(stream)
    uploadFile(filename)
    return { filename, mimetype, encoding }
}

// Root resolver
const root = {
    myOrders,
    signUp,
    login,
    createProduct,
    deleteProduct,
    addProductToCart,
    updateProductInCart,
    pullOutProductInCart,
    createOrder,
    uploadImageToProduct
}

module.exports = root