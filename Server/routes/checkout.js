const express = require('express');
const CheckoutController = require('../Controllers/CheckoutController');
const router = express.Router();

router.post('/create-payment-vnpay', CheckoutController.vnPay);
router.post('/create-payment-momo', CheckoutController.moMo);
router.post('/create-payment-zalopay', CheckoutController.zaloPay);
router.post('/save', CheckoutController.savePayment);

module.exports = router;
