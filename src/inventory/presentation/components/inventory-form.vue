<script setup>
import { ref } from 'vue';
import { useInventoryStore } from '../../application/inventory.store.js';

/**
 * @summary Componente visual para registrar mermas o salidas de inventario.
 * @author Gustavo Alonso Olivares Lao
 */
const inventoryStore = useInventoryStore();

// Variables reactivas para el formulario
const productId = ref(1); // Simulamos seleccionar el producto con ID 1 (Laptop ASUS)
const quantity = ref(1);
const feedbackMessage = ref('');
const isSuccess = ref(false);

const handleRegistrarMerma = async () => {
  // Ejecutamos la inyección de la lógica del Store
  const result = await inventoryStore.registrarMerma(productId.value, quantity.value);

  feedbackMessage.value = result.message;
  isSuccess.value = result.success;

  // Limpiamos el mensaje después de 3 segundos
  if (result.success) {
    setTimeout(() => {
      feedbackMessage.value = '';
    }, 3000);
  }
};
</script>

<template>
  <div class="p-4 md:p-6 lg:px-8 max-w-screen-md mx-auto">
    <div class="flex align-items-center justify-content-between mb-4">
      <h2 class="text-primary m-0">Control de Inventario</h2>
      <router-link to="/home" style="text-decoration: none;">
        <pv-button label="Volver" icon="pi pi-arrow-left" text />
      </router-link>
    </div>

    <pv-card class="shadow-2 border-round-xl">
      <template #title>
        <div class="text-xl border-bottom-1 surface-border pb-3 mb-3">Registrar Merma de Producto</div>
      </template>

      <template #content>
        <div class="flex flex-column gap-4">
          <!-- Alerta de feedback (simulando un Toast) -->
          <div v-if="feedbackMessage" class="p-3 border-round" :class="isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
            <i :class="isSuccess ? 'pi pi-check-circle' : 'pi pi-times-circle'" class="mr-2"></i>
            {{ feedbackMessage }}
          </div>

          <div class="flex flex-column gap-2">
            <label class="font-bold text-color-secondary">ID del Producto</label>
            <!-- Usamos un input nativo con clases de PrimeFlex para simplificar -->
            <input type="number" v-model="productId" class="p-2 border-1 surface-border border-round text-lg" />
          </div>

          <div class="flex flex-column gap-2">
            <label class="font-bold text-color-secondary">Cantidad a Mermar</label>
            <input type="number" v-model="quantity" min="1" class="p-2 border-1 surface-border border-round text-lg" />
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-content-end mt-4">
          <pv-button
              label="Registrar Merma"
              icon="pi pi-exclamation-triangle"
              severity="warning"
              :loading="inventoryStore.isProcessing"
              @click="handleRegistrarMerma"
          />
        </div>
      </template>
    </pv-card>
  </div>
</template>