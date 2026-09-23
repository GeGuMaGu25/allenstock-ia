/**
 * @summary Ensamblador para formatear datos de la sesión de caja.
 * @author Gustavo Alonso Olivares Lao
 */
import { CashSession } from '../domain/model/cash-session.entity.js';

export class CashAssembler {
    toEntity(data) {
        return new CashSession(data);
    }
}