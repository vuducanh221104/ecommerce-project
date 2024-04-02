const express = require('express');
const router = express.Router();
const homeRoutes = require('./home');
const userRoutes = require('./user');
const orderRoutes = require('./order');
const productRoutes = require('./product');
const categoryRoutes = require('./category');
const uploadCloud = require('../../Admin/uploadCloud/uploadCloud');

router.use('/home', homeRoutes);
router.use('/user', userRoutes);
router.use('/order', orderRoutes);
router.use('/product', productRoutes);
router.use('/category', categoryRoutes);
router.use('/upload', uploadCloud);

module.exports = router;
