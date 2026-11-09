import { useState } from 'react';
import arrowLeft from '../../assets/arrow-left.svg';
import arrowRight from '../../assets/arrow-right.svg';
import './Gallery.css';

const toPx = (value) => {
  if (value === undefined || value === null) return undefined;
  return /^\d+(\.\d+)?$/.test(String(value)) ? `${value}px` : String(value);
};

const Gallery = ({ className = '', width, height, radius, showThumbs = false, images = [], fit = 'cover' }) => {
  const [current, setCurrent] = useState(0);

  const isFirst = current === 0;
  const isLast = current === images.length - 1;

  const prev = () => !isFirst && setCurrent((c) => c - 1);
  const next = () => !isLast && setCurrent((c) => c + 1);

  const w = toPx(width);
  const h = toPx(height);
  const r = toPx(radius);

  return (
    <div className={`gallery ${className}`.trim()} style={{ width: w, maxWidth: '100%' }}>
      <div
        className="gallery__viewport"
        style={{
          aspectRatio: w && h ? `${parseFloat(w)} / ${parseFloat(h)}` : undefined,
          height: w && h ? undefined : h,
          borderRadius: r,
        }}
      >
        <div className="gallery__track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {images.map((image, index) => (
            <img
              key={image.src + index}
              src={image.src}
              alt={`Imagem ${index + 1}`}
              className="gallery__image"
              style={{ objectFit: fit }}
              aria-hidden={index !== current}
            />
          ))}
        </div>

        <button
          type="button"
          className="gallery__arrow gallery__arrow--left"
          onClick={prev}
          disabled={isFirst}
          aria-label="Imagem anterior"
        >
          <img src={arrowLeft} alt="" />
        </button>
        <button
          type="button"
          className="gallery__arrow gallery__arrow--right"
          onClick={next}
          disabled={isLast}
          aria-label="Próxima imagem"
        >
          <img src={arrowRight} alt="" />
        </button>
      </div>

      {showThumbs && (
        <div className="gallery__thumbs">
          {images.map((image, index) => (
            <button
              type="button"
              key={image.src + index}
              className={`gallery__thumb ${index === current ? 'gallery__thumb--active' : ''}`}
              style={{ borderRadius: r }}
              onClick={() => setCurrent(index)}
              aria-label={`Ver imagem ${index + 1}`}
            >
              <img src={image.src} alt="" style={{ borderRadius: r, objectFit: fit }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
