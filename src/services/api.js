// Consome a API própria da loja (pasta /api), publicada como funções na Vercel.
const BASE_URL = '/api';

const request = async (path, signal) => {
  const response = await fetch(`${BASE_URL}${path}`, { signal });
  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao buscar ${path}`);
  }
  return response.json();
};

export const getProducts = async (signal) => (await request('/products', signal)).products;

export const getProduct = (id, signal) => request(`/products/${id}`, signal);

export const getRelatedProducts = async (product, signal, limit = 4) => {
  const params = new URLSearchParams({ type: product.type, exclude: product.id, limit });
  return (await request(`/products?${params}`, signal)).products;
};
