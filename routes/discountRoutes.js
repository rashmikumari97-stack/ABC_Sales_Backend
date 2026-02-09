const express = require('express');
const { getDiscount, createDiscount, updateDiscount,deleteDiscount} = require('../controller/discountController');


const router = express.Router();
router.get('/',getDiscount);
router.post("/",createDiscount)
router.put('/:id',updateDiscount);
router.delete('/:id',deleteDiscount);

module.exports = router;