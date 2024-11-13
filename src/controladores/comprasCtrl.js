import { conmysql } from '../db.js';

export async function procesarCompra(req, res) {
    const clienteId = req.body.clienteId;
    const productosCompra = req.body.productosCompra;
  
    // Verificar si `productosCompra` es un array
    if (!Array.isArray(productosCompra)) {
      return res.status(400).json({ error: 'productosCompra debe ser un array' });
    }
  
    try {
      // Guardar la compra
      const [result] = await pool.query('INSERT INTO compras (cliente_id) VALUES (?)', [clienteId]);
      const compraId = result.insertId;
  
      // Agregar detalles de compra
      for (const producto of productosCompra) {
        const { prod_id, cantidad } = producto;
        await pool.query(
          'INSERT INTO detalle_compra (compra_id, prod_id, cantidad, precio) VALUES (?, ?, ?, ?)',
          [compraId, prod_id, cantidad, producto.precio]
        );
      }
  
      res.status(200).json({ message: 'Compra guardada exitosamente' });
    } catch (error) {
      console.error('Error al guardar la compra:', error);
      res.status(500).json({ error: 'Error al guardar la compra' });
    }
  }
  