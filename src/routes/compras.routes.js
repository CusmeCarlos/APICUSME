import express from 'express';
import { procesarCompra } from '../controladores/comprasCtrl.js';

const router = express.Router();

// Endpoint para procesar una compra
router.post('/compras', procesarCompra, async (req, res) => {
  const { clienteId, productos } = req.body;

  try {
    // Aquí debes guardar la compra en tu base de datos. Ejemplo con SQL:
    const nuevaCompra = await db.query(
      `INSERT INTO compras (cliente_id, fecha_compra) VALUES (?, NOW())`,
      [clienteId]
    );

    // Obtiene el ID de la compra recién creada
    const compraId = nuevaCompra.insertId;

    // Inserta cada producto en la tabla de detalles de compra
    for (const producto of productos) {
      await db.query(
        `INSERT INTO detalles_compra (compra_id, prod_id, cantidad) VALUES (?, ?, ?)`,
        [compraId, producto.prod_id, producto.cantidad]
      );
    }

    res.status(201).json({ message: 'Compra realizada con éxito' });
  } catch (error) {
    console.error('Error al guardar la compra:', error);
    res.status(500).json({ error: 'Error al procesar la compra' });
  }
});

export default router;
