// En carrito.controller.js
import { conmysql } from '../db.js';

export const agregarAlCarrito = async (req, res) => {
  const { cliente_id, producto_id, cantidad } = req.body;
  try {
    const [result] = await conmysql.execute(
      'INSERT INTO carrito (cliente_id, producto_id, cantidad) VALUES (?, ?, ?)',
      [cliente_id, producto_id, cantidad]
    );
    res.status(201).json({ mensaje: 'Producto agregado al carrito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar al carrito', error });
  }
  
};
// En carrito.controller.js
export const grabarCompra = async (req, res) => {
    const { cliente_id } = req.body;
    try {
      const [carrito] = await conmysql.execute(
        'SELECT * FROM carrito WHERE cliente_id = ?',
        [cliente_id]
      );
      // Aquí deberías agregar lógica para disminuir el stock de los productos y grabar el pedido en una tabla de compras
      res.status(200).json({ mensaje: 'Compra realizada con éxito', carrito });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al grabar la compra', error });
    }
  };
// En carrito.controller.js
export const finalizarCompra = async (req, res) => {
    const { cliente_id } = req.body;
    try {
      // Lógica para reducir el stock y eliminar del carrito
      await conmysql.execute('DELETE FROM carrito WHERE cliente_id = ?', [cliente_id]);
      res.status(200).json({ mensaje: 'Compra realizada con éxito' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al finalizar la compra', error });
    }
  };
    