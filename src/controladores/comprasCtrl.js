import { conmysql } from '../db.js';  // Importar el pool de conexiones

export const postCompra = async (req, res) => {
    try {
        const { clienteId, productos, total } = req.body;  // Asegúrate de que el cuerpo de la solicitud tenga estos datos
        // Verifica que el cliente existe
        const [cliente] = await conmysql.query('SELECT * FROM clientes WHERE cli_id = ?', [clienteId]);
        if (cliente.length === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        // Insertar la compra
        const [compraResult] = await conmysql.query('INSERT INTO compras (cliente_id, total) VALUES (?, ?)', [clienteId, total]);
        const compraId = compraResult.insertId;

        // Insertar los productos de la compra (relación muchos a muchos, por ejemplo)
        for (let producto of productos) {
            await conmysql.query('INSERT INTO compras_productos (compra_id, producto_id, cantidad) VALUES (?, ?, ?)', 
                                  [compraId, producto.id, producto.cantidad]);
        }

        res.json({ message: 'Compra realizada con éxito', compraId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al realizar la compra' });
    }
};
