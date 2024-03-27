import express from 'express';
import CartManager from '../services/CartManager.js';

const router = express.Router();
const cartManager = new CartManager();

router.post('/', (req, res) => {
    const newCart = cartManager.createCart();
    res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
    const cartId = req.params.cid;
    const cart = cartManager.getCartById(cartId);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ message: 'Carrito no encontrado' });
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    const cartId = req.params.cid;
    const productId = parseInt(req.params.pid);
    const quantity = parseInt(req.body.quantity);
    const cart = cartManager.addProduct(cartId, productId, quantity);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ message: 'Carrito no encontrado' });
    }
});

export default router;
