const express = require('express');
const router = express.Router();
const orderModel = require('../../../Models/Payment');

router.get('/', async (req, res) => {
    try {
        const dataOrder = await orderModel.find({});

        res.status(201).json(dataOrder);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/:id', async (req, res) => {
    const idList = req.params.id;
    const idArraySlip = idList.split(',');
    try {
        const deletedData = await orderModel.deleteMany({ _id: { $in: idArraySlip } });
        if (!deletedData) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
        return res.status(200).json('Xóa thành công');
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi xóa sản phẩm' });
    }
});

module.exports = router;
