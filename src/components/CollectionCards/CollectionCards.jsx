import { Link } from 'react-router-dom';
import './CollectionCards.css';

const CollectionCards = ({ collections = [] }) => {
  return (
    <div className="collection-cards">
      {collections.map((collection) => (
        <article key={collection.image} className="collection-card">
          <img src={collection.image} alt={collection.alt} />
          {collection.discount && <span className="collection-card__tag">{collection.discount}</span>}
          <Link to={collection.link} className="collection-card__button">
            Comprar
          </Link>
        </article>
      ))}
    </div>
  );
};

export default CollectionCards;
