const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', categoryController.getAllCategories);
router.post('/', auth, upload.single('image'), categoryController.createCategory);
router.put('/:id', auth, upload.single('image'), categoryController.updateCategory);
router.delete('/:id', auth, categoryController.deleteCategory);

// SubCategory
router.get('/sub/all', categoryController.getAllSubCategories);
router.get('/sub/:categoryId', categoryController.getSubCategories);
router.post('/sub', auth, categoryController.createSubCategory);

module.exports = router;
