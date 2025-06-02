import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home: React.FC = () => {
  return (
    <div className="home">
      {/* Hero Banner */}
      <section className="hero">
        <div className="container">
          <div className="hero__content">
            <h1 className="hero__title">Enchanted Woods Collection</h1>
            <p className="hero__subtitle">Enjoy our planet as an Art.</p>
            <Link to="/all" className="hero__cta">Shop Now</Link>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="featured">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          
          <div className="products-grid">
            {/* Product 1 */}
            <div className="product-card">
              <div className="product-card__image">
                <div className="product-card__tag">SOLD OUT</div>
                <img src="/placeholder-product-1.jpg" alt="Oversize Breeze Shirt in Black" className="product-card__img" />
              </div>
              <div className="product-card__info">
                <h3 className="product-card__title">Oversize Breeze Shirt in Black</h3>
                <p className="product-card__price">RM 89.00</p>
              </div>
            </div>
            
            {/* Product 2 */}
            <div className="product-card">
              <div className="product-card__image">
                <img src="/placeholder-product-2.jpg" alt="Oversize Breeze Shirt in White" className="product-card__img" />
              </div>
              <div className="product-card__info">
                <h3 className="product-card__title">Oversize Breeze Shirt in White</h3>
                <p className="product-card__price">RM 89.00</p>
              </div>
            </div>
            
            {/* Product 3 */}
            <div className="product-card">
              <div className="product-card__image">
                <div className="product-card__tag">SOLD OUT</div>
                <img src="/placeholder-product-3.jpg" alt="Oversize Breeze Shirt in Sage Green" className="product-card__img" />
              </div>
              <div className="product-card__info">
                <h3 className="product-card__title">Oversize Breeze Shirt in Sage Green</h3>
                <p className="product-card__price">RM 89.00</p>
              </div>
            </div>
          </div>
          
          <div className="featured__bottom">
            <Link to="/new" className="button button--outline">View All Products</Link>
          </div>
        </div>
      </section>
      
      {/* Collection Banner */}
      <section className="collection-banner">
        <div className="container">
          <div className="collection-banner__content">
            <h2 className="collection-banner__title">New Arrivals</h2>
            <p className="collection-banner__text">Discover our latest Earth-inspired designs that blend comfort with timeless elegance.</p>
            <Link to="/new" className="button">Shop New Arrivals</Link>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="values">
        <div className="container">
          <div className="values__grid">
            <div className="values__item">
              <div className="values__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <h3 className="values__title">Locally Made</h3>
              <p className="values__text">All our products are designed and crafted locally with care.</p>
            </div>
            
            <div className="values__item">
              <div className="values__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <h3 className="values__title">Quality Materials</h3>
              <p className="values__text">We use sustainable fabrics that are gentle on the environment.</p>
            </div>
            
            <div className="values__item">
              <div className="values__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </div>
              <h3 className="values__title">Free Shipping</h3>
              <p className="values__text">Enjoy free shipping at purchase of RM150-WM, RM200-EM.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;