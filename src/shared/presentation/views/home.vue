<script setup>
/**
 * @summary Vista principal temporal para verificar la configuración.
 * @author Gustavo Alonso Olivares Lao
 */
</script>

<template>
  <div class="min-h-screen surface-ground flex flex-column align-items-center justify-content-center">
    <i class="pi pi-desktop text-primary text-6xl mb-4"></i>
    <h1 class="text-primary m-0">AllenStock AI</h1>
    <p class="text-color-secondary mt-2 mb-5">Sistema POS e Inventario Inteligente (Setup Completo)</p>

    <div class="flex gap-4 flex-wrap justify-content-center">
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
    </div>
  </div>
</template>