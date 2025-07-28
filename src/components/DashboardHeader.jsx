import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
     <header className="w-full bg-gradient-to-r from-yellow-300 to-red-300 shadow-md px-6 py-4 flex justify-between items-center">
    {/* <header className='bg-gradient-to-r from-purple-900 via-indigo-800 to-purple-800 text-white shadow-2xl relative overflow-hidden'> */}
      <div className="text-2xl font-bold text-orange-600">
        App Logo
      </div>
      <div className="space-x-4">
        <Link to="/login">
          <button className="text-orange-700 font-medium hover:underline">
            Sign In
          </button>
        </Link>
        
        <button
          className="bg-orange-600 hover:bg-orange-700  text-white px-4 py-2 rounded-md transition"
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
