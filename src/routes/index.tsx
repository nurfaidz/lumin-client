import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Routes, Route, Navigate } from "react-router";

import Home from "../views/home";
import Login from "../views/auth/login";
import Register from "../views/auth/register";
import Dashboard from "../views/dashboard";

export default function AppRoutes() {
    // using useContext to get value from AuthContext
    // const authContext = useContext(AuthContext);

    // using optional chaining to avoid error if auth is null
    // const isAuthenticated = auth?.isAuthenticated ?? false;

    const auth = useContext(AuthContext);

    const isAuthenticated = auth?.isAuthenticated ?? false;

    return (
        <Routes>
            {/* route "/" */}
            <Route path="/" element={<Home />}/>

            {/* route "/login" */}
            <Route path="/login" element={<Login />}/>

            {/* route "/register" */}
            <Route path="/register" element={<Register />}/>

            {/* route "/admin/dashboard" */}
            <Route path="/admin/dashboard" element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace/>
            }/>

        </Routes>
    )
}