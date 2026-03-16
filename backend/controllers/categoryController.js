const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const slug = name.toLowerCase().replace(/ /g, '-');
        const image = req.file ? req.file.path : '';

        const category = new Category({ name, slug, description, image });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const updateData = { name, description };
        if (name) updateData.slug = name.toLowerCase().replace(/ /g, '-');
        if (req.file) updateData.image = req.file.path;

        const category = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        await SubCategory.deleteMany({ category: req.params.id });
        res.json({ message: 'Category and its subcategories deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// SubCategory Methods
exports.createSubCategory = async (req, res) => {
    try {
        const { name, category, description } = req.body;
        const slug = name.toLowerCase().replace(/ /g, '-');
        const subCategory = new SubCategory({ name, slug, category, description });
        await subCategory.save();
        res.status(201).json(subCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find({ category: req.params.categoryId }).populate('category');
        res.json(subCategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find().populate('category');
        res.json(subCategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
