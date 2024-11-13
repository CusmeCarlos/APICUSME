import { conmysql } from '../db.js';

// Obtener los productos en el carrito
export const getCarrito = async (req, res) => {
    const { cliente_id } = req.params;

    try {
        const [rows] = await conmysql.execute(
            `SELECT c.carrito_id, p.prod_nombre, c.cantidad, c.precio 
            FROM carrito c
            JOIN productos p ON c.producto_id = p.prod_id
            WHERE c.compra_id IS NULL AND c.cliente_id = ?`, 
            [cliente_id]
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el carrito' });
    }
};

// Agregar producto al carrito
export const agregarAlCarrito = async (req, res) => {
    const { cliente_id, producto_id, cantidad, precio } = req.body;

    try {
        // Verificar si el producto ya está en el carrito del cliente
        const [productoExistente] = await conmysql.execute(
            `SELECT * FROM carrito WHERE cliente_id = ? AND producto_id = ?`,
            [cliente_id, producto_id]
        );

        if (productoExistente.length > 0) {
            // Si el producto ya está en el carrito, actualizar la cantidad
            await conmysql.execute(
                `UPDATE carrito SET compra_id = ? WHERE cliente_id = ? AND compra_id IS NULL`,
                [compra_id, cliente_id]
              );
              
        } else {
            // Si el producto no está en el carrito, agregarlo
            await conmysql.execute(
                `INSERT INTO carrito (cliente_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)`,
                [cliente_id, producto_id, cantidad, precio]
            );
        }

        res.json({ message: 'Producto agregado al carrito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar al carrito' });
    }
};



// Realizar la compra
// Realizar la compra
export const realizarCompra = async (req, res) => {
    const { cliente_id, total } = req.body;

    try {
        // Crear una nueva compra
        const [compraResult] = await conmysql.execute(
            `INSERT INTO compras (cliente_id, total) VALUES (?, ?)`,
            [cliente_id, total]
        );
        const compra_id = compraResult.insertId;

        // Mover los productos del carrito a la compra
        await conmysql.execute(
            `UPDATE carrito SET compra_id = ? WHERE cliente_id = ? AND compra_id IS NULL`,
            [compra_id, cliente_id]  // Asegúrate de que la consulta esté correcta
        );

        res.json({ message: 'Compra realizada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al realizar la compra' });
    }
};

