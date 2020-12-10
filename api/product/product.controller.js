const productService = require('./product.service')
// const logger = require('../../services/logger.service')

async function getProduct(req, res) {
    const product = await productService.getById(req.params.id)
    res.send(product)
}

async function getProducts(req, res) {
    const products = await productService.query(req.query)
    res.send(products)
}

async function deleteProduct(req, res) {
    await productService.remove(req.params.id)
    res.end()
}

async function updateProduct(req, res) {
    const product = req.body;
    await productService.save(product)
    res.send(product)
}

module.exports = {
    getProduct,
    getProducts,
    deleteProduct,
    updateProduct
}