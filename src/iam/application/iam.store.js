/**
 * @summary Gestor de estado de sesión conectado a la API .NET Core.
 * @author Gustavo Alonso Olivares Lao
 */
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { UserAssembler } from '../infrastructure/user.assembler.js';
import { IamService } from '../infrastructure/iam.service.js';
import { useRouter } from 'vue-router';

export const useIamStore = defineStore('iam', () => {
    const currentUser = ref(null);
    const isAuthenticating = ref(false);

    const assembler = new UserAssembler();
    const iamService = new IamService();
    const router = useRouter();

    const login = async (email, password) => {
        isAuthenticating.value = true;
        try {
            // Llamada real al backend enviando el DTO esperado
            const response = await iamService.signIn({ correo: email, contrasena: password });

            // Ensamblamos la entidad con la respuesta de C#
            currentUser.value = assembler.toEntity({
                id: response.data.id,
                nombre_completo: response.data.nombre_completo,
                rol: response.data.rol,
                token: response.data.token
            });

            // Guardamos el JWT en el almacenamiento local para persistir la sesión
            localStorage.setItem('jwt_token', response.data.token);

            router.push('/home');
            return { success: true };
        } catch (error) {
            // Manejo de errores HTTP (401 Unauthorized u otros)
            return {
                success: false,
                message: error.response?.status === 401
                    ? 'Correo o contraseña incorrectos.'
                    : 'Error de conexión con el servidor.'
            };
        } finally {
            isAuthenticating.value = false;
        }
    };

    const logout = () => {
        currentUser.value = null;
        localStorage.removeItem('jwt_token');
        router.push('/login');
    };

    return { currentUser, isAuthenticating, login, logout };
});