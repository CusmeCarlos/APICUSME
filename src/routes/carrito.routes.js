import express from 'express';
import { conmysql } from '../db.js';

const router = express.Router();

// Agregar productos al carrito
router.post('/carrito', async (req, res) => {
    const { cli_id, productos } = req.body;
    let total = 0;
    try {
        // Guardar los productos en el carrito
        for (let prod of productos) {
            const [producto] = await conmysql.execute('SELECT * FROM productos WHERE prod_id = ?', [prod.prod_id]);
            if (producto) {
                total += producto.prod_precio * prod.cantidad;
            }
        }

        const [result] = await conmysql.execute('INSERT INTO carrito (cli_id, productos, total) VALUES (?, ?, ?)', 
                                                 [cli_id, JSON.stringify(productos), total]);

        res.status(201).json({ message: 'Carrito agregado', carritoId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar carrito', error });
    }
});

// Grabar la compra (cuando el cliente hace el pago)
router.post('/compra', async (req, res) => {
    const { cli_id, carritoId, productos, total } = req.body;
    try {
        // Insertar la compra en la tabla de compras
        const [result] = await conmysql.execute('INSERT INTO compras (cli_id, carrito_id, total, productos) VALUES (?, ?, ?, ?)', 
                                                 [cli_id, carritoId, total, JSON.stringify(productos)]);
        
        // Reducir el stock de los productos comprados
        for (let prod of productos) {
            await conmysql.execute('UPDATE productos SET prod_stock = prod_stock - ? WHERE prod_id = ?', [prod.cantidad, prod.prod_id]);
        }

        res.status(201).json({ message: 'Compra realizada con éxito', compraId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error al realizar la compra', error });
    }
});

export default router;
