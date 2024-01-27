class ProductManager {
    constructor() {
        this.products = [];
        this.productIdCounter = 1;
    }

    addProduct(product) {
        // validación de campos obligatorios
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error("Todos los campos son obligatorios.");
            return;
        }

        // Validación ID
        const uniqueID = this.products.every(existingProduct => existingProduct.code !== product.code);
        if (!uniqueID) {
            console.error(`Ya existe un producto con el código ${product.code}.`);
            return;
        }

        // Asignar ID autoincrementable
        product.id = this.productIdCounter++;
        this.products.push(product);
    }

    getProducts() {
        if (this.products.length === 0) {
            return null;
        } else {
            return this.products;
        }
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.error("Producto no encontrado.");
            return null;
        }
        return product;
    }
};

const manager = new ProductManager();

const showProducts = () => {
    console.log('Imprimiendo todos los productos 📋: ');
    const products = manager.getProducts();
    if (products === null) {
        console.log("Aún no hay productos.");
    } else {
        console.log(products);
    }
}

showProducts();

manager.addProduct({
    title: "Producto 1",
    description: "Descripción del producto 1",
    price: 500,
    thumbnail: "ruta/imagen1.jpg",
    code: "ABC123",
    stock: 10
});

manager.addProduct({
    title: "Producto 2",
    description: "Descripción del producto 2",
    price: 140,
    thumbnail: "ruta/imagen2.jpg",
    code: "XYZ456",
    stock: 5
});

showProducts();

console.log('Buscando prouctos según su ID 🔍');
for (let id = 1; id <= 3; id++) {
    console.log(`Buscando el producto con ID ${id}:`);
    const product = manager.getProductById(id);
    if (product !== null) {
        console.log(product);
    }
}