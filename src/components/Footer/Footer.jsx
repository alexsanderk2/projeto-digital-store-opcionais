import Logo from '../Logo/Logo';
import FooterInformations from '../FooterInformations/FooterInformations';
import facebook from '../../assets/facebook.svg';
import instagram from '../../assets/instagram.svg';
import twitter from '../../assets/twitter.svg';
import './Footer.css';

const socials = [
  { name: 'Facebook', icon: facebook, href: 'https://www.facebook.com' },
  { name: 'Instagram', icon: instagram, href: 'https://www.instagram.com' },
  { name: 'Twitter', icon: twitter, href: 'https://www.twitter.com' },
];

const informations = [
  { text: 'Sobre Drip Store', link: '/about' },
  { text: 'Segurança', link: '/security' },
  { text: 'Wishlist', link: '/wishlist' },
  { text: 'Blog', link: '/blog' },
  { text: 'Trabalhe conosco', link: '/careers' },
  { text: 'Meus Pedidos', link: '/pedidos' },
];

const categories = [
  { text: 'Camisetas', link: '/products?filter=camisetas' },
  { text: 'Calças', link: '/products?filter=calcas' },
  { text: 'Bonés', link: '/products?filter=bones' },
  { text: 'Headphones', link: '/products?filter=headphones' },
  { text: 'Tênis', link: '/products?filter=tenis' },
];

const contact = [
  { text: 'Av. Santos Dumont, 1510 - 1 andar - Aldeota, Fortaleza - CE, 60150-161', link: '/contato' },
  { text: '(85) 3051-3411', link: '/contato' },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__brand">
            <Logo variant="white" />
            <p className="footer__description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore.
            </p>
            <div className="footer__socials">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <img src={social.icon} alt={social.name} />
                </a>
              ))}
            </div>
          </div>

          <FooterInformations title="Informação" informations={informations} />
          <FooterInformations title="Categorias" informations={categories} />
          <FooterInformations title="Contato" informations={contact} />
        </div>

        <hr className="footer__divider" />
        <p className="footer__copyright">© {new Date().getFullYear()} Digital Store</p>
      </div>
    </footer>
  );
};

export default Footer;
