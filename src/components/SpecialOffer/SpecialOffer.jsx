import { Link } from 'react-router-dom';
import './SpecialOffer.css';

const SpecialOffer = ({ subtitle, title, description, image, alt, link }) => {
  return (
    <section className="special-offer">
      <div className="container special-offer__content">
        <div className="special-offer__image">
          <img src={image} alt={alt} />
        </div>
        <div className="special-offer__text">
          <span className="special-offer__subtitle">{subtitle}</span>
          <h2 className="special-offer__title">{title}</h2>
          <p className="special-offer__description">{description}</p>
          <Link to={link} className="special-offer__button">
            Ver Oferta
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;
