import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import HeaderActions from './HeaderAction/HeaderAction';

interface HeaderProps {
  isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__announcement">
        Enjoy Free Shipping at purchase of RM150-WM, RM200-EM
      </div>

      <div className="container">
        <div className="header__content">
          <div className="header__language">
            {/* <button className="header__language-btn">EN</button> */}
          </div>

          <div className="header__logo">
            <Link to="/" className="header__logo-link">
              Maah Studio
            </Link>
          </div>

          <div className="header__actions">
            <HeaderActions
              toggleMobileMenu={toggleMobileMenu}
              mobileMenuOpen={mobileMenuOpen}
            />
          </div>
        </div>

        <nav className={`header__nav ${mobileMenuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link to="/new" className="header__nav-link">NEW</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/all" className="header__nav-link">ALL ITEM</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/top" className="header__nav-link">TOP</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/bottom" className="header__nav-link">BOTTOM</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/outerwear" className="header__nav-link">OUTERWEAR</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/dress" className="header__nav-link">DRESS</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/sale" className="header__nav-link header__nav-link--sale">SALE</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;