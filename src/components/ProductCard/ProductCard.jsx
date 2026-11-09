import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';
import './ProductCard.css';

const ProductCard = ({ id, image, category, name, price, priceDiscount }) => {
  const hasDiscount = priceDiscount !== undefined && priceDiscount !== null;
  // Fotos (JPEG) preenchem o card; imagens com fundo transparente ficam inteiras
  const isPhoto = /\.jpe?g$/i.test(image);
  const content = (
    <>
      <div className={`product-card__image ${isPhoto ? 'product-card__image--photo' : ''}`}>
        {hasDiscount && (
          <span className="product-card__tag">
            {Math.round((1 - priceDiscount / price) * 100)}% OFF
          </span>
        )}
        <img src={image} alt={name} width={292} height={321} />
      </div>
      {category && <p className="product-card__category">{category}</p>}
      <p className="product-card__name">{name}</p>
      <div className="product-card__prices">
        <span className={hasDiscount ? 'product-card__price product-card__price--old' : 'product-card__price'}>
          {formatPrice(price)}
        </span>
        {hasDiscount && <span className="product-card__price">{formatPrice(priceDiscount)}</span>}
      </div>
    </>
  );

  return (
    <article className="product-card">
      {id ? <Link to={`/product/${id}`}>{content}</Link> : content}
    </article>
  );
};

export default ProductCard;
