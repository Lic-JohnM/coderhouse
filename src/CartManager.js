const fs = require('fs');
const path = require('path');

class CartManager {
    constructor() {
        this.path = path.resolve(__dirname, '../data/carts.json'); // Ruta corregida
        this.carts = [];
        this.loadCarts();
    }

    loadCarts() {
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.carts = JSON.parse(data);
        } else {
            console.log(`No se encontró el archivo en la ruta: ${this.path}`);
        }
    }

    getCartById(id) {
        return this.carts.find(cart => cart.id === id);
    }

    addProductToCart(cid, pid, quantity) {
        let cart = this.getCartById(cid);
        
        // Si no existe el carrito, crearlo
        if (!cart) {
            cart = { id: cid, products: [] };
            this.carts.push(cart);
        }
        
        const productIndex = cart.products.findIndex(item => item.id === pid);
        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity; // Aumentar la cantidad
        } else {
            cart.products.push({ id: pid, quantity }); // Agregar nuevo producto
        }
        
        this.saveCarts(); // Guardar cambios
        return cart;
    }

    saveCarts() {
        fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
    }
}

module.exports = CartManager;
