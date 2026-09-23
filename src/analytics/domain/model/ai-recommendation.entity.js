/**
 * @summary Entidad que representa una sugerencia probabilística de inventario generada por IA.
 * @author Gustavo Alonso Olivares Lao
 */
export class AiRecommendation {
    constructor({ id, producto_id, accion_sugerida, probabilidad_exito, justificacion_ia }) {
        this.id = id;
        this.productId = producto_id;
        this.suggestedAction = accion_sugerida; // 'Promocion', 'Merma' o 'Donacion'
        this.probability = probabilidad_exito; // Ej: 0.85 (85%)
        this.justification = justificacion_ia;
    }
}