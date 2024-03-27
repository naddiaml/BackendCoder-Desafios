import Product from '../dao/models/Product.js';

export default class ProductManager {
    async addProduct(productData) {
        try {
            const product = await Product.create(productData);
            return product;
        } catch (error) {
            throw new Error(`Error en el servicio de agregar producto: ${error.message}`);
        }
    }

    async getProducts() {
        try {
            const products = await Product.find();
            return products;
        } catch (error) {
            throw new Error(`Error en el servicio de obtener productos: ${error.message}`);
        }
    }

    async getProductById(productId) {
        try {
            const product = await Product.findById(productId);
            return product;
        } catch (error) {
            throw new Error(`Error en el servicio de obtener producto por ID: ${error.message}`);
        }
    }

    async updateProduct(productId, updatedProductData) {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });
            return updatedProduct;
        } catch (error) {
            throw new Error(`Error en el servicio de actualizar producto: ${error.message}`);
        }
    }

    async deleteProduct(productId) {
        try {
            const result = await Product.findByIdAndDelete(productId);
            return result ? true : false;
        } catch (error) {
            throw new Error(`Error en el servicio de eliminar producto: ${error.message}`);
        }
    }
}
