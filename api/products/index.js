import { findProducts, sendJson, getUrl } from '../_catalog.js';

// GET /api/products?type=Tênis&q=nike&exclude=3&limit=4
export default function handler(req, res) {
  if (req.method !== 'GET') return sendJson(res, 405, { error: 'Método não permitido' });

  const params = Object.fromEntries(getUrl(req).searchParams);
  const products = findProducts(params);
  return sendJson(res, 200, { products, total: products.length });
}
