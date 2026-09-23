/**
 * @summary Gestor de estado para el sub-dominio Catálogo usando Pinia.
 * @author Gustavo Alonso Olivares Lao
 */
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { CatalogService } from '../infrastructure/catalog.service.js';
import { ProductAssembler } from '../infrastructure/product.assembler.js';

export const useCatalogStore = defineStore('catalog', () => {
    const products = ref([]);
    const isLoading = ref(false);

    // Inyección de dependencias manual: instanciamos las herramientas que necesitamos
    const service = new CatalogService();
    const assembler = new ProductAssembler();

    const fetchProducts = async () => {
        isLoading.value = true;
        try {
            // Como aún no hemos construido el backend en C#, usaremos un "Mock" (datos falsos)
            // simulando lo que nos devolvería el service.getProducts()
            const mockData = [
                { id: 1, codigo_barras: '7751234567890', nombre: 'Laptop ASUS ROG', categoria: 'Electrónica', precio_base: 1500.00 },
                { id: 2, codigo_barras: '7750987654321', nombre: 'Teclado Mecánico', categoria: 'Accesorios', precio_base: 85.50 },
                { id: 3, codigo_barras: '7751122334455', nombre: 'Monitor LG 27"', categoria: 'Electrónica', precio_base: 320.00 }
            ];

            // Pasamos los datos crudos al ensamblador para que los convierta en entidades limpias
            products.value = assembler.toEntitiesFromResponse(mockData);
        } catch (error) {
            console.error('Error fetching catalog:', error);
        } finally {
            isLoading.value = false;
        }
    };

    return { products, isLoading, fetchProducts };
});