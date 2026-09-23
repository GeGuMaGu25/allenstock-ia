/**
 * @summary Servicio de infraestructura para la gestión de caja.
 * @author Gustavo Alonso Olivares Lao
 */
import axios from 'axios';

const http = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

export class CashService {
    openSession(data) { return http.post('/cash/sessions/open', data); }
    closeSession(id, data) { return http.post(`/cash/sessions/${id}/close`, data); }
}