// Footer.js
import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {/* Logo and Quick Links */}
          <div className="mb-8 lg:mb-0">
            <h1 className="text-2xl font-bold mb-4">Hotel Booking</h1>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <Link to="/rooms">Rooms</Link>
              </li>
              <li>
                <a href="#contactus" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* About Us */}
          <div className="mb-8 lg:mb-0">
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              We are committed to providing the best hospitality services with a
              focus on customer satisfaction and comfort.
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              className="text-white hover:text-gray-400"
              aria-label="Facebook"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              className="text-white hover:text-gray-400"
              aria-label="Twitter"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              className="text-white hover:text-gray-400"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              className="text-white hover:text-gray-400"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Hotel Booking. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
