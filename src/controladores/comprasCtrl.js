import { conmysql } from '../db.js';  // Suponiendo que 'conmysql' es tu conexión a la base de datos

export async function procesarCompra(req, res) {
  const { clienteId, productos } = req.body;

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
    // Iniciar la transacción para asegurar la atomicidad
    conmysql.beginTransaction(function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error al iniciar la transacción' });
      }

      // Insertar la compra en la tabla de compras
      const sqlCompra = 'INSERT INTO compras (cliente_id, fecha_compra) VALUES (?, NOW())';
      conmysql.query(sqlCompra, [clienteId], (err, result) => {
        if (err) {
          return conmysql.rollback(() => {
            return res.status(500).json({ error: 'Error al insertar la compra' });
          });
        }

        // Obtener el ID de la compra recién insertada
        const compraId = result.insertId;

        // Insertar los productos en la tabla de detalles de compra
        const productosValues = productos.map(producto => [
          compraId,
          producto.prod_id,
          producto.cantidad
        ]);

        const sqlDetallesCompra = 'INSERT INTO detalles_compra (compra_id, prod_id, cantidad) VALUES ?';
        conmysql.query(sqlDetallesCompra, [productosValues], (err) => {
          if (err) {
            return conmysql.rollback(() => {
              return res.status(500).json({ error: 'Error al insertar los productos en la compra' });
            });
          }

          // Si todo fue exitoso, confirmar la transacción
          conmysql.commit((err) => {
            if (err) {
              return conmysql.rollback(() => {
                return res.status(500).json({ error: 'Error al confirmar la transacción' });
              });
            }

            // Responder al cliente con éxito
            res.status(201).json({ message: 'Compra realizada con éxito' });
          });
        });
      });
    });
  } catch (error) {
    console.error('Error al procesar la compra:', error);
    res.status(500).json({ error: 'Error al procesar la compra' });
  }
}
