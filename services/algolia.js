const algoliasearch = require('algoliasearch')

const client = algoliasearch(process.env.ALGOLIA_ID, process.env.ALGOLIA_KEY)
const index = client.initIndex('Productos')

const pushProduct = async product => {
    await index.addObject(product)
}

const popProduct = async productId => {
    await index.deleteObject(productId)
}

const retrieveProduct = async productId => {
    await index.getObject('231136311')
}

const modifyProduct = async product => {
    await index.partialUpdateObject(product, true)
}

const searchProducts = async search => {
    return await index.search(search)        
}

module.exports = {
    pushProduct,
    popProduct,
    retrieveProduct,
    modifyProduct,
    searchProducts
}
