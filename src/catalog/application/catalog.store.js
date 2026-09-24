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
            // Llamamos al servicio de infraestructura que usa Axios
            const response = await service.getProducts();

            // Axios guarda la respuesta del servidor en la propiedad ".data"
            // Pasamos esos datos al ensamblador para convertirlos en Entidades
            products.value = assembler.toEntitiesFromResponse(response.data);

        } catch (error) {
            console.error('Error al conectar con la API de .NET:', error);
        } finally {
            isLoading.value = false;
        }
    };

    return { products, isLoading, fetchProducts };
});