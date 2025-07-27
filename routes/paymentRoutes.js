const express = require('express');
const router = express.Router();
const { makePayment, getPaymentHistory } = require('../controllers/paymentController');

router.post('/payments', makePayment);
router.get('/payments/:account_number', getPaymentHistory);

module.exports = router;
