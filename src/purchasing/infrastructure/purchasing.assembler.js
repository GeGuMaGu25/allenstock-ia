/**
 * @summary Ensamblador para formatear datos de reclamos a proveedores.
 * @author Gustavo Alonso Olivares Lao
 */
import { SupplierClaim } from '../domain/model/supplier-claim.entity.js';

export class PurchasingAssembler {
    toEntity(data) {
        return new SupplierClaim(data);
    }
}