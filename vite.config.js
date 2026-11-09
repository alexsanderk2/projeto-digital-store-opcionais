import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import listProducts from './api/products/index.js'
import getProduct from './api/products/[id].js'

// Serve a mesma API das funções da Vercel (pasta /api) no `npm run dev` e no `npm run preview`
const localApi = () => {
  const middleware = (req, res, next) => {
    const { pathname } = new URL(req.url, 'http://localhost')
    if (pathname === '/api/products' || pathname === '/api/products/') return listProducts(req, res)
    if (/^\/api\/products\/[^/]+$/.test(pathname)) return getProduct(req, res)
    return next()
  }

  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localApi()],
})
