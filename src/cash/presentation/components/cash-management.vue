<script setup>
import { ref } from 'vue';
import { useCashStore } from '../../application/cash.store.js';

/**
 * @summary Componente visual para la apertura, cierre y arqueo de caja.
 * @author Gustavo Alonso Olivares Lao
 */
const cashStore = useCashStore();

const amountInput = ref(0);
const feedback = ref('');

const handleAction = async () => {
  let result;
  if (!cashStore.currentSession || cashStore.currentSession.status === 'Cerrada') {
    result = await cashStore.openCash(amountInput.value);
  } else {
    result = await cashStore.closeCash(amountInput.value);
  }

  feedback.value = result.message;
  amountInput.value = 0; // Reiniciar input
  setTimeout(() => feedback.value = '', 4000);
};
</script>

<template>
  <div class="p-4 md:p-6 lg:px-8 max-w-screen-md mx-auto">
    <div class="flex align-items-center justify-content-between mb-4">
      <h2 class="text-primary m-0">Gestión de Caja</h2>
      <router-link to="/home" style="text-decoration: none;">
        <pv-button label="Volver" icon="pi pi-arrow-left" text />
      </router-link>
    </div>

    <pv-card class="shadow-2 border-round-xl">
      <template #title>
        <div class="text-xl border-bottom-1 surface-border pb-3 mb-3">
          Estado Actual:
          <span :class="cashStore.currentSession?.status === 'Abierta' ? 'text-green-500' : 'text-red-500'">
            {{ cashStore.currentSession?.status || 'Cerrada' }}
          </span>
        </div>
      </template>

      <template #content>
        <div v-if="feedback" class="p-3 mb-4 bg-primary text-white border-round text-center font-bold">
          <i class="pi pi-info-circle mr-2"></i>{{ feedback }}
        </div>

        <div class="flex flex-column gap-2 mb-4">
          <label class="font-bold text-color-secondary">
            {{ cashStore.currentSession?.status === 'Abierta' ? 'Monto Real en Caja (Arqueo)' : 'Monto Inicial (Base)' }}
          </label>
          <input type="number" v-model="amountInput" min="0" step="0.1" class="p-2 border-1 surface-border border-round text-lg" />
        </div>

        <div v-if="cashStore.currentSession?.status === 'Abierta'" class="p-3 bg-gray-800 text-white border-round flex justify-content-between">
          <span>Monto Esperado del Sistema:</span>
          <span class="font-bold">S/ {{ cashStore.currentSession.expectedFinalAmount.toFixed(2) }}</span>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-content-end mt-4">
          <pv-button
              :label="cashStore.currentSession?.status === 'Abierta' ? 'Cerrar Caja' : 'Abrir Caja'"
              :icon="cashStore.currentSession?.status === 'Abierta' ? 'pi pi-lock' : 'pi pi-unlock'"
              :severity="cashStore.currentSession?.status === 'Abierta' ? 'danger' : 'success'"
              :loading="cashStore.isProcessing"
              @click="handleAction"
          />
        </div>
      </template>
    </pv-card>
  </div>
</template>