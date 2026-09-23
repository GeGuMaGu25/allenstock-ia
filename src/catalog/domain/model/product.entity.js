/**
 * @summary Entidad de dominio que representa un producto maestro en el catálogo.
 * @author Gustavo Alonso Olivares Lao
 */
export class Product {
    constructor({ id, codigo_barras, nombre, categoria, precio_base }) {
        this.id = id;
        this.barcode = codigo_barras || 'Sin código';
        this.name = nombre || 'Producto Desconocido';
        this.category = categoria || 'General';
        this.basePrice = precio_base || 0.0;
    }
}