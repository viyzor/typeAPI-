"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware_1 = require("../middleware/authMiddleware");
const express_1 = __importDefault(require("express"));
const ProductController_1 = require("../controller/ProductController");
// Create a router object
const router = express_1.default.Router();
// Define routes and attach controller methods
router.get('/products', ProductController_1.ProductController.getProducts); // Get all products
router.get('/products/:id', ProductController_1.ProductController.getProductById); // Get a product by ID
router.post('/products', ProductController_1.ProductController.createProduct, authMiddleware_1.protect); // Create a new product
router.put('/products/:id', ProductController_1.ProductController.updateProduct, authMiddleware_1.protect); // Update a product by ID
router.delete('/products/:id', ProductController_1.ProductController.deleteProduct, authMiddleware_1.protect); // Delete a product by ID
// Export the router
exports.default = router;
