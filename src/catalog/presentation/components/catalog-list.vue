<script setup>
import { onMounted, computed } from 'vue';
import { useCatalogStore } from '../../application/catalog.store.js';

/**
 * @summary Componente visual que lista el catálogo maestro de productos.
 * @author Gustavo Alonso Olivares Lao
 */
const catalogStore = useCatalogStore();

// Usamos computed para que la vista reaccione a los cambios en el store
const products = computed(() => catalogStore.products);
const isLoading = computed(() => catalogStore.isLoading);

// Al montar el componente, el Jefe le ordena al Gerente que traiga los datos
onMounted(() => {
  catalogStore.fetchProducts();
});
</script>

<template>
  <div class="p-4 md:p-6 lg:px-8 max-w-screen-xl mx-auto">
    <div class="flex align-items-center justify-content-between mb-4">
      <h2 class="text-primary m-0">Catálogo Maestro</h2>
      <router-link to="/home" style="text-decoration: none;">
        <pv-button label="Volver" icon="pi pi-arrow-left" text />
      </router-link>
    </div>

    <div v-if="isLoading" class="text-center mt-6">
      <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
      <p>Cargando productos...</p>
    </div>

    <div v-else class="grid">
      <!-- Tarjetas iteradas dinámicamente -->
      <div v-for="product in products" :key="product.id" class="col-12 md:col-6 lg:col-4 p-3">
        <pv-card class="h-full shadow-2 border-round-xl">
          <template #title>
            <div class="text-lg">{{ product.name }}</div>
          </template>
          <template #subtitle>
            <div class="flex flex-column gap-1 text-sm mt-1">
              <span><strong>SKU:</strong> {{ product.barcode }}</span>
              <span><strong>Categoría:</strong> {{ product.category }}</span>
            </div>
          </template>
          <template #content>
            <p class="text-2xl font-bold text-color mt-3 mb-0">S/ {{ product.basePrice.toFixed(2) }}</p>
          </template>
        </pv-card>
      </div>
    </div>
  </div>
</template>