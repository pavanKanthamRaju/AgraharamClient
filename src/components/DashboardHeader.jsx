
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import mainLogo from "../assets/main-logo.png"
import agraharamTextImg from "..//assets/agraharam_text_img.png"


const DashboardHeader = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
const logoNavigation = user? user.user.isadmin? "/admin/orders" : "/dashboard" : ""
debugger
  const handleLogout = () => {
    localStorage.removeItem("user");
    logoutUser(); // set context user to null
    window.history.pushState({}, document.title, "/");
    navigate("/login", { replace: true });
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <header className="w-full bg-gradient-to-r from-yellow-300 to-red-300 shadow-md px-1 flex justify-between items-center">
  <Link to={logoNavigation}>
  <img 
    src={mainLogo} 
    alt="Logo"
    className="h-16 md:h-20 w-auto"
  />
  
</Link>
<img 
    src={agraharamTextImg} 
    alt="Logo"
    className="h-16 md:h-20 hidden sm:block"
  />
  {!user ? (
    <div className="space-x-4">
      <Link to="/login">
        <button className="text-orange-700 font-medium hover:underline">Sign In</button>
      </Link>
      <button
        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md transition"
        onClick={() => navigate('/signup')}
      >
        Sign Up
      </button>
    </div>
  ) : (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center space-x-2 text-orange-700 font-medium cursor-pointer mr-2"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {user.user.profile_image ? (
          <img 
            src={user.user.profile_image}
            alt="Profile" 
            className="w-6 h-6 rounded-full"
          />
        ) : (
          <FaUserCircle className="text-2xl" />
        )}
        <span>{user.user.name || "User"}</span>
      </div>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-30 bg-red-500 shadow-lg border rounded-md z-10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-start gap-2 px-4 py-2 text-sm text-white"
          >
            <FiLogOut className="text-base align-middle" />
            <span className="leading-none">Logout</span>
          </button>
        </div>
      )}
    </div>
  )}
</header>

  );
};

export default DashboardHeader;

