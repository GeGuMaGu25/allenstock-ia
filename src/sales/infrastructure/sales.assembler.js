/**
 * @summary Ensamblador para el módulo de ventas.
 * @author Gustavo Alonso Olivares Lao
 */
import { CartItem } from '../domain/model/cart-item.entity.js';

export class SalesAssembler {
    toEntity(data) { return new CartItem(data); }
}