const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
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
        const products = this.getProductsFromFile();
        product.id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        products.push(product);
        this.saveProductsToFile(products);
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
}

module.exports = ProductManager;