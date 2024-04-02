const productRoutes = require('./products');
const userRoutes = require('./users');
const commentRoutes = require('./comment');
const paymentRoutes = require('./checkout');
const categoryRoutes = require('./category');
const homeRoutes = require('./home');
const newsRoutes = require('./news');
const adminRoutes = require('./Admin/routes/index');

function routes(app) {
    app.use('/api/home', homeRoutes);
    app.use('/api/product', productRoutes);
    app.use('/api/category', categoryRoutes);
    app.use('/api/user', userRoutes);
    app.use('/api/comment', commentRoutes);
    app.use('/api/news', newsRoutes);
    app.use('/api/payment', paymentRoutes);
    // Routes admin
    app.use('/api/admin', adminRoutes);
}

module.exports = routes;
