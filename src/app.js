import express from 'express';
import cors from 'cors'; // importa los paquetes cors
import path from 'path';
import { fileURLToPath } from 'url';
import clientesRoutes from './routes/clientes.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import productosRoutes from './routes/productos.routes.js';
import carritoRoutes from './routes/carrito.routes.js'; // Importa las rutas del carrito
import comprasRoutes from './routes/compras.routes.js'; // Importa las rutas de compras
// definir módulo de ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const corsOptions = {
    origin: '*', // la dirección del dominio del servidor
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json()); // para que interprete los objetos JSON
app.use(express.urlencoded({ extended: true })); // receptar formularios
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas
app.use('/api', clientesRoutes);
app.use('/api', usuariosRoutes);
app.use('/api', productosRoutes);
app.use('/api', carritoRoutes); // Añade las rutas del carrito
app.use('/api', comprasRoutes); // Añade las rutas de compras

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(400).json({
        message: 'Endpoint not found'
    });
});

export default app;
