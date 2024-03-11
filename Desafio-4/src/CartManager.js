const fs = require('fs');

class CartManager {
    constructor(path) {
        this.path = path;
    }

    getCartsFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    addCart(cart) {
        const carts = this.getCartsFromFile();
        cart.id = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
        cart.products = [];
        carts.push(cart);
        this.saveCartsToFile(carts);
    }

    getCartById(id) {
        const carts = this.getCartsFromFile();
        return carts.find(cart => cart.id === id);
    }

    addProductToCart(cartId, productId, quantity) {
        let carts = this.getCartsFromFile();
        const index = carts.findIndex(cart => cart.id === cartId);
        if (index !== -1) {
            const cart = carts[index];
            const existingProductIndex = cart.products.findIndex(item => item.productId === productId);
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
            this.saveCartsToFile(carts);
            return cart;
        } else {
            return null;
        }
    }

    saveCartsToFile(carts) {
        fs.writeFileSync(this.path, JSON.stringify(carts, null, 2));
    }
}

module.exports = CartManager;