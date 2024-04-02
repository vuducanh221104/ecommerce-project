const express = require('express');
const router = express.Router();
const homeSchema = require('../Models/ImageTheme');

router.get('/', async (req, res) => {
    try {
        const find = await homeSchema.findOne({});
        res.status(200).json(find);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
