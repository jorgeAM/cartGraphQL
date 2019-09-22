const Order = require('../models/order')


const zFill = (code, max = 4) => {
    let number = parseInt(code.replace('P', ''))
    let newCode = (number + 1).toString().padStart(max, '0')
    return `P${newCode}`
}


const generateOrderCode = async () => {
    const order = await Order.findOne({
        order: [['createdAt', 'DESC']],
    })

    return order ? zFill(order.code) : 'P0001'
}

module.exports = { generateOrderCode }