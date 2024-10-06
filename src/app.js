// Importar dependencias
const express = require('express');
const cors = require('cors');
const ProductManager = require('./ProductManager'); // Asegúrate de que la ruta sea correcta
const CartManager = require('./CartManager'); // Asegúrate de que la ruta sea correcta
const app = express();
const port = 8080; // O el puerto que prefieras

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Servir archivos estáticos desde la carpeta 'public'

// Instanciar ProductManager y CartManager
const productManager = new ProductManager('./data/products.json');
const cartManager = new CartManager('./data/carts.json'); // Ruta para los carritos

// Rutas para manejar productos
app.get('/api/products', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.get('/api/products/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await productManager.getProductById(parseInt(pid));
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

app.post('/api/products', async (req, res) => {
    const { title, description, price, code, stock, category, thumbnails, status } = req.body;

    // Validaciones de tipos de datos
    if (
        typeof title !== 'string' ||
        typeof description !== 'string' ||
        typeof code !== 'string' ||
        typeof price !== 'number' ||
        typeof category !== 'string' ||
        typeof stock !== 'number' ||
        typeof status !== 'boolean' ||
        !Array.isArray(thumbnails) ||                      // Verifica que sea un array
        !thumbnails.every(item => typeof item === 'string') // Verifica que todos los elementos del array sean strings
    ) {
        return res.status(400).json({ error: 'Error en la validación de datos. Asegúrate de enviar los tipos correctos.' });
    }

    // Si las validaciones pasan, proceder con la lógica de agregar el producto
    try {
        const newProduct = await productManager.addProduct({ title, description, price, code, stock, category, thumbnails, status });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: 'Error al agregar el producto' });
    }
});

// Actualizar un producto por su pid
app.put('/api/products/:pid', async (req, res) => {
    const { pid } = req.params;
    const updateData = req.body;

    // Asegurarse de que no se actualice el id
    if (updateData.hasOwnProperty('id')) {
        return res.status(400).json({ error: 'No se puede actualizar el id del producto' });
    }

    try {
        const updatedProduct = await productManager.updateProduct(parseInt(pid), updateData);
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

// Eliminar un producto por su pid
app.delete('/api/products/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const deleted = await productManager.deleteProduct(parseInt(pid));
        if (deleted) {
            res.json({ message: 'Producto eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

// Rutas para manejar carritos
app.get('/api/carts', (req, res) => {
    res.json(cartManager.carts); // Devolver todos los carritos
});

app.post('/api/carts/:cid/products', (req, res) => {
    const { cid } = req.params;
    const { id, quantity } = req.body;

    const cartId = parseInt(cid);
    const added = cartManager.addProductToCart(cartId, id, quantity);
    
    if (added) {
        res.status(200).json({ message: 'Producto agregado al carrito' });
    } else {
        res.status(404).json({ error: 'Carrito no encontrado o producto no válido' });
    }
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
