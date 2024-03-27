// CartManager.js
import Cart from '../dao/models/Cart.js';

export default class CartManager {

    constructor(){
        console.log("Trabajando con cartManager")
    }

    async getCartById(id) {
        try {
            const cart = await Cart.findById(id);
            return cart;
        } catch (error) {
            throw new Error(`Error en el servicio de obtener carrito por ID: ${error.message}`);
        }
    }

    async createCart() {
        try {
            const cart = await Cart.create({});
            return cart;
        } catch (error) {
            throw new Error(`Error en el servicio de crear carrito: ${error.message}`);
        }
    }

    async addProduct(cid, pid, quantity) {
        try {
            const cart = await Cart.findById(cid);
            const productIndex = cart.products.findIndex(product => product.product.toString() === pid);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ product: pid, quantity });
            }
            return await cart.save();
        } catch (error) {
            throw new Error(`Error en el servicio de agregar producto al carrito: ${error.message}`);
        }
    }

    async deleteProduct(cid, pid) {
        try {
            const cart = await Cart.findById(cid);
            const productIndex = cart.products.findIndex(product => product.product.toString() === pid);
            if (productIndex !== -1) {
                cart.products.splice(productIndex, 1);
                return await cart.save();
            } else {
                console.log("Producto no encontrado en el carrito");
                return cart;
            }
        } catch (error) {
            throw new Error(`Error en el servicio de eliminar producto del carrito: ${error.message}`);
        }
    }
}
