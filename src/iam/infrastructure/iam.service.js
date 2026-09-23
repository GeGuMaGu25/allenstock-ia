/**
 * @summary Servicio para la comunicación con los endpoints de autenticación.
 * @author Gustavo Alonso Olivares Lao
 */
import axios from 'axios';

const http = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

export class IamService {
    signIn(credentials) {
        return http.post('/iam/auth/sign-in', credentials);
    }
}