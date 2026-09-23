<script setup>
import { ref } from 'vue';
import { useIamStore } from '../../application/iam.store.js';

/**
 * @summary Pantalla de inicio de sesión del sistema.
 * @author Gustavo Alonso Olivares Lao
 */
const iamStore = useIamStore();
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
  errorMessage.value = '';
  if (!email.value || !password.value) {
    errorMessage.value = 'Por favor, complete todos los campos.';
    return;
  }

  const result = await iamStore.login(email.value, password.value);
  if (!result.success) {
    errorMessage.value = result.message;
  }
};
</script>

<template>
  <div class="h-screen flex align-items-center justify-content-center surface-ground">
    <pv-card class="shadow-4 border-round-xl" style="width: 100%; max-width: 400px;">
      <template #title>
        <div class="text-center mb-3">
          <i class="pi pi-desktop text-primary text-5xl mb-3"></i>
          <h2 class="text-primary m-0">AllenStock AI</h2>
          <span class="text-sm text-color-secondary">Acceso Seguro</span>
        </div>
      </template>

      <template #content>
        <div v-if="errorMessage" class="p-2 mb-3 bg-red-100 text-red-700 border-round text-center text-sm">
          {{ errorMessage }}
        </div>

        <div class="flex flex-column gap-4">
          <div class="flex flex-column gap-2">
            <label class="font-bold text-color-secondary">Correo Electrónico</label>
            <input type="email" v-model="email" class="p-3 border-1 surface-border border-round" placeholder="admin@allentech.com" @keyup.enter="handleLogin" />
          </div>

          <div class="flex flex-column gap-2">
            <label class="font-bold text-color-secondary">Contraseña</label>
            <input type="password" v-model="password" class="p-3 border-1 surface-border border-round" placeholder="********" @keyup.enter="handleLogin" />
          </div>
        </div>
      </template>

      <template #footer>
        <pv-button
            label="Iniciar Sesión"
            icon="pi pi-sign-in"
            class="w-full h-3rem mt-3"
            :loading="iamStore.isAuthenticating"
            @click="handleLogin"
        />
      </template>
    </pv-card>
  </div>
</template>