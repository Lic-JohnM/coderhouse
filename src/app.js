// src/app.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import productRoutes from './routes/productRoutes.js'; 
import cartRoutes from './routes/cartRoutes.js'; 

const app = express();
const PORT = 8080; 

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public'))); // Servir archivos estáticos desde la carpeta 'public'

// Rutas de productos
app.use('/api/products', productRoutes); // Usar las rutas de productos
app.use('/api/carts', cartRoutes); // Rutas para manejar carritos

// Ruta raíz opcional (puedes definirla según lo necesites)
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html')); // Sirve index.html directamente
});

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
