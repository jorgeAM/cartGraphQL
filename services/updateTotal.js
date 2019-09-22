const updateTotal = async model => {
    let products = await model.getProducts()
    let total = 0
    products.forEach(product => {
        total += product.price * product.productCart.quantity
    });

    model.total = total
    model.tax = total * 0.18
    model.subTotal = total * 0.82
    model = await model.save()
    return model
}

module.exports = { updateTotal }