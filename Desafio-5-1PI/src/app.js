const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const exphbs = require('express-handlebars');
const fs = require('fs');
const ProductManager = require('./ProductManager.js');
const CartManager = require('./CartManager.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 8080;

app.use(bodyParser.json());

app.engine('.handlebars', exphbs({ extname: '.handlebars' }));
app.set('view engine', '.handlebars');

const productManager = new ProductManager('products.json');
const cartManager = new CartManager('carritos.json');

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
    
    fs.readFile('products.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo products.json:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }

        let products = JSON.parse(data);
        products.push(newProduct);

        fs.writeFile('products.json', JSON.stringify(products, null, 2), (err) => {
            if (err) {
                console.error('Error al escribir en el archivo products.json:', err);
                return res.status(500).json({ message: 'Error interno del servidor' });
            }
            res.status(201).json(newProduct);
        });
    });
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

app.get('/', (req, res) => {
    const products = productManager.getProducts();
    res.render('home', { products });
});

app.get('/realtimeproducts', (req, res) => {
    const products = productManager.getProducts();
    res.render('realTimeProducts', { products });
});

io.on('connection', (socket) => {
    socket.on('newProduct', (newProduct) => {
        productManager.addProduct(newProduct);
        io.emit('productListUpdate', productManager.getProducts());
    });
});

app.use('/api/products', productsRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});