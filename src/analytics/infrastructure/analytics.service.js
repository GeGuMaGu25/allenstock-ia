/**
 * @summary Servicio de infraestructura para solicitar predicciones de IA.
 * @author Gustavo Alonso Olivares Lao
 */
import axios from 'axios';

const http = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

export class AnalyticsService {
    getPredictions() {
        return http.get('/analytics/predictions');
    }
}