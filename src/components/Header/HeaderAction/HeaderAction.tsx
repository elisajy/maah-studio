import React, { useState } from 'react';
import { useCart } from '../../Cart/CartContext';
import ShoppingCartComponent from '../../Cart/ShoppingCart';
import '../../Cart/CartButton.scss';

const HeaderActions: React.FC<{
    toggleMobileMenu: () => void;
    mobileMenuOpen: boolean;
}> = ({ toggleMobileMenu, mobileMenuOpen }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { state } = useCart();

    return (
        <div className="header__actions">
            <button className="header__action-btn header__cart-btn" onClick={() => setIsCartOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {state.itemCount > 0 && (
                    <span className="header__cart-count">{state.itemCount > 99 ? '99+' : state.itemCount}</span>
                )}
            </button>

            <button className="header__mobile-menu-btn" onClick={toggleMobileMenu}>
                <span className={`header__mobile-menu-icon ${mobileMenuOpen ? 'open' : ''}`}></span>
            </button>

            <ShoppingCartComponent isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    );
};

export default HeaderActions;
