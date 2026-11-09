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
  pants: (
    <svg {...svgProps}>
      <path d="M14 6h20l3 36h-9l-4-24-4 24h-9l3-36z" />
      <path d="M14 11h20M24 11v7M18 11c0 3-1 5-3 6M30 11c0 3 1 5 3 6" />
    </svg>
  ),
  cap: (
    <svg {...svgProps}>
      <path d="M7 31c-1-10 6-18 17-18 9 0 15 6 15 15" />
      <path d="M7 31c8-3 20-4 32-3 3 0 5 2 4 4-1 1-3 2-6 2-10 0-20-1-30-3z" />
      <path d="M24 13v-2M24 13c-3 4-4 10-4 16" />
    </svg>
  ),
  headphones: (
    <svg {...svgProps}>
      <path d="M9 30v-6a15 15 0 0130 0v6" />
      <rect x="6" y="28" width="9" height="13" rx="4" />
      <rect x="33" y="28" width="9" height="13" rx="4" />
    </svg>
  ),
  shoe: (
    <svg {...svgProps}>
      <path d="M5 33v-6c0-2 1-3 3-3 4 0 7-3 9-7l3 2c2 1 4 1 6 0l2 4c3 4 9 6 14 6 1 0 2 1 2 2v2c0 1-1 2-2 2H7c-1 0-2-1-2-2z" />
      <path d="M5 38h38M21 25l3 2M18 28l3 2" />
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
