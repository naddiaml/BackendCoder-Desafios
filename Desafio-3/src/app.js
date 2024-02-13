// Importación del módulo fs desde Node.js
const fs = require('fs');
const express = require('express'); // Se importa el módulo express para crear el servidor web.
const app = express(); // Se crea una instancia de la aplicación Express.
const port = 8080; // Se define el puerto en el que el servidor escuchará las solicitudes.

// Importación de la clase ProductManager desde el archivo correspondiente para interactuar con los productos y realizar operaciones necesarias.
const ProductManager = require('./ProductManager.js');

// Creción de una instancia de ProductManager, pasando la ruta del archivo de productos como argumento al constructor.
const productsFilePath = './products.json';
const productManager = new ProductManager(productsFilePath);

// Endpoint para obtener todos los productos utilizando el método getProducts()
app.get('/products', async (req, res) => {
    try {
        let products = productManager.getProducts();
        const limit = req.query.limit;
        if (limit) {
            products = products.slice(0, limit);
        }
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint para obtener un producto por su ID utilizando el método getProductById().
app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = productManager.getProductById(productId);
        if (product) {
            res.json(product); // Si el producto es encontrado, se responderá con la información del mismo.
        } else {
            res.status(404).json({ error: 'Product not found' }); // Si el producto no se encuentra re responde con un mensaje de error.
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
});

// En caso de no encontrar alguna ruta o intentar acceder a una ruta aún no definida, se responderá con un código de estado 404 y un mensaje de error.
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

app.listen(port, () => { // Se inicia el servidor Express y 'escucha' en el puerto especificado.
    console.log(`Server is running on http://localhost:${port}`);  // Se muestra un mensaje en la consola para indicar que el servidor se ha iniciado correctamente.
});