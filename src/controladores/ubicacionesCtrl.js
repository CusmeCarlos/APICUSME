import { conmysql } from '../db.js'


// Controlador para listar ubicaciones
export const listarUbicaciones = async (req, res) => {
    try {
        const [ubicaciones] = await conmysql.query('SELECT * FROM ubicaciones');
        res.json(ubicaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las ubicaciones' });
    }
};
