/**
 * @summary Entidad de dominio que representa una sesión de caja (apertura y cierre).
 * @author Gustavo Alonso Olivares Lao
 */
export class CashSession {
    constructor({ id, usuario_id, monto_inicial, monto_final_esperado, estado }) {
        this.id = id;
        this.userId = usuario_id;
        this.initialAmount = monto_inicial || 0.0;
        this.expectedFinalAmount = monto_final_esperado || this.initialAmount;
        // estado: 'Abierta' o 'Cerrada'
        this.status = estado || 'Cerrada';
    }
}