/**
 * @summary Ensamblador para campañas de promociones.
 * @author Gustavo Alonso Olivares Lao
 */
import { Promotion } from '../domain/model/promotion.entity.js';

export class PromotionsAssembler {
    toEntity(data) { return new Promotion(data); }
}