const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', productController.getAllProducts);
router.get('/:slug', productController.getProductBySlug);
router.get('/id/:id', async (req, res) => {
    try {
        const product = await require('../models/Product').findById(req.params.id).populate('category').populate('subCategory');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post('/', auth, upload.array('images', 10), productController.createProduct);
router.put('/:id', auth, upload.array('images', 10), productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;
