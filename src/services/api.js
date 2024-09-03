import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_URL,
});

// Products
export const addProduct = (productData) => api.post('/product', productData);
export const updateProduct = (id, productData) => api.put(`/product/${id}`, productData);
export const deleteProduct = (id) => api.delete(`/product/${id}`);
export const getProducts = () => api.get('/products');

// Categories
export const addCategory = (categoryData) => api.post('/category', categoryData);
// export const getCategories = () => api.get('/categories');

// Subcategories
export const addSubcategory = (subcategoryData) => api.post('/subcategory', subcategoryData);
export const getSubcategories = () => api.get('/subcategories');
