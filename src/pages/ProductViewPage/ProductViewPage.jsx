import { useParams, Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Gallery from '../../components/Gallery/Gallery';
import BuyBox from '../../components/BuyBox/BuyBox';
import ProductOptions from '../../components/ProductOptions/ProductOptions';
import Section from '../../components/Section/Section';
import ProductListing from '../../components/ProductListing/ProductListing';
import { Loading, ErrorMessage } from '../../components/Status/Status';
import useFetch from '../../hooks/useFetch';
import { getProduct, getRelatedProducts } from '../../services/api';
import './ProductViewPage.css';

const SIZES = {
  'mens-shoes': ['39', '40', '41', '42', '43'],
  'womens-shoes': ['34', '35', '36', '37', '38'],
  'mens-shirts': ['P', 'M', 'G', 'GG'],
  tops: ['P', 'M', 'G', 'GG'],
};

const COLORS = ['#6FEEFF', '#FF6969', '#5E5E5E', '#6D70B7'];

// Fundos em tons pastel das imagens, como no layout
const IMAGE_BACKGROUNDS = ['#E2E3FF', '#FFE8BC', '#FFC0BC', '#DEC699', '#E8DFCF'];

const ProductViewPage = () => {
  const { id } = useParams();

  const { data, loading, error, retry } = useFetch(
    async (signal) => {
      const product = await getProduct(id, signal);
      const related = await getRelatedProducts(product, signal);
      return { product, related };
    },
    [id]
  );

  if (loading || error || !data) {
    return (
      <Layout>
        <div className="container">
          {error ? (
            <ErrorMessage text="Não foi possível carregar o produto." onRetry={retry} />
          ) : (
            <Loading text="Carregando produto..." />
          )}
        </div>
      </Layout>
    );
  }

  const { product, related } = data;
  const sizes = SIZES[product.categorySlug];

  return (
    <Layout>
      <div className="container">
        <p className="product-view__breadcrumb">
          <Link to="/"><strong>Home</strong></Link> / <Link to="/products">Produtos</Link> / {product.category} /{' '}
          {product.name}
        </p>

        <div className="product-view">
          <Gallery
            key={product.id}
            className="product-view__gallery"
            images={product.images.map((src, i) => ({
              src,
              background: IMAGE_BACKGROUNDS[i % IMAGE_BACKGROUNDS.length],
            }))}
            showThumbs
            width="700"
            height="570"
            radius="4px"
            fit="contain"
          />

          <BuyBox
            name={product.name}
            reference={`${product.category} | ${product.brand} | REF: ${product.reference}`}
            stars={product.stars}
            rating={product.rating}
            price={product.price}
            priceDiscount={product.priceDiscount}
            description={product.description}
          >
            {sizes && (
              <div>
                <h4 className="product-view__option-title">Tamanho</h4>
                <ProductOptions options={sizes} radius="4px" shape="square" type="text" />
              </div>
            )}
            <div>
              <h4 className="product-view__option-title">Cor</h4>
              <ProductOptions options={COLORS} shape="circle" type="color" />
            </div>
          </BuyBox>
        </div>

        <Section title="Produtos Relacionados" titleAlign="left" link={{ text: 'Ver todos', href: '/products' }}>
          <ProductListing products={related} />
        </Section>
      </div>
    </Layout>
  );
};

export default ProductViewPage;
