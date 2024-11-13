export const obtenerCarrito = (req, res) => {
    res.json({ carrito: [] }); // Implementa la lógica para obtener el carrito
};

export const agregarAlCarrito = (req, res) => {
    // Lógica para agregar producto al carrito
    res.json({ mensaje: 'Producto agregado al carrito' });
};

export const eliminarDelCarrito = (req, res) => {
    const { id } = req.params;
    // Lógica para eliminar producto del carrito usando el id
    res.json({ mensaje: `Producto con id ${id} eliminado del carrito` });
};
