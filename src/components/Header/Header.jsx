import { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import miniCart from '../../assets/mini-cart.svg';
import './Header.css';

const links = [
  { text: 'Home', to: '/' },
  { text: 'Produtos', to: '/products' },
  { text: 'Categorias', to: '/categorias' },
  { text: 'Meus Pedidos', to: '/pedidos' },
];

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const NavLinks = ({ className }) =>
  links.map((link) => (
    <NavLink
      key={link.to}
      to={link.to}
      end={link.to === '/'}
      className={({ isActive }) => `${className} ${isActive ? 'active' : ''}`.trim()}
    >
      {link.text}
    </NavLink>
  ));

const Header = () => {
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Fecha o menu e a busca do celular ao trocar de página
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  // Impede a rolagem da página com o menu aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleSearch = (event) => {
    event.preventDefault();
    const filter = search.trim();
    navigate(filter ? `/products?filter=${encodeURIComponent(filter)}` : '/products');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__top">
          <button
            type="button"
            className="header__menu-button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>

          <div className="header__logo">
            <Logo />
          </div>

          <form
            className={`header__search ${searchOpen ? 'header__search--open' : ''}`}
            onSubmit={handleSearch}
            role="search"
          >
            <input
              type="text"
              placeholder="Pesquisar produto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Pesquisar produto"
            />
            <button type="submit" aria-label="Buscar">
              <SearchIcon />
            </button>
          </form>

          <div className="header__actions">
            <Link to="/cadastro" className="header__signup">Cadastre-se</Link>
            <Link to="/login" className="header__login">Entrar</Link>
          </div>

          <button
            type="button"
            className={`header__search-toggle ${searchOpen ? 'active' : ''}`}
            onClick={() => setSearchOpen((open) => !open)}
            aria-label={searchOpen ? 'Fechar busca' : 'Abrir busca'}
            aria-expanded={searchOpen}
          >
            <SearchIcon />
          </button>

          <div className="header__cart">
            <img src={miniCart} alt="Carrinho de compras" />
            <span className="header__cart-badge">2</span>
          </div>
        </div>

        <nav className="header__nav" aria-label="Navegação principal">
          <NavLinks className="header__link" />
        </nav>
      </div>

      <div
        className={`header__overlay ${menuOpen ? 'header__overlay--open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <aside className={`header__drawer ${menuOpen ? 'header__drawer--open' : ''}`} aria-hidden={!menuOpen}>
        <button
          type="button"
          className="header__drawer-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Fechar menu"
        >
          ×
        </button>
        <h3 className="header__drawer-title">Páginas</h3>
        <nav className="header__drawer-nav" aria-label="Menu do celular">
          <NavLinks className="header__drawer-link" />
        </nav>
        <div className="header__drawer-actions">
          <Link to="/login" className="header__login header__login--full">Entrar</Link>
          <Link to="/cadastro" className="header__signup">Cadastre-se</Link>
        </div>
      </aside>
    </header>
  );
};

export default Header;
