const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    try {
        const productData = JSON.parse(req.body.productData);
        const images = req.files ? req.files.map(file => file.path) : [];

        const slug = productData.name.toLowerCase().replace(/ /g, '-') + '-' + Date.now();

        const product = new Product({
            ...productData,
            slug,
            images
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category').populate('subCategory');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductBySlug = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug }).populate('category').populate('subCategory');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const productData = JSON.parse(req.body.productData);
        const existingProduct = await Product.findById(req.params.id);

        let images = existingProduct.images;
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(file => file.path);
            images = [...images, ...newImages];
        }

        // Logic to handle removed images if passed in productData
        if (productData.removedImages) {
            images = images.filter(img => !productData.removedImages.includes(img));
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { ...productData, images },
            { new: true }
        );

        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
