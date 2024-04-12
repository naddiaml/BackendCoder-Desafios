import express from 'express';
import ProductManager from '../services/ProductManager.js';

const router = express.Router();
const productManager = new ProductManager();

router.get('/', (req, res) => {
    const products = productManager.getProducts();
    res.json(products);
});

router.get('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

router.post('/', (req, res) => {
    const newProduct = req.body;
    const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category'];
    const missingFields = requiredFields.filter(field => !newProduct[field]);
    if (missingFields.length > 0) {
        return res.status(400).json({ message: `Faltan campos obligatorios: ${missingFields.join(', ')}` });
    }
    if (!Array.isArray(newProduct.thumbnails) || newProduct.thumbnails.some(thumbnail => typeof thumbnail !== 'string')) {
        return res.status(400).json({ message: 'El campo "thumbnails" debe ser un array de strings' });
    }
    productManager.addProduct(newProduct);
    res.status(201).json(newProduct);
});

router.put('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const updatedProduct = req.body;
    const success = productManager.updateProduct(productId, updatedProduct);
    if (success) {
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

router.delete('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const success = productManager.deleteProduct(productId);
    if (success) {
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

export default router;
