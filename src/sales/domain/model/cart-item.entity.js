/**
 * @summary Entidad que representa una línea de detalle en el ticket de venta.
 * @author Gustavo Alonso Olivares Lao
 */
export class CartItem {
    constructor({ id, nombre, precio, cantidad }) {
        this.productId = id;
        this.name = nombre;
        this.unitPrice = precio;
        this.quantity = cantidad || 1;
    }

    get subtotal() {
        return this.unitPrice * this.quantity;
    }
}