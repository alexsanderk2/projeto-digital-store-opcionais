import { findProduct, sendJson, getUrl } from '../_catalog.js';

// GET /api/products/:id
export default function handler(req, res) {
  if (req.method !== 'GET') return sendJson(res, 405, { error: 'Método não permitido' });

  const id = req.query?.id ?? getUrl(req).pathname.split('/').pop();
  const product = findProduct(id);
  if (!product) return sendJson(res, 404, { error: 'Produto não encontrado' });
  return sendJson(res, 200, product);
}
