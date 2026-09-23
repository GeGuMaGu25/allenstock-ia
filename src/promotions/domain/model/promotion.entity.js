/**
 * @summary Entidad que representa una campaña de descuento activa.
 * @author Gustavo Alonso Olivares Lao
 */
export class Promotion {
    constructor({ id, producto_id, porcentaje_descuento, estado }) {
        this.id = id;
        this.productId = producto_id;
        this.discountPercentage = porcentaje_descuento;
        this.status = estado || 'Activa';
    }
}