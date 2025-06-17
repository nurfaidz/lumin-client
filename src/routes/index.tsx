import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Routes, Route, Navigate } from "react-router";

import Home from "../views/home";
import Login from "../views/auth/login";
import Register from "../views/auth/register";
import Dashboard from "../views/dashboard";
import UsersIndex from "../views/admin/user";
import UserCreate from "../views/admin/user/create";
import UserEdit from "../views/admin/user/edit";

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

            {/* route "/admin/users" */}
            <Route path="/admin/users" element={
                isAuthenticated ? <UsersIndex /> : <Navigate to="/login" replace/>
            }/>

            {/* route "/admin/users/create" */}
            <Route path="/admin/users/create" element={
                isAuthenticated ? <UserCreate /> : <Navigate to="/login" replace/>
            }/>

            {/* route "/admin/users/:id/edit" */}
            <Route path="/admin/users/:id/edit" element={
                isAuthenticated ? <UserEdit /> : <Navigate to="/login" replace/>
            } />

        </Routes>
    )
}