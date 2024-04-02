const express = require('express');
const router = express.Router();
const Products = require('../../../Models/Products');
const ProductsDetails = require('../../../Models/ProductsDetails');

router.post('/', async (req, res) => {
    try {
        const data = new Products(req.body);
        const newData = await data.save();
        res.status(200).json(newData);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ message: 'Lỗi khi Thêm Sản Phẩm' });
    }
});

router.patch('/:id', async (req, res) => {
    const productId = req.params.id;
    const updatedData = req.body;

    try {
        const product = await Products.findByIdAndUpdate(productId, updatedData, { new: true });

        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi cập nhật sản phẩm', error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const idList = req.params.id;
    const idArray = idList.split(',');

    try {
        const deletedData = await Products.deleteMany({ _id: { $in: idArray } });
        if (!deletedData) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
        return res.status(200)('Xóa thành công');
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi xóa sản phẩm' });
    }
});

router.post('/detail', async (req, res) => {
    try {
        const data = new ProductsDetails(req.body);
        const newData = await data.save();
        res.status(200).json(newData);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ message: 'Lỗi khi Thêm Sản Phẩm' });
    }
});

router.patch('/detail/:id', async (req, res) => {
    const productId = req.params.id;
    const updatedData = req.body;

    try {
        const product = await ProductsDetails.findByIdAndUpdate(productId, updatedData, { new: true });

        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }

        return res.status(200)(product);
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi cập nhật sản phẩm', error: error.message });
    }
});

router.delete('/detail/:slug', async (req, res) => {
    const slugList = req.params.slug;
    const slugArray = slugList.split(',');

    try {
        const deletedData = await ProductsDetails.deleteMany({ slug: { $in: slugArray } });
        if (!deletedData) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
        return res.status(200)('Xóa thành công');
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi xóa sản phẩm' });
    }
});

module.exports = router;
