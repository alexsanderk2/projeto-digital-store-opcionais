import ProductCard from '../ProductCard/ProductCard';
import './ProductListing.css';

const ProductListing = ({ products = [], columns = 4 }) => {
  return (
    <div className="product-listing" style={{ '--columns': columns }}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id ?? index}
          id={product.id}
          image={product.image}
          category={product.type ?? product.category}
          name={product.name}
          price={product.price}
          priceDiscount={product.priceDiscount}
        />
      ))}
    </div>
  );
};

export default ProductListing;
