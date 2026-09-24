<script setup>
import { useIamStore } from '../../../iam/application/iam.store.js';
const iamStore = useIamStore();
</script>

<template>
  <div class="min-h-screen surface-ground flex flex-column">
    <!-- Header simple -->
    <div class="flex justify-content-end p-4">
      <pv-button label="Cerrar Sesión" icon="pi pi-sign-out" severity="danger" text @click="iamStore.logout()" />
    </div>

    <!-- Contenido Central -->
    <div class="flex-grow-1 flex flex-column align-items-center justify-content-center pb-8">
      <i class="pi pi-desktop text-primary text-6xl mb-4"></i>
      <h1 class="text-primary m-0">AllenStock AI</h1>
      <p class="text-color-secondary mt-2 mb-2">Bienvenido, {{ iamStore.currentUser?.fullName || 'Usuario' }}</p>
      <p class="text-color-secondary mb-5">Rol: {{ iamStore.currentUser?.role || 'Desconocido' }}</p>

      <div class="flex gap-4 flex-wrap justify-content-center max-w-screen-lg">
        <router-link to="/catalog" style="text-decoration: none;">
          <pv-button label="Catálogo Maestro" icon="pi pi-th-large" size="large" raised />
        </router-link>

        <router-link to="/inventory" style="text-decoration: none;">
          <pv-button label="Gestión de Inventario" icon="pi pi-box" severity="secondary" size="large" raised />
        </router-link>

        <router-link to="/pos" style="text-decoration: none;">
          <pv-button label="Terminal POS" icon="pi pi-shopping-cart" severity="success" size="large" raised />
        </router-link>

        <router-link to="/cash" style="text-decoration: none;">
          <pv-button label="Gestión de Caja" icon="pi pi-wallet" severity="warning" size="large" raised />
        </router-link>

        <router-link to="/analytics" style="text-decoration: none;">
          <pv-button label="Analítica IA" icon="pi pi-bolt" severity="info" size="large" raised />
        </router-link>

        <router-link to="/purchasing" style="text-decoration: none;">
          <pv-button label="Compras y Proveedores" icon="pi pi-truck" severity="help" size="large" raised />
        </router-link>

        <!-- Botón de Promociones uniformizado con el resto del UI -->
        <router-link to="/promotions" style="text-decoration: none;">
          <pv-button label="Historial Promociones" icon="pi pi-tags" severity="danger" size="large" raised />
        </router-link>
      </div>
    </div>
  </div>
</template>