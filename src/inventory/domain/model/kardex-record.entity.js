/**
 * @summary Entidad de dominio que representa un movimiento físico en el almacén (Kardex).
 * @author Gustavo Alonso Olivares Lao
 */
export class KardexRecord {
    constructor({ id, producto_id, tipo_movimiento, cantidad, motivo, fecha_movimiento }) {
        this.id = id;
        this.productId = producto_id;
        // tipo_movimiento: Entrada, Salida, Ajuste
        this.movementType = tipo_movimiento || 'Ajuste';
        this.quantity = cantidad || 0;
        // motivo: Compra, Venta, Merma, Devolución, Donación[cite: 7]
        this.reason = motivo || 'No especificado';
        this.date = fecha_movimiento || new Date().toISOString();
    }
}