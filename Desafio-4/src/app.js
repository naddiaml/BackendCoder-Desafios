const express = require('express');
const bodyParser = require('body-parser');
const ProductManager = require('./ProductManager.js');
const CartManager = require('./CartManager.js');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

const productManager = new ProductManager('productos.json');
const cartManager = new CartManager('carritos.json');

// Rutas para productos
const productsRouter = express.Router();

productsRouter.get('/', (req, res) => {
    const products = productManager.getProducts();
    res.json(products);
});

productsRouter.get('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

productsRouter.post('/', (req, res) => {
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

productsRouter.put('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const updatedProduct = req.body;
    const success = productManager.updateProduct(productId, updatedProduct);
    if (success) {
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

productsRouter.delete('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const success = productManager.deleteProduct(productId);
    if (success) {
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

// Rutas para carritos
const cartsRouter = express.Router();

cartsRouter.post('/', (req, res) => {
    const newCart = { id: Date.now().toString(), products: [] };
    cartManager.addCart(newCart);
    res.status(201).json(newCart);
});

cartsRouter.get('/:cid', (req, res) => {
    const cartId = req.params.cid;
    const cart = cartManager.getCartById(cartId);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ message: 'Carrito no encontrado' });
    }
});

cartsRouter.post('/:cid/product/:pid', (req, res) => {
    const cartId = req.params.cid;
    const productId = parseInt(req.params.pid);
    const quantity = parseInt(req.body.quantity);
    const cart = cartManager.addProductToCart(cartId, productId, quantity);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ message: 'Carrito no encontrado' });
    }
});

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
