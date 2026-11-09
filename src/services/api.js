const BASE_URL = 'https://dummyjson.com';

// A DummyJSON retorna preços em dólar; convertemos para real com uma cotação fixa.
const USD_TO_BRL = 5.5;

// Categorias da DummyJSON usadas pela loja e seus dados em português.
export const CATEGORIES = {
  'mens-shoes': { label: 'Calçados', gender: 'Masculino' },
  'womens-shoes': { label: 'Calçados', gender: 'Feminino' },
  'mens-shirts': { label: 'Camisas', gender: 'Masculino' },
  tops: { label: 'Vestidos', gender: 'Feminino' },
  'womens-bags': { label: 'Bolsas', gender: 'Feminino' },
  sunglasses: { label: 'Óculos', gender: 'Unissex' },
};

const AVAILABILITY = {
  'In Stock': 'Em estoque',
  'Low Stock': 'Estoque baixo',
  'Out of Stock': 'Esgotado',
};

const toBRL = (value) => Math.round(value * USD_TO_BRL * 100) / 100;

export const mapProduct = (p) => {
  const category = CATEGORIES[p.category] ?? { label: p.category, gender: 'Unissex' };
  const price = toBRL(p.price);
  const hasDiscount = p.discountPercentage >= 10;

  return {
    id: p.id,
    name: p.title,
    image: p.thumbnail,
    images: p.images?.length ? p.images : [p.thumbnail],
    price,
    priceDiscount: hasDiscount ? Math.round(price * (1 - p.discountPercentage / 100) * 100) / 100 : undefined,
    brand: p.brand ?? 'Sem marca',
    categorySlug: p.category,
    category: category.label,
    gender: category.gender,
    availability: AVAILABILITY[p.availabilityStatus] ?? p.availabilityStatus,
    reference: p.sku,
    stars: Number(p.rating).toFixed(1),
    rating: p.reviews?.length ?? 0,
    description: p.description,
  };
};

const request = async (path, signal) => {
  const response = await fetch(`${BASE_URL}${path}`, { signal });
  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao buscar ${path}`);
  }
  return response.json();
};

export const getProducts = async (signal) => {
  const responses = await Promise.all(
    Object.keys(CATEGORIES).map((slug) => request(`/products/category/${slug}?limit=0`, signal))
  );
  return responses.flatMap((data) => data.products).map(mapProduct);
};

export const getProduct = async (id, signal) => mapProduct(await request(`/products/${id}`, signal));

export const getRelatedProducts = async (product, signal, limit = 4) => {
  const data = await request(`/products/category/${product.categorySlug}?limit=0`, signal);
  return data.products
    .filter((p) => p.id !== product.id)
    .slice(0, limit)
    .map(mapProduct);
};
