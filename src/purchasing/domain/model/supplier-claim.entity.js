/**
 * @summary Entidad de dominio que representa un reclamo de garantía o cambio hacia un proveedor.
 * @author Gustavo Alonso Olivares Lao
 */
export class SupplierClaim {
    constructor({ id, kardex_id, proveedor_id, estado, fecha_envio_programado, observaciones }) {
        this.id = id;
        this.kardexId = kardex_id;
        this.supplierId = proveedor_id;
        // estado: Notificado, Aprobado, En_Camino, Resuelto
        this.status = estado || 'Notificado';
        this.scheduledDate = fecha_envio_programado || null;
        this.observations = observaciones || '';
    }
}