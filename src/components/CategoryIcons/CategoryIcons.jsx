import { Link } from 'react-router-dom';
import './CategoryIcons.css';

const svgProps = {
  width: 48,
  height: 48,
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

const icons = {
  shirt: (
    <svg {...svgProps}>
      <path d="M17 7l-9 5 3 8 5-2v23h16V18l5 2 3-8-9-5c-1 3-4 5-7 5s-6-2-7-5z" />
    </svg>
  ),
  dress: (
    <svg {...svgProps}>
      <path d="M19 5v7l-3 6 4 4-8 20h24l-8-20 4-4-3-6V5" />
      <path d="M19 12h10" />
    </svg>
  ),
  shoe: (
    <svg {...svgProps}>
      <path d="M5 33v-6c0-2 1-3 3-3 4 0 7-3 9-7l3 2c2 1 4 1 6 0l2 4c3 4 9 6 14 6 1 0 2 1 2 2v2c0 1-1 2-2 2H7c-1 0-2-1-2-2z" />
      <path d="M5 38h38M21 25l3 2M18 28l3 2" />
    </svg>
  ),
  bag: (
    <svg {...svgProps}>
      <path d="M9 16h30l-3 26H12L9 16z" />
      <path d="M17 20v-8a7 7 0 0114 0v8" />
    </svg>
  ),
  glasses: (
    <svg {...svgProps}>
      <circle cx="14" cy="28" r="8" />
      <circle cx="34" cy="28" r="8" />
      <path d="M22 27c1-1 3-1 4 0M6 26L9 15M42 26l-3-11" />
    </svg>
  ),
};

const CategoryIcons = ({ categories = [] }) => {
  return (
    <ul className="category-icons">
      {categories.map((category) => (
        <li key={category.label}>
          <Link to={category.link} className="category-icons__item">
            <span className="category-icons__circle">{icons[category.icon]}</span>
            <span className="category-icons__label">{category.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoryIcons;
