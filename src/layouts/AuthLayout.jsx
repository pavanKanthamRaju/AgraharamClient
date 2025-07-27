import React from "react";
const AuthLayout = ({children})=>{
return(
<div className="auth-bg">
<div className="min-h-screen flex">
            <div className="hidden md:flex w-2/3 bg-blue-50 items-center justify-center">
                <h1 className="text-4xl font-bold">
                    App Logo Here
                </h1>
            </div>
            {children}
        </div>
    
    </div>
)
}


export default AuthLayout