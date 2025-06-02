import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import './styles/main.scss';
import ProductListingPage from './pages/ProductListing/ProductListingPage';
import AboutUs from './pages/AboutUs/AboutUs';
import Guide from './pages/Guide/Guide';
import ShippingReturn from './pages/ShippingReturnPolicy/ShippingReturnPolicy';
import FAQ from './pages/FAQ/FAQ';

// Mock pages for demonstration (you can create these yourself)
// const New = () => <div className="container py-5"><h1>New Arrivals</h1></div>;
const AllItems = () => <div className="container py-5"><h1>All Items</h1></div>;
const Top = () => <div className="container py-5"><h1>Top Collection</h1></div>;
const Bottom = () => <div className="container py-5"><h1>Bottom Collection</h1></div>;
const Outerwear = () => <div className="container py-5"><h1>Outerwear Collection</h1></div>;
const Dress = () => <div className="container py-5"><h1>Dress Collection</h1></div>;
const Sale = () => <div className="container py-5"><h1>Sale Items</h1></div>;
// const About = () => <div className="container py-5"><h1>About Us</h1></div>;
// const Guide = () => <div className="container py-5"><h1>Sizing Guide</h1></div>;
// const Shipping = () => <div className="container py-5"><h1>Shipping & Return</h1></div>;
const Media = () => <div className="container py-5"><h1>Media</h1></div>;
// const FAQs = () => <div className="container py-5"><h1>Frequently Asked Questions</h1></div>;
const Points = () => <div className="container py-5"><h1>Points & Rewards</h1></div>;
const Account = () => <div className="container py-5"><h1>My Account</h1></div>;
const Cart = () => <div className="container py-5"><h1>Shopping Cart</h1></div>;
const NotFound = () => <div className="container py-5"><h1>Page Not Found</h1></div>;

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<ProductListingPage />} />
          <Route path="/all" element={<AllItems />} />
          <Route path="/top" element={<Top />} />
          <Route path="/bottom" element={<Bottom />} />
          <Route path="/outerwear" element={<Outerwear />} />
          <Route path="/dress" element={<Dress />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/shipping" element={<ShippingReturn />} />
          <Route path="/media" element={<Media />} />
          <Route path="/faqs" element={<FAQ />} />
          <Route path="/points" element={<Points />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;