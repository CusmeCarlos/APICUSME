import { conmysql } from '../db.js';  // Suponiendo que 'conmysql' es tu conexión a la base de datos

export async function procesarCompra(req, res) {
    const { clienteId, productosCompra } = req.body;
  
    // Validar que productosCompra es un array y que cada elemento tiene los campos necesarios
    if (!Array.isArray(productosCompra) || productosCompra.length === 0) {
      return res.status(400).json({ error: "productosCompra debe ser un array con al menos un producto." });
    }
  
    for (const producto of productosCompra) {
      if (!producto.prod_id || !producto.cantidad || producto.precio == null) {
        return res.status(400).json({ error: "Cada producto debe tener prod_id, cantidad, y precio." });
      }
    }
  
    // Si la validación es exitosa, continuar con el procesamiento de la compra
    try {
      // Aquí iría el código para insertar la compra en la base de datos
      // Ejemplo: Insertar la compra en la tabla "compras" y los detalles en "detalle_compra"
  
      res.status(200).json({ message: "Compra procesada exitosamente." });
    } catch (error) {
      console.error('Error al guardar la compra:', error);
      res.status(500).json({ error: 'Error al guardar la compra' });
    }
  }
  