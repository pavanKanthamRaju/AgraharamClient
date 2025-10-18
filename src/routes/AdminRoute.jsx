import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
const AdminRoute = ({children}) =>{
    debugger
    const {user, setRedirectPath, loading} = useAuth();
    if(!user){
        return <Navigate to="/login" />
    }
    if(!user.user.isadmin){
        return <Navigate to="/dashboard" />
    }
    return children
}

export default AdminRoute