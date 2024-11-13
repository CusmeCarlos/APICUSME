import { conmysql } from './db.js';

export const crearCompra = async (clienteId, productos) => {
    try {
        // Crear una compra en la base de datos
        const [compra] = await conmysql.query('INSERT INTO compras (cliente_id, fecha) VALUES (?, NOW())', [clienteId]);

        // Insertar los productos de la compra
        for (const producto of productos) {
            await conmysql.query('INSERT INTO detalle_compras (compra_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)', [
                compra.insertId,
                producto.prod_id,
                1, // Puedes ajustar la cantidad si lo deseas
                producto.prod_precio
            ]);
        }

        return compra.insertId; // Devuelve el ID de la compra
    } catch (error) {
        console.error('Error al registrar la compra:', error);
        throw error;
    }
};
