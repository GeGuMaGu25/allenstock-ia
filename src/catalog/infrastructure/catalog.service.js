/**
 * @summary Servicio de infraestructura para consumir la API del catálogo.
 * @author Gustavo Alonso Olivares Lao
 */
import axios from 'axios';

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

export class CatalogService {
    /**
     * @summary Obtiene la lista maestra de productos.
     */
    getProducts() {
        // Apuntará a nuestro futuro backend en .NET Core
        return http.get('/catalog/products');
    }
}