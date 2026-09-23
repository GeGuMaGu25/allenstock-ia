<script setup>
import { onMounted, ref } from 'vue';
import { useAnalyticsStore } from '../../application/analytics.store.js';
import { usePromotionsStore } from '../../../promotions/application/promotions.store.js';

/**
 * @summary Panel de control para revisar y aprobar sugerencias de IA.
 * @author Gustavo Alonso Olivares Lao
 */
const analyticsStore = useAnalyticsStore();
const promotionsStore = usePromotionsStore();
const feedback = ref('');

onMounted(() => {
  analyticsStore.fetchPredictions();
});

const approveRecommendation = (rec) => {
  const result = promotionsStore.applyPromotionFromAi(rec);
  feedback.value = result.message;
  // Removemos la sugerencia de la lista de pendientes
  analyticsStore.recommendations = analyticsStore.recommendations.filter(r => r.id !== rec.id);
  setTimeout(() => feedback.value = '', 4000);
};
</script>

<template>
  <div class="p-4 md:p-6 lg:px-8 max-w-screen-xl mx-auto">
    <div class="flex align-items-center justify-content-between mb-4">
      <h2 class="text-primary m-0"><i class="pi pi-bolt mr-2"></i>Analítica Predictiva IA</h2>
      <router-link to="/home" style="text-decoration: none;">
        <pv-button label="Volver" icon="pi pi-arrow-left" text />
      </router-link>
    </div>

    <div v-if="feedback" class="p-3 mb-4 bg-green-900 text-green-300 border-round text-center font-bold shadow-2">
      <i class="pi pi-check-circle mr-2"></i>{{ feedback }}
    </div>

    <div v-if="analyticsStore.isAnalyzing" class="text-center mt-6">
      <i class="pi pi-spin pi-spinner text-5xl text-primary mb-3"></i>
      <p class="text-color-secondary">OpenAI está analizando el histórico de ventas...</p>
    </div>

    <div v-else class="grid">
      <div v-for="rec in analyticsStore.recommendations" :key="rec.id" class="col-12 md:col-6">
        <pv-card class="h-full shadow-2 border-round-xl border-1 border-primary">
          <template #title>
            <div class="flex justify-content-between align-items-center">
              <span>Sugerencia: {{ rec.suggestedAction }}</span>
              <span class="text-sm bg-primary text-white px-2 py-1 border-round">
                {{ (rec.probability * 100).toFixed(0) }}% Certeza
              </span>
            </div>
          </template>
          <template #subtitle>
            <span class="text-color-secondary">ID Producto Afectado: {{ rec.productId }}</span>
          </template>
          <template #content>
            <p class="line-height-3 mt-2 text-gray-300 font-italic">"{{ rec.justification }}"</p>
          </template>
          <template #footer>
            <div class="flex justify-content-end gap-2 mt-3">
              <pv-button label="Descartar" icon="pi pi-times" severity="secondary" outlined />
              <pv-button label="Aprobar y Ejecutar" icon="pi pi-check" severity="success" @click="approveRecommendation(rec)" />
            </div>
          </template>
        </pv-card>
      </div>

      <div v-if="analyticsStore.recommendations.length === 0 && !analyticsStore.isAnalyzing" class="col-12 text-center mt-5">
        <i class="pi pi-sparkles text-6xl text-gray-600 mb-3"></i>
        <h3 class="text-gray-500">No hay nuevas recomendaciones de IA por el momento.</h3>
      </div>
    </div>
  </div>
</template>