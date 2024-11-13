import { conmysql } from '../db.js';
import { crearCompra } from '../compra.model.js';

export const registrarCompra = async (req, res) => {
    const { clienteId, productos } = req.body;
    
    try {
        const compraId = await crearCompra(clienteId, productos);
        res.status(201).json({ message: 'Compra registrada con éxito', compraId });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar la compra', error });
    }
};
