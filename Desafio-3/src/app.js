const fs = require('fs');
const express = require('express');
const app = express();
const port = 8080;

const ProductManager = require('./ProductManager.js');

const productsFilePath = './products.json';
const productManager = new ProductManager(productsFilePath);

app.get('/products', async (req, res) => {
    try {
        let products = productManager.getProducts();
        const limit = req.query.limit;
        if (limit) {
            products = products.slice(0, limit);
        }
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = productManager.getProductById(productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
});

app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});