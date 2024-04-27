import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controller/ProductController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct, protect);
router.delete('/:id', deleteProduct, protect);

export default router;