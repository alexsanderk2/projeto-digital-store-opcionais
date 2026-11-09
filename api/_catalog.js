// Catálogo da Digital Store servido pela API própria (/api/products).
// Arquivos com "_" no início não viram rotas na Vercel.

const DJ = 'https://cdn.dummyjson.com/product-images';

const shoeGallery = (main) => [main, ...[1, 2, 3, 4, 5].map((n) => `/product-image-${n}.jpeg`)];

const DESCRIPTIONS = {
  Tênis:
    'Tênis confortável e resistente, com cabedal respirável, entressola macia e solado de borracha com ótima aderência. Ideal para o dia a dia e para atividades físicas leves.',
  Camisetas:
    'Peça em tecido macio e respirável, com caimento confortável e acabamento reforçado nas costuras. Combina com looks casuais e dura muitas lavagens.',
  Calças:
    'Calça jeans com tecido encorpado e um toque de elastano para mais conforto. Cinco bolsos, costuras contrastantes e lavagem que valoriza o visual.',
  Bonés:
    'Boné com aba curva, ajuste traseiro e ilhoses de ventilação. Protege do sol com estilo e combina com qualquer produção.',
  Headphones:
    'Headphone com som equilibrado, graves marcantes e almofadas macias para longas horas de uso. Conexão sem fio e bateria de longa duração.',
};

// [nome, tipo, marca, categoria, gênero, estado, preço, preço com desconto, imagem, galeria?]
const RAW = [
  ['Air Jordan 1 Mid', 'Tênis', 'Nike', 'Casual', 'Masculino', 'Novo', 899.99, 629.99, '/product-thumb-1.jpeg'],
  ['Air Jordan 1 Retro High', 'Tênis', 'Nike', 'Casual', 'Unissex', 'Novo', 1199.99, null, '/product-thumb-2.jpeg'],
  ['Puma Suede Classic', 'Tênis', 'Puma', 'Casual', 'Masculino', 'Usado', 349.99, 279.99, '/product-thumb-3.jpeg'],
  ['K-Swiss V8 - Masculino', 'Tênis', 'K-Swiss', 'Corrida', 'Masculino', 'Novo', 200, 100, '/product-thumb-4.jpeg'],
  ['Nike Air Zoom Pegasus', 'Tênis', 'Nike', 'Corrida', 'Feminino', 'Novo', 799.99, 599.99, '/product-thumb-5.jpeg'],
  ['Air Jordan 1 Low Verde', 'Tênis', 'Nike', 'Esporte e lazer', 'Masculino', 'Novo', 749.99, null, '/product-image-1.jpeg'],
  ['Nike Court Vision', 'Tênis', 'Nike', 'Casual', 'Feminino', 'Novo', 499.99, 399.99, '/product-image-2.jpeg'],
  ['Nike Air Max 90', 'Tênis', 'Nike', 'Esporte e lazer', 'Unissex', 'Usado', 699.99, null, '/product-image-3.jpeg'],
  ['Adidas Originals Campus', 'Tênis', 'Adidas', 'Casual', 'Unissex', 'Novo', 599.99, 479.99, '/product-image-4.jpeg'],
  ['Adidas Runfalcon 3.0', 'Tênis', 'Adidas', 'Corrida', 'Feminino', 'Novo', 349.99, null, '/product-image-5.jpeg'],

  ['Camiseta Gamer Aorus', 'Camisetas', 'Supreme', 'Casual', 'Masculino', 'Novo', 129.99, 89.99, `${DJ}/mens-shirts/gigabyte-aorus-men-tshirt/thumbnail.webp`, 'gigabyte-aorus-men-tshirt'],
  ['Camisa Floral Manga Curta', 'Camisetas', 'Adidas', 'Casual', 'Masculino', 'Novo', 159.99, null, `${DJ}/mens-shirts/man-short-sleeve-shirt/thumbnail.webp`, 'man-short-sleeve-shirt'],
  ['Camisa Xadrez Azul e Preta', 'Camisetas', 'Puma', 'Utilitário', 'Masculino', 'Usado', 179.99, 139.99, `${DJ}/mens-shirts/blue-&-black-check-shirt/thumbnail.webp`, 'blue-&-black-check-shirt'],
  ['Camisa Xadrez Vermelha', 'Camisetas', 'Supreme', 'Casual', 'Unissex', 'Novo', 189.99, null, `${DJ}/mens-shirts/man-plaid-shirt/thumbnail.webp`, 'man-plaid-shirt'],
  ['Camisa Xadrez Verde', 'Camisetas', 'Nike', 'Utilitário', 'Masculino', 'Novo', 169.99, 119.99, `${DJ}/mens-shirts/men-check-shirt/thumbnail.webp`, 'men-check-shirt'],

  ['Calça Jeans Slim', 'Calças', 'Levi\'s', 'Casual', 'Masculino', 'Novo', 299.99, 229.99, '/catalogo/calca-jeans.svg'],
  ['Calça Jeans Reta', 'Calças', 'Levi\'s', 'Utilitário', 'Unissex', 'Novo', 279.99, null, '/catalogo/calca-jeans.svg'],
  ['Calça Jeans Skinny', 'Calças', 'Adidas', 'Casual', 'Feminino', 'Usado', 249.99, 179.99, '/catalogo/calca-jeans.svg'],

  ['Boné Aba Curva Preto', 'Bonés', 'Nike', 'Esporte e lazer', 'Unissex', 'Novo', 129.99, 99.99, '/catalogo/bone.svg'],
  ['Boné Classic', 'Bonés', 'Puma', 'Casual', 'Unissex', 'Novo', 109.99, null, '/catalogo/bone.svg'],
  ['Boné Trucker', 'Bonés', 'New Era', 'Utilitário', 'Masculino', 'Usado', 149.99, 119.99, '/catalogo/bone.svg'],

  ['Headphone Studio Pro', 'Headphones', 'Beats', 'Esporte e lazer', 'Unissex', 'Novo', 2499.99, 1999.99, '/catalogo/headphone.svg'],
  ['Headphone Solo Wireless', 'Headphones', 'Beats', 'Casual', 'Unissex', 'Novo', 1299.99, null, '/catalogo/headphone.svg'],
  ['AirPods Max Prata', 'Headphones', 'Apple', 'Casual', 'Unissex', 'Novo', 4999.99, 4299.99, `${DJ}/mobile-accessories/apple-airpods-max-silver/1.webp`],
  ['Headphone Bass Boost', 'Headphones', 'Beats', 'Esporte e lazer', 'Unissex', 'Usado', 899.99, 649.99, '/catalogo/headphone.svg'],
];

const galleryFor = (type, image, djSlug) => {
  if (type === 'Tênis') return shoeGallery(image);
  if (djSlug) return [1, 2, 3, 4].map((n) => `${DJ}/mens-shirts/${djSlug}/${n}.webp`);
  return [image];
};

export const products = RAW.map(
  ([name, type, brand, category, gender, state, price, priceDiscount, image, djSlug], index) => {
    const id = index + 1;
    return {
      id,
      name,
      type,
      brand,
      category,
      gender,
      state,
      price,
      priceDiscount: priceDiscount ?? undefined,
      image,
      images: galleryFor(type, image, djSlug),
      reference: `${String(38416 + id * 7).padStart(6, '0')}`,
      stars: (4 + ((id * 3) % 10) / 10).toFixed(1),
      rating: 40 + ((id * 37) % 160),
      description: DESCRIPTIONS[type],
    };
  }
);

const normalize = (text) =>
  String(text).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export const findProducts = ({ type, q, exclude, limit } = {}) => {
  let list = products;
  if (type) list = list.filter((p) => normalize(p.type) === normalize(type));
  if (q) {
    const term = normalize(q);
    list = list.filter((p) => normalize(`${p.name} ${p.type} ${p.brand} ${p.category}`).includes(term));
  }
  if (exclude) list = list.filter((p) => String(p.id) !== String(exclude));
  if (limit) list = list.slice(0, Number(limit));
  return list;
};

export const findProduct = (id) => products.find((p) => String(p.id) === String(id));

// Respostas compatíveis com Vercel Functions e com o middleware do Vite
export const sendJson = (res, status, body) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600');
  res.end(JSON.stringify(body));
};

export const getUrl = (req) => new URL(req.url, 'http://localhost');
