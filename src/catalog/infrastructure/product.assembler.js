/**
 * @summary Ensamblador para mapear la respuesta JSON a entidades Product.
 * @author Gustavo Alonso Olivares Lao
 */
import { Product } from '../domain/model/product.entity.js';

export class ProductAssembler {
    /**
     * @summary Convierte la data cruda de la API en un arreglo de entidades de dominio.
     */
    toEntitiesFromResponse(data) {
        if (!Array.isArray(data)) return [];
        return data.map(item => new Product(item));
    }
}