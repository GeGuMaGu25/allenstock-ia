import { defineStore } from 'pinia';
import { ref } from 'vue';
import { CatalogService } from '../infrastructure/catalog.service.js';

export const useCatalogStore = defineStore('catalog', () => {
    const service = new CatalogService();
    const products = ref([]);
    const categories = ref([]);
    const isLoading = ref(false);

    const fetchData = async () => {
        isLoading.value = true;
        try {
            const [prodRes, catRes] = await Promise.all([
                service.getProducts(),
                service.getCategories()
            ]);
            products.value = prodRes.data;
            categories.value = catRes.data;
        } catch (error) {
            console.error('Error cargando el catálogo:', error);
        } finally {
            isLoading.value = false;
        }
    };

    return { products, categories, isLoading, fetchData, service };
});