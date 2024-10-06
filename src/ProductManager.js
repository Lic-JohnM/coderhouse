const fs = require('fs').promises;

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(product => product.id === id);
    }

    async addProduct(product) {
        const products = await this.getProducts();
        const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        product.id = newId;
        products.push(product);
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return product;
    }
}

module.exports = ProductManager;
