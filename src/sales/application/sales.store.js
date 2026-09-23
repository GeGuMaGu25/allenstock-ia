/**
 * @summary Gestor de estado para el Punto de Venta (Carrito y Checkout).
 * @author Gustavo Alonso Olivares Lao
 */
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { CartItem } from '../domain/model/cart-item.entity.js';

export const useSalesStore = defineStore('sales', () => {
    const cart = ref([]);
    const isProcessing = ref(false);

    const total = computed(() => {
        return cart.value.reduce((sum, item) => sum + item.subtotal, 0);
    });

    const addToCart = (productData) => {
        const existingItem = cart.value.find(item => item.productId === productData.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.value.push(new CartItem(productData));
        }
    };

    const processSale = async () => {
        isProcessing.value = true;
        try {
            // Simula el envío al backend (API .NET) y la emisión de VentaCompletada[cite: 7]
            await new Promise(resolve => setTimeout(resolve, 1000));
            cart.value = []; // Limpiamos el carrito tras la venta
            return { success: true, message: 'Venta completada. Ticket generado.' };
        } catch (error) {
            return { success: false, message: 'Error al procesar el pago.' };
        } finally {
            isProcessing.value = false;
        }
    };

    return { cart, total, isProcessing, addToCart, processSale };
});