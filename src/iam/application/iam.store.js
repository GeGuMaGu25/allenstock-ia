/**
 * @summary Gestor de estado de sesión y autenticación usando Pinia.
 * @author Gustavo Alonso Olivares Lao
 */
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { UserAssembler } from '../infrastructure/user.assembler.js';
import { useRouter } from 'vue-router';

export const useIamStore = defineStore('iam', () => {
    const currentUser = ref(null);
    const isAuthenticating = ref(false);

    const assembler = new UserAssembler();
    const router = useRouter();

    const login = async (email, password) => {
        isAuthenticating.value = true;
        try {
            // Simulamos la validación del backend
            await new Promise(resolve => setTimeout(resolve, 1200));

            if (email && password) {
                currentUser.value = assembler.toEntity({
                    id: 1,
                    nombre_completo: 'Gustavo Alonso Olivares Lao',
                    rol: 'Administrador',
                    token: 'jwt-fake-token-123'
                });

                router.push('/home'); // Redirección automática al éxito
                return { success: true };
            }
            throw new Error();
        } catch (error) {
            return { success: false, message: 'Credenciales inválidas. Intente nuevamente.' };
        } finally {
            isAuthenticating.value = false;
        }
    };

    const logout = () => {
        currentUser.value = null;
        router.push('/login');
    };

    return { currentUser, isAuthenticating, login, logout };
});