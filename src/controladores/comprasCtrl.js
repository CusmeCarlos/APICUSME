import { conmysql } from '../db.js';  // Importar el pool de conexiones

export async function procesarCompra(req, res) {
  const { clienteId, productos } = req.body;
  
  let connection;  // Declaramos la variable fuera del bloque try

  // Validación de los productos
  if (!Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ error: "productos debe ser un array con al menos un producto." });
  }

  // Comprobar si los productos tienen los campos necesarios
  for (const producto of productos) {
    if (!producto.prod_id || !producto.cantidad) {
      return res.status(400).json({ error: "Cada producto debe tener prod_id y cantidad." });
    }
  }

  try {
    // Obtener la conexión del pool
    connection = await conmysql.getConnection();

    // Iniciar la transacción
    await connection.beginTransaction();

    // Insertar la compra en la tabla de compras
    const [result] = await connection.execute('INSERT INTO compras (cliente_id, fecha_compra) VALUES (?, NOW())', [clienteId]);

    // Obtener el ID de la compra recién insertada
    const compraId = result.insertId;

    // Insertar los productos en la tabla de detalles de compra
    const productosValues = productos.map(producto => [
      compraId,
      producto.prod_id,
      producto.cantidad
    ]);

    await connection.query('INSERT INTO detalles_compra (compra_id, prod_id, cantidad) VALUES ?', [productosValues]);

    // Confirmar la transacción si todo fue bien
    await connection.commit();

    // Responder al cliente con éxito
    res.status(201).json({ message: 'Compra realizada con éxito' });
  } catch (error) {
    // Si hay algún error, deshacer la transacción
    if (connection) {
      await connection.rollback();
    }
    res.status(500).json({ error: 'Error al procesar la compra' });
  } finally {
    // Liberar la conexión del pool (solo cuando se usa una conexión individual)
    if (connection) {
      connection.release();
    }
  }
}
