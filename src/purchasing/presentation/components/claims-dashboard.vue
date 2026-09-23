<script setup>
import { onMounted } from 'vue';
import { usePurchasingStore } from '../../application/purchasing.store.js';

/**
 * @summary Panel de control para el seguimiento de reclamos a proveedores.
 * @author Gustavo Alonso Olivares Lao
 */
const purchasingStore = usePurchasingStore();

onMounted(() => {
  purchasingStore.fetchClaims();
});

const getSeverity = (status) => {
  switch (status) {
    case 'Notificado': return 'warning';
    case 'En_Camino': return 'info';
    case 'Resuelto': return 'success';
    default: return 'secondary';
  }
};
</script>

<template>
  <div class="p-4 md:p-6 lg:px-8 max-w-screen-xl mx-auto">
    <div class="flex align-items-center justify-content-between mb-4">
      <h2 class="text-primary m-0">Gestión de Proveedores</h2>
      <router-link to="/home" style="text-decoration: none;">
        <pv-button label="Volver" icon="pi pi-arrow-left" text />
      </router-link>
    </div>

    <div v-if="purchasingStore.isLoading" class="text-center mt-6">
      <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
      <p>Cargando reclamos activos...</p>
    </div>

    <div v-else class="grid">
      <div v-for="claim in purchasingStore.claims" :key="claim.id" class="col-12 md:col-6 p-3">
        <pv-card class="h-full shadow-2 border-round-xl">
          <template #title>
            <div class="flex justify-content-between">
              <span>Reclamo #{{ claim.id }}</span>
              <!-- Simulamos un Tag usando un Button sin funcionalidad para el estilo -->
              <pv-button :label="claim.status" :severity="getSeverity(claim.status)" size="small" class="pointer-events-none" rounded />
            </div>
          </template>
          <template #subtitle>
            <span class="text-sm">Proveedor ID: {{ claim.supplierId }} | Kardex Ref: {{ claim.kardexId }}</span>
          </template>
          <template #content>
            <p class="mt-3">{{ claim.observations }}</p>
            <p v-if="claim.scheduledDate" class="font-bold text-primary mt-2">
              <i class="pi pi-calendar mr-2"></i>Reposición programada: {{ claim.scheduledDate }}
            </p>
          </template>
        </pv-card>
      </div>
    </div>
  </div>
</template>