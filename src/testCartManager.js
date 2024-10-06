const CartManager = require('./CartManager'); // Asegúrate de que la ruta sea correcta
const cartManager = new CartManager(); // Crea una instancia de CartManager

// Prueba de añadir un producto al carrito
const cartId = 1; // ID del carrito
const productId = 101; // ID del producto
const quantity = 2; // Cantidad

const cart = cartManager.addProductToCart(cartId, productId, quantity);
console.log(`Carrito actualizado: ${JSON.stringify(cart, null, 2)}`);

// Prueba de obtener un carrito por ID
const retrievedCart = cartManager.getCartById(cartId);
console.log(`Carrito recuperado: ${JSON.stringify(retrievedCart, null, 2)}`);
