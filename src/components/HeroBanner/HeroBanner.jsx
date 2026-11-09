import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HeroBanner.css';

const AUTOPLAY_MS = 6000;

const HeroBanner = ({ slides = [] }) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return undefined;
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, slides.length]);

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carrossel"
    >
      <div className="hero__track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((slide, index) => (
          <div
            key={slide.title}
            className="hero__slide"
            aria-hidden={index !== current}
            aria-roledescription="slide"
          >
            <div className="container hero__content">
              <div className="hero__text">
                <span className="hero__subtitle">{slide.subtitle}</span>
                <h1 className="hero__title">{slide.title}</h1>
                <p className="hero__description">{slide.description}</p>
                <Link to={slide.link} className="hero__button" tabIndex={index === current ? 0 : -1}>
                  Ver Ofertas
                </Link>
              </div>
              <div className="hero__image">
                <span className="hero__ornament" aria-hidden="true" />
                <img src={slide.image} alt={slide.alt} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hero__dots">
        {slides.map((slide, index) => (
          <button
            type="button"
            key={slide.title}
            className={`hero__dot ${index === current ? 'hero__dot--active' : ''}`}
            onClick={() => setCurrent(index)}
            aria-label={`Ir para o slide ${index + 1}`}
            aria-current={index === current}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
