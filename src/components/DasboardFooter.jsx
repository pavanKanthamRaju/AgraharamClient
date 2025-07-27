import React from "react";

const DashboardFooter = () => {
  return (
    <footer className="w-full bg-gray-700 text-center py-4 shadow-inner text-sm text-white">
      <p>© {new Date().getFullYear()} Agraharam. All rights reserved.</p>
      <p className="mt-1">Made with ❤️ for your spiritual journey</p>
    </footer>
  );
};

export default DashboardFooter;