import React, { useState, useContext, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

const Navbar = ({ setShowLogIn }) => {
  const [menu, setMenu] = useState("Home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.substring(1); 
    if (hash) {
      const section = document.getElementById(hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const navigateToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="nav-bar">
      <img src={assets.logo} alt="logo" className="Logo" />
      <ul className="nav-bar-menu">
        <Link to="/" onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>
          Home
        </Link>
        <Link
          to="/#Explore-Menu"
          onClick={() => {
            setMenu("Menu");
            navigateToSection("Explore-Menu");
          }}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </Link>
        <Link
          to="/#MobileApp"
          onClick={() => {
            setMenu("Mobile App");
            navigateToSection("MobileApp");
          }}
          className={menu === "Mobile App" ? "active" : ""}
        >
          Mobile App
        </Link>
        <Link
          to="/#footer"
          onClick={() => {
            setMenu("Contact");
            navigateToSection("footer");
          }}
          className={menu === "Contact" ? "active" : ""}
        >
          Contact
        </Link>
      </ul>
      <div className="nav-bar-option">
        <div className="navbar-search">
          <Link to="/CartPage">
            <img src={assets.cart} alt="cart" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogIn(true)}>Sign Up</button>
        ) : (
          <div className="navprofile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-dropdown">
              <li onClick={() => navigate('/myorder')}>
                <img src={assets.bag_icon} />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
