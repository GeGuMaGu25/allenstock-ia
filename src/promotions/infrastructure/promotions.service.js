/**
 * @summary Servicio de infraestructura para gestionar campañas de descuento.
 * @author Gustavo Alonso Olivares Lao
 */
import axios from 'axios';

const http = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

export class PromotionsService {
    applyDiscount(promoData) {
        return http.post('/promotions/apply', promoData);
    }
}