const express = require('express');
const Users = require('../../../Models/Users');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const dataUser = await Users.find({});

        res.status(201).json(dataUser);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/', async (req, res) => {
    const reqData = req.body;
    try {
        const newProductDetail = new Users(reqData);
        const savedProductDetail = await newProductDetail.save();
        res.status(201).json(savedProductDetail);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product detail' });
    }
});

router.delete('/:id', async (req, res) => {
    const idList = req.params.id;
    const idArraySlip = idList.split(',');

    try {
        const deletedData = await Users.deleteMany({ _id: { $in: idArraySlip } });
        if (!deletedData) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
        return res.status(200).json('Xóa thành công');
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi xóa sản phẩm' });
    }
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const reqData = req.body;

    try {
        if (reqData.isVerified) {
            const updatedUserData = {
                fullname: reqData.fullname,
                username: reqData.username,
                email: reqData.email,
                phone: reqData.phone,
                password: reqData.password,
                isVerified: reqData.isVerified,
                role: reqData.role,
            };

            updatedUserData.$unset = {
                verificationToken: '',
                newEmail: '',
                newEmailVerificationToken: '',
            };

            const newData = await Users.findOneAndUpdate({ _id: id }, updatedUserData);

            res.status(201).json(newData);
        } else {
            const newData = await Users.findOneAndUpdate({ _id: id }, reqData, { new: true });
            res.status(201).json(newData);
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
