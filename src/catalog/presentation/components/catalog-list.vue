<template>
  <div class="p-4">
    <!-- Cabecera -->
    <div class="flex justify-content-between align-items-center mb-4">
      <h2 class="text-2xl font-bold m-0 text-primary">Catálogo Maestro</h2>
      <router-link to="/home" style="text-decoration: none;">
        <pv-button label="Volver al Inicio" icon="pi pi-arrow-left" severity="secondary" outlined />
      </router-link>
    </div>

    <Card class="shadow-2 border-round-xl">
      <template #content>
        <TabView>
          <!-- PESTAÑA 1: PRODUCTOS -->
          <TabPanel header="Productos">
            <div class="flex justify-content-end mb-3">
              <pv-button label="Nuevo Producto" icon="pi pi-plus" severity="success" @click="openProductModal()" />
            </div>
            <DataTable :value="store.products" :loading="store.isLoading" paginator :rows="5" stripedRows responsiveLayout="scroll">
              <Column header="Imagen">
                <template #body="slotProps">
                  <img :src="slotProps.data.imagen_url || 'https://via.placeholder.com/50'" alt="img" class="w-4rem h-4rem border-round shadow-1" style="object-fit: cover;" />
                </template>
              </Column>
              <Column field="sku" header="SKU" sortable></Column>
              <Column field="nombre" header="Nombre" sortable></Column>
              <Column field="categoria_nombre" header="Categoría" sortable></Column>
              <Column field="precio" header="Precio">
                <template #body="slotProps">S/ {{ slotProps.data.precio.toFixed(2) }}</template>
              </Column>
              <Column field="stock_actual" header="Stock"></Column>
              <Column header="Acciones">
                <template #body="slotProps">
                  <pv-button icon="pi pi-pencil" severity="info" text rounded @click="editProduct(slotProps.data)" />
                  <pv-button icon="pi pi-trash" severity="danger" text rounded @click="deleteProduct(slotProps.data.id)" />
                </template>
              </Column>
            </DataTable>
          </TabPanel>

          <!-- PESTAÑA 2: CATEGORÍAS -->
          <TabPanel header="Categorías">
            <div class="flex justify-content-end mb-3">
              <pv-button label="Nueva Categoría" icon="pi pi-plus" severity="success" @click="openCategoryModal()" />
            </div>
            <DataTable :value="store.categories" :loading="store.isLoading" paginator :rows="5" stripedRows responsiveLayout="scroll">
              <Column field="id" header="ID" sortable></Column>
              <Column field="nombre" header="Nombre" sortable></Column>
              <Column field="descripcion" header="Descripción"></Column>
              <Column header="Estado">
                <template #body="slotProps">
                  <Tag :severity="slotProps.data.activo ? 'success' : 'danger'">
                    {{ slotProps.data.activo ? 'Activo' : 'Inactivo' }}
                  </Tag>
                </template>
              </Column>
              <Column header="Acciones">
                <template #body="slotProps">
                  <pv-button icon="pi pi-pencil" severity="info" text rounded @click="editCategory(slotProps.data)" />
                  <pv-button icon="pi pi-trash" severity="danger" text rounded @click="deleteCategory(slotProps.data.id)" />
                </template>
              </Column>
            </DataTable>
          </TabPanel>
        </TabView>
      </template>
    </Card>

    <!-- MODAL PRODUCTO -->
    <Dialog v-model:visible="showProductModal" :header="isEditing ? 'Editar Producto' : 'Nuevo Producto'" modal class="p-fluid" style="width: 450px">
      <div class="field mt-3">
        <label>Nombre del Producto</label>
        <InputText v-model="productForm.nombre" required autofocus />
      </div>
      <div class="formgrid grid">
        <div class="field col-6">
          <label>SKU</label>
          <InputText v-model="productForm.sku" required />
        </div>
        <div class="field col-6">
          <label>Categoría</label>
          <Dropdown v-model="productForm.categoria_id" :options="store.categories" optionLabel="nombre" optionValue="id" placeholder="Seleccione" />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-6">
          <label>Precio (S/)</label>
          <InputNumber v-model="productForm.precio" mode="decimal" :minFractionDigits="2" />
        </div>
        <div class="field col-6">
          <label>Stock Inicial</label>
          <InputNumber v-model="productForm.stock_actual" showButtons :min="0" />
        </div>
      </div>
      <div class="field">
        <label>URL de la Imagen</label>
        <InputText v-model="productForm.imagen_url" placeholder="https://..." />
      </div>
      <template #footer>
        <pv-button label="Cancelar" icon="pi pi-times" text @click="showProductModal = false" />
        <pv-button label="Guardar" icon="pi pi-check" @click="saveProduct" />
      </template>
    </Dialog>

    <!-- MODAL CATEGORÍA -->
    <Dialog v-model:visible="showCategoryModal" :header="isEditing ? 'Editar Categoría' : 'Nueva Categoría'" modal class="p-fluid" style="width: 400px">
      <div class="field mt-3">
        <label>Nombre</label>
        <InputText v-model="categoryForm.nombre" required autofocus />
      </div>
      <div class="field">
        <label>Descripción</label>
        <Textarea v-model="categoryForm.descripcion" rows="3" />
      </div>
      <template #footer>
        <pv-button label="Cancelar" icon="pi pi-times" text @click="showCategoryModal = false" />
        <pv-button label="Guardar" icon="pi pi-check" @click="saveCategory" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCatalogStore } from '../../application/catalog.store';
import Card from 'primevue/card';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';

const store = useCatalogStore();

// --- ESTADO LOCAL MODALES ---
const showProductModal = ref(false);
const showCategoryModal = ref(false);
const isEditing = ref(false);
const currentId = ref(null);

const productForm = ref({ nombre: '', sku: '', precio: 0, stock_actual: 0, imagen_url: '', categoria_id: null });
const categoryForm = ref({ nombre: '', descripcion: '', activo: true });

onMounted(async () => {
  await store.fetchData();
});

// --- LÓGICA PRODUCTOS ---
const openProductModal = () => {
  isEditing.value = false;
  productForm.value = { nombre: '', sku: '', precio: 0, stock_actual: 0, imagen_url: '', categoria_id: null };
  showProductModal.value = true;
};

const editProduct = (prod) => {
  isEditing.value = true;
  currentId.value = prod.id;
  productForm.value = { ...prod };
  showProductModal.value = true;
};

const saveProduct = async () => {
  try {
    if (isEditing.value) await store.service.updateProduct(currentId.value, productForm.value);
    else await store.service.createProduct(productForm.value);
    await store.fetchData();
    showProductModal.value = false;
  } catch (e) { console.error(e); }
};

const deleteProduct = async (id) => {
  if (confirm('¿Estás seguro de eliminar este producto?')) {
    await store.service.deleteProduct(id);
    await store.fetchData();
  }
};

// --- LÓGICA CATEGORÍAS ---
const openCategoryModal = () => {
  isEditing.value = false;
  categoryForm.value = { nombre: '', descripcion: '', activo: true };
  showCategoryModal.value = true;
};

const editCategory = (cat) => {
  isEditing.value = true;
  currentId.value = cat.id;
  categoryForm.value = { ...cat };
  showCategoryModal.value = true;
};

const saveCategory = async () => {
  try {
    if (isEditing.value) await store.service.updateCategory(currentId.value, categoryForm.value);
    else await store.service.createCategory(categoryForm.value);
    await store.fetchData();
    showCategoryModal.value = false;
  } catch (e) { console.error(e); }
};

const deleteCategory = async (id) => {
  if (confirm('¿Estás seguro de eliminar esta categoría? Asegúrate de que no tenga productos asignados.')) {
    try {
      await store.service.deleteCategory(id);
      await store.fetchData();
    } catch (e) { alert('No se puede eliminar: ' + e.response.data.error); }
  }
};
</script>