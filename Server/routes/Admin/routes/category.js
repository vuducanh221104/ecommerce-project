const express = require('express');
const router = express.Router();
const CategoryImage = require('../../../Models/ImageCategory');
const CategoryBox = require('../../../Models/ImageCategoryBox');

// Category box product
router.get('/box-product/:slug', async (req, res) => {
    const slugParam = req.params.slug;
    try {
        const data = await CategoryBox.findOne({ category_slug: slugParam });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/box-product', async (req, res) => {
    const data = req.body;
    try {
        const newData = new CategoryBox(data);
        const saveData = await newData.save();
        res.status(200).json(saveData);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.patch('/box-product/:slug', async (req, res) => {
    const slugParam = req.params.slug;
    const data = req.body;
    try {
        const newData = await CategoryBox.findOneAndUpdate({ category_slug: slugParam }, data);
        res.status(200).json(newData);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/box-product/:slug', async (req, res) => {
    const slugParam = req.params.slug;
    try {
        const deletedData = await CategoryBox.findOneAndDelete({ category_slug: slugParam });

        if (!deletedData) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(201).json({ message: 'Delete Successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// CATEGORY Image

router.post('/image', async (req, res) => {
    const data = req.body;
    try {
        const newData = new CategoryImage(data);
        const saveData = await newData.save();
        res.status(200).json(saveData);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.patch('/image/:slug', async (req, res) => {
    const data = req.body;
    const slugParam = req.params.slug;
    try {
        const newData = await CategoryImage.findOneAndUpdate({ slug: slugParam }, data);
        res.status(200).json(newData);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/image/:slug', async (req, res) => {
    const slugParam = req.params.slug;
    try {
        const deletedData = await CategoryImage.findOneAndDelete({ slug: slugParam });

        if (!deletedData) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Delete Successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
module.exports = router;
