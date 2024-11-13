import { conmysql } from '../db.js';  // Suponiendo que 'conmysql' es tu conexión a la base de datos

export async function procesarCompra(req, res) {
  const { clienteId, productosCompra } = req.body;

  if (!Array.isArray(productosCompra) || productosCompra.length === 0) {
    return res.status(400).json({ error: "productosCompra debe ser un array con al menos un producto." });
  }

  for (const producto of productosCompra) {
    if (!producto.prod_id || !producto.cantidad || producto.precio == null) {
      return res.status(400).json({ error: "Cada producto debe tener prod_id, cantidad, y precio." });
    }
  }

  try {
    // Iniciar transacción (si tu base de datos soporta transacciones)
    const connection = await conmysql.getConnection();
    await connection.beginTransaction();

    // Insertar compra
    const [result] = await connection.query(
      'INSERT INTO compras (cliente_id) VALUES (?)',
      [clienteId]
    );
    const compraId = result.insertId;

    // Insertar detalle de la compra
    for (const producto of productosCompra) {
      await connection.query(
        'INSERT INTO detalle_compra (compra_id, prod_id, cantidad, precio) VALUES (?, ?, ?, ?)',
        [compraId, producto.prod_id, producto.cantidad, producto.precio]
      );
    }

    // Confirmar transacción
    await connection.commit();
    res.status(200).json({ message: 'Compra procesada con éxito' });

  } catch (error) {
    console.error('Error al guardar la compra:', error);
    await connection.rollback(); // Revertir en caso de error
    res.status(500).json({ error: 'Error al guardar la compra' });
  }
}
