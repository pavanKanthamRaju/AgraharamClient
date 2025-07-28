import React from "react";
const AuthLayout = ({ children }) => {
    return (
        <div className="auth-bg">

            <div className="auth-bg min-h-screen flex flex-col md:flex-row">
                {/* Left Section: Logo / Branding */}
                <div className="w-full md:w-2/3 bg-gradient-to-r from-orange-500 to-red-500 text-white py-6 px-4 flex items-center justify-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-center">
                        App Logo Here
                    </h1>
                </div>

                {/* Right Section: Content (children) */}
                <div className="w-full md:w-1/3 flex items-center justify-center p-6">
                    {children}
                </div>
            </div>


        </div>
    )
}


export default AuthLayout