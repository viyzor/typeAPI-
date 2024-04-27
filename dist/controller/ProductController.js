"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const data_source_1 = require("../data-source");
const Product_1 = require("../entity/Product");
const productRepository = data_source_1.AppDataSource.getRepository(Product_1.Product);
class ProductController {
}
exports.ProductController = ProductController;
_a = ProductController;
// Получить все товары
ProductController.getProducts = async (req, res, next) => {
    try {
        const products = await productRepository.find();
        res.status(200).json(products);
    }
    catch (error) {
        next(error);
    }
};
// Получить один товар по ID
ProductController.getProductById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const product = await productRepository.findOneBy({ id: id });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    }
    catch (error) {
        next(error);
    }
};
// Создать новый товар
ProductController.createProduct = async (req, res, next) => {
    try {
        const { name, category, price } = req.body;
        let product = productRepository.create({ name, category, price });
        await productRepository.save(product);
        res.status(201).json(product);
    }
    catch (error) {
        next(error);
    }
};
// Обновить товар по ID
ProductController.updateProduct = async (req, res, next) => {
    try {
        const update = req.body;
        const productId = req.params.id;
        const product = await productRepository.save({ ...update, id: Number(productId) });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    }
    catch (error) {
        next(error);
    }
};
// Удалить товар по ID
ProductController.deleteProduct = async (req, res, next) => {
    try {
        const result = await productRepository.delete(req.params.id);
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ message: 'Product deleted' });
    }
    catch (error) {
        next(error);
    }
};
