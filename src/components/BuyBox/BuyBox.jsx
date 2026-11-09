import { formatPrice } from '../../utils/formatPrice';
import './BuyBox.css';

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
    <path
      d="M8.15102 1.2306L10.0003 5.65038L14.7346 6.06108C15.063 6.08972 15.1966 6.50343 14.9473 6.72122L11.3563 9.86292L12.4324 14.5367C12.507 14.8614 12.1585 15.1169 11.8764 14.9443L7.80774 12.4666L3.73906 14.9443C3.45622 15.1162 3.10846 14.8607 3.18309 14.5367L4.25921 9.86292L0.667401 6.72047C0.418146 6.50268 0.550983 6.08896 0.880089 6.06033L5.61444 5.64962L7.46371 1.2306C7.59206 0.923134 8.02266 0.923134 8.15102 1.2306Z"
      fill="#FFFFFF"
    />
  </svg>
);

const RatingStars = ({ value }) => {
  const filled = Math.round(Number(value));
  return (
    <span className="buy-box__star-row" aria-label={`${value} de 5 estrelas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M8.15 1.23L10 5.65l4.73.41c.33.03.46.44.21.66l-3.59 3.14 1.08 4.68c.07.32-.27.58-.56.4L7.81 12.47l-4.07 2.48c-.28.17-.63-.08-.56-.4l1.08-4.68L.67 6.72c-.25-.22-.12-.63.21-.66l4.73-.41 1.85-4.42c.13-.31.56-.31.69 0z"
            fill={i < filled ? 'var(--warning)' : 'none'}
            stroke="var(--warning)"
          />
        </svg>
      ))}
    </span>
  );
};

// "R$ 219,00" com o símbolo e os centavos menores, como no layout
const PriceTag = ({ value }) => {
  const [integer, cents] = Number(value).toFixed(2).split('.');
  const formattedInteger = Number(integer).toLocaleString('pt-BR');
  return (
    <span className="buy-box__price" aria-label={formatPrice(value)}>
      <small>R$</small> {formattedInteger}
      <small>,{cents}</small>
    </span>
  );
};

const BuyBox = ({ name, reference, stars, rating, price, priceDiscount, description, children }) => {
  const hasDiscount = priceDiscount !== undefined && priceDiscount !== null;

  return (
    <div className="buy-box">
      <h1 className="buy-box__name">{name}</h1>
      <p className="buy-box__reference">{reference}</p>

      <div className="buy-box__rating">
        <RatingStars value={stars} />
        <span className="buy-box__stars">
          {stars} <StarIcon />
        </span>
        <span className="buy-box__reviews">({rating} avaliações)</span>
      </div>

      <div className="buy-box__prices">
        <PriceTag value={hasDiscount ? priceDiscount : price} />
        {hasDiscount && <span className="buy-box__price--old">{formatPrice(price)}</span>}
      </div>

      <div className="buy-box__description">
        <h3>Descrição do produto</h3>
        <p>{description}</p>
      </div>

      {children && <div className="buy-box__children">{children}</div>}

      <button type="button" className="buy-box__button">
        COMPRAR
      </button>
    </div>
  );
};

export default BuyBox;
