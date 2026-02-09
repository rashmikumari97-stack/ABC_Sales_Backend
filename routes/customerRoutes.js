const express = require('express');
const { getCustomer, createCustomer, updateCustomer,deleteCustomer } = require('../controller/customerController');


const router = express.Router();
router.get('/',getCustomer);
router.post("/",createCustomer)
router.put('/:id',updateCustomer);
router.delete('/:id',deleteCustomer);

module.exports = router;