const algoliasearch = require('algoliasearch')

const client = algoliasearch(process.env.ALGOLIA_ID, process.env.ALGOLIA_KEY)
const index = client.initIndex('Productos')

const pushProduct = async product => {
    await index.addObject({
        objectID: product.id,
        id: product.id,
        name: product.name,
        price: product.price,
        brand: product.brand,
        userId: product.userId
    })
}

const popProduct = async productId => {
    await index.deleteObject(productId)
}

const modifyProduct = async product => {
    await index.partialUpdateObject({
        objectID: product.id,
        id: product.id,
        name: product.name,
        price: product.price,
        brand: product.brand,
        userId: product.userId,
        image: product.image
    }, true)
}

const searchProducts = async search => {
    return await index.search(search)        
}

module.exports = {
    pushProduct,
    popProduct,
    modifyProduct,
    searchProducts
}
