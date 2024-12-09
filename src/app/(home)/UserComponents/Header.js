'use client'

import { useEffect, useState } from "react";

import Link from "next/link";

import "../usercomponets_styles/header.css";
import Navbar from "./Navbar";
import HeaderLogo from "./headerLogo";


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from '../useAuth';  // Import the useAuth hook


const Header = () => {

  const { token, isLoading, isAuthenticated } = useAuth(); // Get session token and status
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);

  // Wait for session data to load
  useEffect(() => {
    if (!isLoading) {
      setIsSessionLoaded(true);
    }
  }, [isLoading]);


  return (
    <header className="header-style3">

      {/* Toast */}
      <ToastContainer />
      {/* Toast*/}





      {/* Decstop Header */}
      {/* Decstop Header */}

      <div className="DecstopHeader">

        {/* Header Logo */}
        <HeaderLogo />
        {/* Header Logo*/}


        {/* ===== bottom navbar start */}
        <div className="navbar-default">
          <div className="menu_areas">
            <div className="px-8">


              <nav className="Header_navbar">


                <div className="headCont">


                  <div className="headbox1">

                  </div>


                  <div className="headbox2">

                    {/* start menu area */}
                    <div className="nav_list flex items-center justify-center">
                      <Navbar />
                    </div>
                    {/* end menu area */}

                  </div>


                  <div className="headbox3">

                    {/* start attribute navigation */}

                    <div className="nav_button_cont flex justify-end">

                      {/* cookie logic */}


                      {/* Conditional Login/Account Link */}
                      {
                        isSessionLoaded && (
                          token ? (
                            <Link href="/my-account" className="Headerdefault_btn">
                              My Account
                            </Link>
                          ) : (
                            <Link href="/login" className="Headerdefault_btn">
                              Login
                            </Link>
                          )
                        )
                      }



                      {/* cookie logic */}


                      <div className="header-item flex items-center">
                        <ul className="flex items-center">
                          <li className="flex items-center me-1">
                            <a href="https://www.facebook.com/" target="_blank">
                              <img src="/custom_images/face-icon-new.png" alt="icon" />
                            </a>
                          </li>
                          <li className="flex items-center me-1">
                            <a href="https://www.facebook.com/" target="_blank">
                              <img src="/custom_images/instagram-icon.png" alt="icon" />
                            </a>
                          </li>
                          <li className="flex items-center me-1">
                            <a href="https://www.facebook.com/" target="_blank">
                              <img src="/custom_images/tik-tok-icon.png" alt="icon" />
                            </a>
                          </li>

                        </ul>
                      </div>

                    </div>
                    {/* end attribute navigation */}

                  </div>


                </div>






              </nav>


            </div>
          </div>
        </div>
        {/* ===== bottom navbar end */}


      </div>
      {/* Decstop Header */}
      {/* Decstop Header */}


    </header>
  );
};
export default Header;
