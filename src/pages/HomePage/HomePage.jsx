import Layout from '../Layout/Layout';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import Section from '../../components/Section/Section';
import CollectionCards from '../../components/CollectionCards/CollectionCards';
import CategoryIcons from '../../components/CategoryIcons/CategoryIcons';
import ProductListing from '../../components/ProductListing/ProductListing';
import SpecialOffer from '../../components/SpecialOffer/SpecialOffer';
import { Loading, ErrorMessage } from '../../components/Status/Status';
import useFetch from '../../hooks/useFetch';
import { getProducts } from '../../services/api';
import './HomePage.css';

const CDN = 'https://cdn.dummyjson.com/product-images/mens-shoes';

const slides = [
  {
    subtitle: 'Melhores ofertas personalizadas',
    title: 'Queima de estoque Nike 🔥',
    description: 'Consequat culpa exercitation mollit nisi excepteur do do tempor laboris eiusmod irure consectetur.',
    image: `${CDN}/nike-air-jordan-1-red-and-black/2.webp`,
    alt: 'Tênis Nike Air Jordan 1 vermelho e preto',
    link: '/product/88',
  },
  {
    subtitle: 'Lançamento',
    title: 'Coleção Off White 🤍',
    description: 'Estilo urbano com conforto para o dia a dia. Garanta já o seu antes que acabe.',
    image: `${CDN}/sports-sneakers-off-white-&-red/1.webp`,
    alt: 'Tênis Off White branco e vermelho',
    link: '/product/91',
  },
  {
    subtitle: 'Mais vendidos',
    title: 'Puma Future Rider ⚡',
    description: 'Cores vibrantes e leveza para acompanhar o seu ritmo, do treino ao passeio.',
    image: `${CDN}/puma-future-rider-trainers/2.webp`,
    alt: 'Tênis Puma Future Rider colorido',
    link: '/product/90',
  },
  {
    subtitle: 'Esporte',
    title: 'Pronto para o jogo ⚾',
    description: 'Aderência e estabilidade para quem não para. Confira as chuteiras Nike.',
    image: `${CDN}/nike-baseball-cleats/2.webp`,
    alt: 'Chuteira Nike branca e verde',
    link: '/product/89',
  },
];

const collections = [
  { image: '/collection-1.png', alt: 'Novo drop Supreme', discount: '30% OFF', link: '/products?filter=Camisas' },
  { image: '/collection-2.png', alt: 'Coleção Adidas', discount: '30% OFF', link: '/products?filter=Calçados' },
  { image: '/collection-3.png', alt: 'Novo Beats Bass', discount: '30% OFF', link: '/products' },
];

const categories = [
  { label: 'Camisas', icon: 'shirt', link: '/products?filter=Camisas' },
  { label: 'Vestidos', icon: 'dress', link: '/products?filter=Vestidos' },
  { label: 'Calçados', icon: 'shoe', link: '/products?filter=Calçados' },
  { label: 'Bolsas', icon: 'bag', link: '/products?filter=Bolsas' },
  { label: 'Óculos', icon: 'glasses', link: '/products?filter=Óculos' },
];

const HomePage = () => {
  const { data: products, loading, error, retry } = useFetch(getProducts);

  // "Produtos em alta": os 8 produtos mais bem avaliados
  const trending = [...(products ?? [])].sort((a, b) => b.stars - a.stars).slice(0, 8);

  return (
    <Layout>
      <div className="home">
        <HeroBanner slides={slides} />

        <div className="container">
          <Section title="Coleções em destaque" titleAlign="left">
            <CollectionCards collections={collections} />
          </Section>

          <Section title="Coleções em destaque" titleAlign="center">
            <CategoryIcons categories={categories} />
          </Section>

          <Section title="Produtos em alta" titleAlign="left" link={{ text: 'Ver todos', href: '/products' }}>
            {loading && <Loading text="Carregando produtos..." />}
            {error && <ErrorMessage text="Não foi possível carregar os produtos." onRetry={retry} />}
            {!loading && !error && <ProductListing products={trending} />}
          </Section>
        </div>

        <SpecialOffer
          subtitle="Oferta especial"
          title="Air Jordan edição de colecionador"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
          image={`${CDN}/nike-air-jordan-1-red-and-black/4.webp`}
          alt="Tênis Nike Air Jordan 1 edição de colecionador"
          link="/product/88"
        />
      </div>
    </Layout>
  );
};

export default HomePage;
