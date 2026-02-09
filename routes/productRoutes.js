const express = require('express');
const { getProduct, createProduct, updateProduct,deleteProduct} = require('../controller/productController');


const router = express.Router();
router.get('/',getProduct);
router.post("/",createProduct)
router.put('/:id',updateProduct);
router.delete('/:id',deleteProduct);

module.exports = router;