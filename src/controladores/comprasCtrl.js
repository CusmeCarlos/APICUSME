import { conmysql } from '../db.js';

export const procesarCompra = async (req, res) => {
  try {
    const { clienteId, productosCompra } = req.body;

    // Insertar la compra en la base de datos
    const [result] = await conmysql.query('INSERT INTO compras (cliente_id) VALUES (?)', [clienteId]);
    const compraId = result.insertId;

    // Insertar cada producto en la tabla de detalles de la compra
    for (const producto of productosCompra) {
      await conmysql.query(
        'INSERT INTO compra_detalles (compra_id, prod_id, cantidad) VALUES (?, ?, ?)',
        [compraId, producto.prod_id, producto.cantidad]
      );
    }

    res.status(201).json({ message: 'Compra realizada con éxito' });
  } catch (error) {
    console.error('Error al guardar la compra:', error);
    res.status(500).json({ error: 'Error al guardar la compra' });
  }
};
