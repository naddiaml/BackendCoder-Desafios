// Importación del módulo fs desde Node.js
const fs = require('fs');

// Definición de la clase ProductManager para gestionará los productos.
class ProductManager {
    constructor(path) { // Cuando se cree una nueva instancia de ProductManager, se pasará la ruta del archivo como argumento al constructor de la clase.
        this.path = path;
    }

    getProductsFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf8'); // Se utiliza el método readFileSync para leer el contenido del archivo especificado en this.path.
            return JSON.parse(data); // Leído el contenido del archivo, se utiliza JSON.parse() para parsear los datos del archivo convertirlos en un objeto
        } catch (error) {
            return []; // En caso de error en la lectura del archivo, retornará un array vacío.
        }
    }

    // Método addProduct → agrega un nuevo producto al archivo de productos.
    addProduct(product) {
        const products = this.getProductsFromFile(); // Se lee la lista de productos del archivo.
        product.id = products.length > 0 ? products[products.length - 1].id + 1 : 1; // Se asigna un ID al nuevo producto, incrementando el ID del último producto en la lista.
        products.push(product); // Se agrega el nuevo producto a la lista.
        this.saveProductsToFile(products); // Se guarda la lista actualizada de productos en el archivo.
    }

    getProducts() {
        return this.getProductsFromFile();
    }

    getProductById(id) {
        const products = this.getProductsFromFile(); //Lee el archivo 
        return products.find(product => product.id === id); // Busca el producto por su ID en el array de productos, y si este existe, lo retorna.
    }

    // Método updateProduct → Este método actualiza un producto ya existente en el archivo.
    updateProduct(id, updatedProduct) {
        let products = this.getProductsFromFile();
        const index = products.findIndex(product => product.id === id); // Busca el índice del producto a actualizar en la lista.
        if (index !== -1) {
            updatedProduct.id = id; // Se actualiza el campo id del objeto actualizado con el id original del producto a modificar para asegurar que el id del producto actualizado sea el mismo que el id original del producto que se está actualizando.
            products[index] = updatedProduct;
            this.saveProductsToFile(products);
            return true;
        } // Si encuentra el producto, actualiza sus datos con los proporcionados y guarda la lista actualizada en el archivo.
        return false;
    }

    // Método deleteProduct → Este método elimina un producto del archivo por su ID.
    deleteProduct(id) {
        let products = this.getProductsFromFile();
        products = products.filter(product => product.id !== id);
        this.saveProductsToFile(products);
    }

    saveProductsToFile(products) { // Convierte los productos en formato JSON y los guarda en el archivo.
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
