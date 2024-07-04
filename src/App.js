import React from 'react';
import './App.scss'
import logo from './logo.svg'
import {Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import About from './pages/About';
import Articles from './pages/Articles';
import Services from './pages/Services';
import Category from './pages/Category';
import NotFound from './pages/NotFound';
import Footer from './component/Footer';

const App = () => {
  return (
    <>
      <Header logo={logo} />
      <div className='app-container'>
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/:category" element={<Category />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
