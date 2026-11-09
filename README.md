# Digital Store (opcionais)

Projeto de e-commerce **Drip Store / Digital Store** desenvolvido em React como parte do curso da Digital College, seguindo os requisitos de [projeto-digital-store](https://github.com/digitalcollegebr/projeto-digital-store) e o layout do Figma.

Esta versão parte da entrega principal ([alexsanderk2/projeto-digital-store](https://github.com/alexsanderk2/projeto-digital-store)) e adiciona as recomendações opcionais.

**Deploy:** https://projeto-digital-store-opcionais.vercel.app/

## Opcionais entregues

| Recomendação            | Como foi atendida |
| ----------------------- | ----------------- |
| Deploy                  | Publicado na Vercel (`vercel.json` com rewrite de SPA para as rotas do React Router). |
| README                  | Este documento, com instruções para rodar, rotas, estrutura e detalhes da API. |
| Pull Request            | As alterações deste README foram integradas via Pull Request. |
| Funcionalidades visuais | Ordenar e Filtrar funcionam de verdade: ordenação por preço e filtros por marca, categoria, gênero e disponibilidade. |
| API                     | Os produtos vêm de uma API própria (`/api/products`), publicada como funções na Vercel. |

## API

A loja consome uma API própria, criada na pasta `api/` e publicada como funções (serverless) na Vercel. No `npm run dev` e no `npm run preview`, um plugin do Vite serve as mesmas rotas, então não é preciso rodar nada além do Vite.

| Uso                     | Endpoint |
| ----------------------- | -------- |
| Listagem e Home         | `GET /api/products` |
| Filtros opcionais       | `GET /api/products?type=Tênis&q=nike&exclude=3&limit=4` |
| Página do produto       | `GET /api/products/{id}` (404 se não existir) |
| Produtos relacionados   | `GET /api/products?type={tipo}&exclude={id}&limit=4` |

O catálogo (`api/_catalog.js`) tem 25 produtos nos tipos do layout do Figma: **Camisetas, Calças, Bonés, Headphones e Tênis**, com marca, categoria (Casual, Corrida, Esporte e lazer, Utilitário), gênero e estado (Novo/Usado), os mesmos filtros da página de listagem.

Imagens dos produtos:

- **Tênis:** fotos do próprio projeto (`public/product-thumb-*` e `public/product-image-*`).
- **Calças, Bonés e Headphones:** ilustrações em SVG criadas para o projeto (`public/catalogo/`).
- **Camisetas, um headphone e os tênis do banner da Home:** imagens da CDN da [DummyJSON](https://dummyjson.com).

Detalhes da implementação no front-end:

- `src/services/api.js` faz as requisições para a API.
- `src/hooks/useFetch.js` controla carregamento, erro e cancelamento das requisições (`AbortController`).
- Enquanto carrega, as páginas mostram um indicador; em caso de erro, exibem uma mensagem com o botão **Tentar novamente**.
- As opções dos filtros são montadas a partir dos próprios produtos retornados.

## Tecnologias

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/)
- Vercel Functions (API própria de produtos)
- [Vercel](https://vercel.com/) (deploy)
- CSS puro com variáveis (paleta de cores do projeto)

## Como executar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

Outros scripts:

- `npm run build`: gera a versão de produção em `dist/`
- `npm run preview`: serve a versão de produção localmente
- `npm run lint`: executa o ESLint

## Rotas

| Rota            | Página                                   |
| --------------- | ---------------------------------------- |
| `/`             | Página inicial                           |
| `/products`     | Listagem de produtos (aceita `?filter=`) |
| `/produtos`     | Alias da listagem de produtos            |
| `/product/:id`  | Visualização do produto                  |

## Estrutura

```
api/                        # API própria (funções da Vercel)
├── _catalog.js             # Catálogo de produtos e funções de busca
└── products/
    ├── index.js            # GET /api/products
    └── [id].js             # GET /api/products/:id
public/
└── catalogo/               # Ilustrações SVG (calça, boné, headphone)
src/
├── assets/                 # SVGs (logos, ícones, setas)
├── components/
│   ├── BuyBox/
│   ├── CategoryIcons/      # Ícones de categorias da Home
│   ├── CollectionCards/    # Cards das coleções em destaque
│   ├── FilterGroup/
│   ├── Footer/
│   ├── FooterInformations/
│   ├── Gallery/
│   ├── Header/             # Inclui menu hambúrguer e busca do celular
│   ├── HeroBanner/         # Banner principal da Home
│   ├── Logo/
│   ├── ProductCard/
│   ├── ProductListing/
│   ├── ProductOptions/
│   ├── Section/
│   ├── SpecialOffer/       # Bloco "Oferta especial"
│   └── Status/             # Carregando / erro
├── hooks/                  # useFetch
├── pages/
│   ├── HomePage/
│   ├── Layout/
│   ├── NotFoundPage/
│   ├── ProductListingPage/
│   └── ProductViewPage/
├── services/               # Integração com a API
├── utils/
├── App.jsx                 # Definição das rotas
└── main.jsx
```

## Funcionalidades

Layout baseado no Figma do projeto, nas versões desktop e celular.

- **Header** com logo, campo de busca (Enter ou clique na lupa redireciona para `/products?filter=...`), links *Cadastre-se* / *Entrar*, carrinho e navegação com destaque do link ativo (`NavLink`). No celular, menu hambúrguer com gaveta lateral e busca que abre pelo ícone.
- **Home** com banner rotativo, coleções em destaque, ícones de categorias, produtos em alta e bloco de oferta especial.
- **Footer** com logo branca, redes sociais e colunas de informações renderizadas dinamicamente.
- **Gallery** com setas (desabilitadas no início/fim), animação de deslize e miniaturas opcionais (`showThumbs`).
- **Section**, **ProductCard** e **ProductListing** reutilizáveis.
- **Listagem de produtos** com ordenação (mais relevantes, menor e maior preço) e filtros por marca, categoria, gênero e estado. No celular, os filtros abrem numa gaveta.
- **Visualização do produto** com galeria, BuyBox, opções de tamanho/cor (`ProductOptions`) e produtos relacionados.

## Paleta de cores

| Nome         | Cor       |
| ------------ | --------- |
| primary      | `#C92071` |
| secondary    | `#B5B6F2` |
| tertiary     | `#991956` |
| error        | `#EE4266` |
| success      | `#52CA76` |
| warning      | `#F6AA1C` |
| dark-gray    | `#1F1F1F` |
| dark-gray-2  | `#474747` |
| dark-gray-3  | `#666666` |
| light-gray   | `#8F8F8F` |
| light-gray-2 | `#CCCCCC` |
| light-gray-3 | `#F5F5F5` |
| white        | `#FFFFFF` |
