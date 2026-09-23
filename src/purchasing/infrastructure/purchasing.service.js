/**
 * @summary Servicio de infraestructura para gestionar proveedores y reclamos.
 * @author Gustavo Alonso Olivares Lao
 */
import axios from 'axios';

const http = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

export class PurchasingService {
    getClaims() {
        return http.get('/purchasing/claims');
    }
}