const express = require('express')
const transactionController = require('../controller/transactionController')

const router = express.Router();

router.route('/')
.get(transactionController.getAllTransaction)
.post(transactionController.createTransaction)

router.route('/:id')
.get(transactionController.getTransaction)


module.exports = router