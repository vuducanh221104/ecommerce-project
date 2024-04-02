const express = require('express');
const router = express.Router();
const ImageTheme = require('../../../Models/ImageTheme');

router.patch('/', async (req, res) => {
    try {
        const update = await ImageTheme.findOneAndUpdate({ _id: '6590ea07208b25f98a1f971f' }, req.body);
        res.status(200).json(update);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
