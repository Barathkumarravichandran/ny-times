import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isSticky, setIsSticky] = useState(false);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const menuItems = [
    { name: 'Articles', path: '/' },
    { name: 'About us', path: '/about' },
    { name: 'Services', path: '/services' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`bg-light ${isSticky ? 'sticky' : ''}`}>
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <NavLink to="/" className="navbar-brand">
            <img
              src={props.logo}
              width={140}
              alt='logo'
              className='img-fluid'
            />
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {menuItems.map((item) => (
                <li className="nav-item" key={item.name}>
                  <NavLink
                    className="nav-link"
                    to={item.path}
                    activeclassname="active"
                    exact
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;