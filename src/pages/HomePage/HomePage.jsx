import Layout from '../Layout/Layout';
import Gallery from '../../components/Gallery/Gallery';
import Section from '../../components/Section/Section';
import ProductListing from '../../components/ProductListing/ProductListing';
import { Loading, ErrorMessage } from '../../components/Status/Status';
import useFetch from '../../hooks/useFetch';
import { getProducts } from '../../services/api';
import './HomePage.css';

const slides = Array.from({ length: 8 }, (_, i) => ({ src: `/home-slide-${i + 1}.jpeg` }));

const collections = [
  { src: '/collection-1.png', alt: 'Coleção Supreme' },
  { src: '/collection-2.png', alt: 'Coleção Adidas' },
  { src: '/collection-3.png', alt: 'Coleção Beats' },
];

const HomePage = () => {
  const { data: products, loading, error, retry } = useFetch(getProducts);

  // "Produtos em alta": os 8 produtos mais bem avaliados
  const trending = [...(products ?? [])].sort((a, b) => b.stars - a.stars).slice(0, 8);

  return (
    <Layout>
      <Gallery className="home__gallery" images={slides} width="1440" height="681" />

      <div className="container">
        <Section title="Coleções em destaque" titleAlign="center">
          <div className="home__collections">
            {collections.map((collection) => (
              <img key={collection.src} src={collection.src} alt={collection.alt} />
            ))}
          </div>
        </Section>

        <Section title="Produtos em alta" titleAlign="left" link={{ text: 'Ver todos', href: '/products' }}>
          {loading && <Loading text="Carregando produtos..." />}
          {error && <ErrorMessage text="Não foi possível carregar os produtos." onRetry={retry} />}
          {!loading && !error && <ProductListing products={trending} />}
        </Section>
      </div>
    </Layout>
  );
};

export default HomePage;
