import axios from 'axios';

const API_URL = 'http://localhost:5271/api/v1/catalog';

export class CatalogService {
    // --- Categorías ---
    async getCategories() { return await axios.get(`${API_URL}/categories`); }
    async createCategory(dto) { return await axios.post(`${API_URL}/categories`, dto); }
    async updateCategory(id, dto) { return await axios.put(`${API_URL}/categories/${id}`, dto); }
    async deleteCategory(id) { return await axios.delete(`${API_URL}/categories/${id}`); }

    // --- Productos ---
    async getProducts() { return await axios.get(`${API_URL}/products`); }
    async createProduct(dto) { return await axios.post(`${API_URL}/products`, dto); }
    async updateProduct(id, dto) { return await axios.put(`${API_URL}/products/${id}`, dto); }
    async deleteProduct(id) { return await axios.delete(`${API_URL}/products/${id}`); }
}