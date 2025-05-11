import axios from 'axios';

const API_BASE = 'https://itx-frontend-test.onrender.com/api';
/** Servicio para llamar a distintos endpoints */
export async function getProducts() {
  const { data } = await axios.get(`${API_BASE}/product`);
  return data;
}

export async function getProductDetails(id) {
  const { data } = await axios.get(`${API_BASE}/product/${id}`);
  return data;
}

export async function addToCart({ id, colorCode, storageCode }) {
  const { data } = await axios.post(`${API_BASE}/cart`, {
    id,
    colorCode,
    storageCode,
  });
  return data.count;
}