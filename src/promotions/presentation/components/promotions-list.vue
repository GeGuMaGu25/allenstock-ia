<script setup>
import { onMounted } from 'vue';
import { usePromotionsStore } from '../../application/promotions.store';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Card from 'primevue/card';
import Tag from 'primevue/tag';

const promotionsStore = usePromotionsStore();

// Cuando el componente carga en pantalla, pedimos los datos al backend
onMounted(async () => {
  await promotionsStore.fetchActivePromotions();
});
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4 text-primary">Historial de Promociones IA</h2>

    <Card class="shadow-2 border-round-xl">
      <template #content>
        <DataTable
            :value="promotionsStore.activePromotions"
            :loading="promotionsStore.isLoading"
            paginator
            :rows="5"
            dataKey="id"
            stripedRows
            responsiveLayout="scroll"
            emptyMessage="No hay promociones activas en este momento."
        >
          <Column field="id" header="ID" sortable style="width: 5%"></Column>

          <Column field="nombre_producto" header="Producto Afectado" sortable style="width: 20%">
            <template #body="slotProps">
              <span class="font-semibold">{{ slotProps.data.nombre_producto }}</span>
            </template>
          </Column>

          <Column field="porcentaje_descuento" header="Descuento" sortable style="width: 15%">
            <template #body="slotProps">
              <Tag severity="success" class="text-lg">
                {{ slotProps.data.porcentaje_descuento }}%
              </Tag>
            </template>
          </Column>

          <Column field="justificacion_ia" header="Justificación (IA)" style="width: 40%">
            <template #body="slotProps">
              <p class="m-0 text-sm text-color-secondary font-italic">
                "{{ slotProps.data.justificacion_ia }}"
              </p>
            </template>
          </Column>

          <Column field="fecha_creacion" header="Fecha de Aprobación" sortable style="width: 20%"></Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>