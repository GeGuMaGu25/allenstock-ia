/**
 * @summary Servicio de infraestructura para registrar movimientos de inventario.
 * @author Gustavo Alonso Olivares Lao
 */
import axios from 'axios';

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

export class InventoryService {
    /**
     * @summary Envía un nuevo registro de movimiento de Kardex a la API.
     * @param {Object} kardexData - Datos crudos del movimiento.
     */
    registerMovement(kardexData) {
        return http.post('/inventory/kardex', kardexData);
    }
}