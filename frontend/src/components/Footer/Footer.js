import React, { useState } from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const Footer = () => {

  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavigation = (destination) => {
    if (destination === "Home") {
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (destination === "Contact") {
      navigate("/");
      setTimeout(() => scrollToSection("footer"), 0); 
    } else if (destination === "MyOrder") {
      navigate("/myorder");
    } else if (destination === "Menu") {
      navigate("/");
      setTimeout(() => scrollToSection("Explore-Menu"), 0); 
    }
  };

  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-left">
          <img src={assets.footerLogo} alt="" />
          <p>
          Savor the best burgers in town, crafted with the freshest ingredients and a passion for perfection. Join us for a taste experience like no other, where every bite is a celebration of flavor. Follow us on social media and stay updated with our latest creations and offers.
          </p>
          <div className="icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={assets.social1} alt="Facebook" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <img src={assets.social2} alt="Twitter" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={assets.social3} alt="Instagram" />
          </a>
        </div>
        </div>

        <div className="footer-center">
          <h2>COMPANY</h2>
          <ul>
            <li onClick={() => handleNavigation("Home")}>Home</li>
            <li onClick={() => handleNavigation("Menu")}>Menu</li>
            <li onClick={() => handleNavigation("Contact")}>About Us</li>
            <li onClick={() => handleNavigation("MyOrder")}>Delivery</li>
          </ul>
        </div>

        <div className="footer-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+92 3498246375</li>
            <li>grillandthrill@gmail.com</li>
          </ul>

        </div>
      </div>
      <hr />
      <p className="copyright">Copyright 2024 © GrillAndThrill.com - All Rights Reserved</p>
    </div>
  );
};

export default Footer;
