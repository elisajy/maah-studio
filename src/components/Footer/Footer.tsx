import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__social">
        <div className="container">
          <p className="footer__instagram">INSTAGRAM - @MAAH_STUDIO</p>
        </div>
      </div>
      
      <div className="footer__links">
        <div className="container">
          <div className="footer__links-grid">
            <div className="footer__links-column">
              <Link to="/about" className="footer__link">ABOUT</Link>
            </div>
            <div className="footer__links-column">
              <Link to="/guide" className="footer__link">GUIDE</Link>
            </div>
            <div className="footer__links-column">
              <Link to="/shipping" className="footer__link">SHIPPING & RETURN</Link>
            </div>
            <div className="footer__links-column">
              <Link to="/faqs" className="footer__link">FAQs</Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__copyright">
            <p>Copyright © {new Date().getFullYear()} Maah Studio | Powered by Maah Studio</p>
          </div>
          
          <div className="footer__social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer__social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;