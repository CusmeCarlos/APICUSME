import { conmysql } from '../db.js';

export const addProductToCart = async (req, res) => {
    const { prod_id, cantidad } = req.body;
    try {
        await conmysql.query('INSERT INTO carrito (prod_id, cantidad) VALUES (?, ?)', [prod_id, cantidad]);
        res.json({ message: 'Producto añadido al carrito' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCartItems = async (req, res) => {
    try {
        const [rows] = await conmysql.query('SELECT * FROM carrito');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const clearCart = async (req, res) => {
    try {
        await conmysql.query('DELETE FROM carrito');
        res.json({ message: 'Carrito vaciado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
