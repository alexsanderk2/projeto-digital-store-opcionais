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
| API                     | Os produtos vêm da [DummyJSON](https://dummyjson.com/docs/products) em tempo real. |

## API

Os produtos são carregados da API pública [DummyJSON](https://dummyjson.com), sem necessidade de chave.

| Uso                     | Endpoint |
| ----------------------- | -------- |
| Listagem e Home         | `GET /products/category/{categoria}` para cada categoria da loja |
| Página do produto       | `GET /products/{id}` |
| Produtos recomendados   | `GET /products/category/{categoria do produto}` |

Categorias usadas: `mens-shoes`, `womens-shoes`, `mens-shirts`, `tops`, `womens-bags` e `sunglasses` (30 produtos no total).

Detalhes da implementação:

- `src/services/api.js` faz as requisições e converte os dados da API para o formato usado pelos componentes (nome, imagem, preço, desconto, marca, categoria etc.).
- `src/hooks/useFetch.js` controla carregamento, erro e cancelamento das requisições (`AbortController`).
- Enquanto carrega, as páginas mostram um indicador; em caso de erro, exibem uma mensagem com o botão **Tentar novamente**.
- As opções dos filtros são montadas a partir dos próprios produtos retornados.

## Tecnologias

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/)
- [DummyJSON](https://dummyjson.com/) (API de produtos)
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
src/
├── assets/                 # SVGs (logos, ícones, setas)
├── components/
│   ├── BuyBox/
│   ├── FilterGroup/
│   ├── Footer/
│   ├── FooterInformations/
│   ├── Gallery/
│   ├── Header/
│   ├── Logo/
│   ├── ProductCard/
│   ├── ProductListing/
│   ├── ProductOptions/
│   ├── Section/
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

- **Header** com logo, campo de busca (Enter ou clique na lupa redireciona para `/products?filter=...`), links *Cadastre-se* / *Entrar*, carrinho e navegação com destaque do link ativo (`NavLink`).
- **Footer** com logo branca, redes sociais e colunas de informações renderizadas dinamicamente.
- **Gallery** com setas (desabilitadas no início/fim), animação de deslize e miniaturas opcionais (`showThumbs`).
- **Section**, **ProductCard** e **ProductListing** reutilizáveis.
- **Listagem de produtos** com ordenação por menor/maior preço e filtros por marca, categoria, gênero e estado; o título mostra o total de produtos encontrados.
- **Visualização do produto** com galeria, BuyBox, opções de tamanho/cor (`ProductOptions`) e produtos recomendados.

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
