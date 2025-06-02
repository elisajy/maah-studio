import React, { ReactNode, useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Layout.scss';
import { CartProvider } from '../Cart/CartContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  return (
    <div className="layout">
      <CartProvider>
        <Header isScrolled={isScrolled} />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </CartProvider>
    </div>
  );
};

export default Layout;