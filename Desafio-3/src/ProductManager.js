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

    getProducts() {
        return this.getProductsFromFile();
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
    }

    saveProductsToFile(products) {
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    }
}

const productManager = new ProductManager('fileName.json');

productManager.addProduct({
    title: "Product 1",
    description: "Description of product 1",
    price: 19.99,
    thumbnail: "image1.jpg",
    code: "P001",
    stock: 50
});

console.log(productManager.getProducts());

const updatedProduct = {
    title: "Updated Product 1",
    description: "Updated description of product 1",
    price: 29.99,
    thumbnail: "updated_image1.jpg",
    code: "P001",
    stock: 30
};
productManager.updateProduct(1, updatedProduct);

console.log(productManager.getProducts());

productManager.deleteProduct(1);

console.log(productManager.getProducts());