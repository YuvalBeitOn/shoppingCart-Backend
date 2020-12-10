const express = require('express')
    // const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const { getProduct, getProducts, deleteProduct, updateProduct } = require('./product.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getProducts)
router.get('/:id', getProduct)
router.post('/', updateProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router