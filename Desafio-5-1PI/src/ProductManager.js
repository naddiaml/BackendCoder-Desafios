const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = this.getProductsFromFile();
    }

    getProductsFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    addProduct(product) {
        product.id = this.generateUniqueId();
        this.products.push(product);
        this.saveProductsToFile(this.products);
    }

    getProductById(id) {
        const products = this.getProductsFromFile();
        return products.find(product => product.id === id);
    }

    updateProduct(id, updatedProduct) {
        let products = this.getProductsFromFile();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            updatedProduct.id = id;
            products[index] = updatedProduct;
            this.saveProductsToFile(products);
            return true;
        }
        return false;
    }

    deleteProduct(id) {
        let products = this.getProductsFromFile();
        products = products.filter(product => product.id !== id);
        this.saveProductsToFile(products);
        return true;
    }

    saveProductsToFile(products) {
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    }

    getProducts() {
        return this.getProductsFromFile();
    }
}

module.exports = ProductManager;