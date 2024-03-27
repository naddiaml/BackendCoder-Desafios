import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import { Server } from 'socket.io';
import exphbs from 'express-handlebars';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

import ProductManager from './services/ProductManager.js';
import CartManager from './services/CartManager.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 8080;

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb+srv://naddiamlv:RfnvGERH18kS9A6M@e-commerce.a7cqkk3.mongodb.net/?retryWrites=true&w=majority&appName=E-Commerce')
    .then(() => {
        console.log('Conexión exitosa a la base de datos MongoDB');
    })
    .catch((err) => {
        console.error('Error al conectar a la base de datos MongoDB:', err);
        process.exit(1);
    });

app.use(bodyParser.json());

app.engine('.handlebars', exphbs.engine({ extname: '.handlebars' }));
app.set('view engine', '.handlebars');

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

const productManager = new ProductManager();
const cartManager = new CartManager();

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

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});