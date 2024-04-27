import { AppDataSource } from "../data-source";
import { Request, Response, NextFunction } from "express";
import { Product } from "../entity/Product";

const productRepository = AppDataSource.getRepository(Product);

// Get all products
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productRepository.find();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

// Get a single product by ID
export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
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
    } catch (error) {
        next(error);
    }
};

// Create a new product
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, category, price } = req.body;
        let product = productRepository.create({ name, category, price });
        await productRepository.save(product);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

// Update a product by ID
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const update = req.body;
        const productId = req.params.id;
        const product = await productRepository.save({ ...update, id: Number(productId) });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

// Delete a product by ID
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await productRepository.delete(req.params.id);
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        next(error);
    }
};
