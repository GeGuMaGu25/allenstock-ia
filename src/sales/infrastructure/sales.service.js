/**
 * @summary Servicio de infraestructura para procesar ventas en el POS.
 * @author Gustavo Alonso Olivares Lao
 */
import axios from 'axios';

const http = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

export class SalesService {
    processCheckout(cartData) {
        return http.post('/sales/checkout', cartData);
    }
}