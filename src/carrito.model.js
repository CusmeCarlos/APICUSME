export const carrito = {
    cli_id: Number, // ID del cliente
    productos: [
        {
            prod_id: Number,   // ID del producto
            cantidad: Number,  // Cantidad que el cliente desea comprar
            precio_unitario: Number // Precio por unidad del producto
        }
    ],
    total: Number // Total de la compra
};
