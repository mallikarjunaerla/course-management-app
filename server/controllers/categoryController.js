const Category = require('../models/Category');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { name, itemCount } = req.body;
        let imageUrl = req.body.imageUrl || '';

        if (req.files && req.files.length > 0) {
            // Map all files to their URL paths
            const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
            // Store as JSON string to support multiple
            imageUrl = JSON.stringify(imageUrls);
        }

        const category = await Category.create({ name, itemCount, imageUrl });
        res.status(201).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, itemCount } = req.body;

        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.name = name || category.name;
        category.itemCount = itemCount || category.itemCount;

        if (req.files && req.files.length > 0) {
            const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
            category.imageUrl = JSON.stringify(imageUrls);
        } else if (req.body.imageUrl) {
            // Allow updating URL manually if needed
            category.imageUrl = req.body.imageUrl;
        }

        await category.save();
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
