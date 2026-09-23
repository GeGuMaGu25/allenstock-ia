<script setup>
import { ref } from 'vue';
import { useSalesStore } from '../../application/sales.store.js';

/**
 * @summary Interfaz principal del Punto de Venta (Terminal del Cajero).
 * @author Gustavo Alonso Olivares Lao
 */
const salesStore = useSalesStore();
const feedback = ref('');

// Productos rápidos simulados para el POS
const quickProducts = [
  { id: 1, nombre: 'Laptop ASUS', precio: 1500.00 },
  { id: 2, nombre: 'Teclado Mecánico', precio: 85.50 },
  { id: 3, nombre: 'Mouse Wireless', precio: 45.00 }
];

const handleCheckout = async () => {
  if (salesStore.cart.length === 0) return;
  const result = await salesStore.processSale();
  feedback.value = result.message;
  setTimeout(() => feedback.value = '', 3000);
};
</script>

<template>
  <div class="p-4 h-screen flex flex-column">
    <div class="flex align-items-center justify-content-between mb-3 border-bottom-1 surface-border pb-2">
      <h2 class="text-primary m-0">Terminal POS</h2>
      <router-link to="/home" style="text-decoration: none;">
        <pv-button label="Cerrar Caja" icon="pi pi-sign-out" severity="danger" text />
      </router-link>
    </div>

    <div class="grid flex-grow-1">
      <!-- Panel Izquierdo: Productos -->
      <div class="col-12 md:col-7 lg:col-8 p-3 border-right-1 surface-border">
        <h3 class="mt-0 text-color-secondary">Accesos Rápidos</h3>
        <div class="flex gap-3 flex-wrap">
          <pv-button
              v-for="prod in quickProducts" :key="prod.id"
              :label="prod.nombre"
              icon="pi pi-plus"
              class="h-5rem w-12rem shadow-2"
              outlined
              @click="salesStore.addToCart(prod)"
          />
        </div>
      </div>

      <!-- Panel Derecho: Ticket -->
      <div class="col-12 md:col-5 lg:col-4 p-3 flex flex-column bg-gray-900 border-round-xl shadow-2">
        <h3 class="mt-0 text-white border-bottom-1 border-gray-700 pb-2">Ticket Actual</h3>

        <div class="flex-grow-1 overflow-y-auto mb-3">
          <div v-if="salesStore.cart.length === 0" class="text-gray-500 text-center mt-5">
            Carrito vacío
          </div>
          <div v-for="item in salesStore.cart" :key="item.productId" class="flex justify-content-between align-items-center mb-2 text-white">
            <span>{{ item.quantity }}x {{ item.name }}</span>
            <span class="font-bold">S/ {{ item.subtotal.toFixed(2) }}</span>
          </div>
        </div>

        <div v-if="feedback" class="p-2 mb-3 bg-green-900 text-green-300 border-round text-center">
          {{ feedback }}
        </div>

        <div class="border-top-1 border-gray-700 pt-3">
          <div class="flex justify-content-between text-xl text-white font-bold mb-3">
            <span>TOTAL:</span>
            <span>S/ {{ salesStore.total.toFixed(2) }}</span>
          </div>
          <pv-button
              label="Cobrar (VentaCompletada)"
              icon="pi pi-check"
              class="w-full h-4rem text-xl"
              severity="success"
              :loading="salesStore.isProcessing"
              @click="handleCheckout"
          />
        </div>
      </div>
    </div>
  </div>
</template>