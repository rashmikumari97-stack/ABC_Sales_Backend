const express = require('express');
const { getTaxation, createTaxation, updateTaxation,deleteTaxation} = require('../controller/taxationController');


const router = express.Router();
router.get('/',getTaxation);
router.post("/",createTaxation)
router.put('/:id',updateTaxation);
router.delete('/:id',deleteTaxation);

module.exports = router;