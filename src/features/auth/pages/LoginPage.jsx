import React, { useState } from "react";
import SigninForm from "../components/SigninForm"
import { login } from "../authApi";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../context/authContext";
const LoginPage = () => {
const {loginUser, redirectPath} = useAuth();
    const navigate =useNavigate();
    const [isLopggedIn, setLoggedIn] =useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const credentials = {
            identifier:formData.get("identifier"),
            password:formData.get("password")
        };
        try{
            const userData = await login(credentials)
            console.log("LoginSiuccessfull", userData)
            if(!userData){
                setLoggedIn(false)
            }else{
                setLoggedIn(true)
                loginUser(userData)
                navigate(redirectPath || "/dashboard");
            }
        }catch(err){
            console.error("Login failed:", err.message);
        }
    }
    return (
        // <div className="min-h-screen flex">
        //     <div className="hidden md:flex w-2/3 bg-blue-50 items-center justify-center">
        //         <h1 className="text-4xl font-bold">
        //             App Logo Here
        //         </h1>
        //     </div>
            <div className="flex w-full md:w-1/3 items-center justify-center p-8">
               <SigninForm onSubmit={handleSubmit} />
            </div>
        // </div>
    )
}
export default LoginPage