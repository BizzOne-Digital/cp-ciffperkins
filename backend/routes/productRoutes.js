const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductBySlugOrId,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protectAdmin } = require('../middleware/adminMiddleware');
const { createUploader } = require('../middleware/uploadMiddleware');

const uploadProductImage = createUploader('cliff-perkins/products');

router.get('/', getProducts);
router.get('/:idOrSlug', getProductBySlugOrId);
router.post('/', protectAdmin, uploadProductImage.single('image'), createProduct);
router.put('/:id', protectAdmin, uploadProductImage.single('image'), updateProduct);
router.delete('/:id', protectAdmin, deleteProduct);

module.exports = router;
