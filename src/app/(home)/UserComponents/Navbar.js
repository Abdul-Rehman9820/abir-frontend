'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

export default function Navbar() {

  const currentRoute = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference to the dropdown

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const isActive = (path) => currentRoute === path;

  return (
    <nav className="bg-transparent">
      <div className="flex justify-center items-center">
        {/* Links */}
        <ul
          className={`nav_ul lg:flex lg:items-center lg:space-x-2 text-white w-full lg:w-auto`}
        >
          <li className="my-2 lg:my-0">
            <Link href="/" className={`block   rounded ${isActive('/') ? 'HNavActive' : ''}`}>
              Home
            </Link>
          </li>
          <li className="my-2 lg:my-0">
            <Link href="/about" className={`block   rounded ${isActive('/about') ? 'HNavActive' : ''}`}>
              About
            </Link>
          </li>

          <li className="my-2 lg:my-0">
            <Link href="/recipes-pdf" className={`block   rounded ${isActive('/recipes-pdf') ? 'HNavActive' : ''}`}>
              Recipe PDF
            </Link>
          </li>
          <li className="my-2 lg:my-0">
            <Link href="/recipes-videos" className={`block   rounded ${isActive('/recipes-videos') ? 'HNavActive' : ''}`}>
            Recipe Videos
            </Link>
          </li>
          <li className="my-2 lg:my-0">
            <Link href="/packages" className={`block   rounded ${isActive('/packages') ? 'HNavActive' : ''}`}>
            Health Packages
            </Link>
          </li>

          <li className="my-2 lg:my-0">
            <Link href="/contact" className={`block   rounded ${isActive('/contact') ? 'HNavActive' : ''}`}>
              Contact
            </Link>
          </li>
          
          {/* Dropdown Menu with Icon */}

          {/* <li ref={dropdownRef} className="relative my-2 lg:my-0">
            <button
              className="block  hover:bg-emerald-700 rounded focus:outline-none flex items-center"
              onClick={toggleDropdown}
            >
              Services
              <svg
                className={`w-4 h-4 ml-1 transition-transform duration-300 transform ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <ul className="absolute bg-gray-700 mt-2 space-y-2 p-2 rounded shadow-lg lg:space-y-0 lg:space-x-4 lg:flex">
                <li>
                  <Link href="/web-development" className="block  hover:bg-gray-600 rounded">
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link href="/seo" className="block  hover:bg-gray-600 rounded">
                    SEO Services
                  </Link>
                </li>
                <li>
                  <Link href="/consulting" className="block  hover:bg-gray-600 rounded">
                    Consulting
                  </Link>
                </li>
              </ul>
            )}
          </li> */}


        </ul>
      </div>
    </nav>
  );
}