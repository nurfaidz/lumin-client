import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Routes, Route, Navigate } from "react-router";

import Home from "../views/home";

export default function AppRoutes() {
    // using useContext to get value from AuthContext
    // const authContext = useContext(AuthContext);

    // using optional chaining to avoid error if auth is null
    // const isAuthenticated = auth?.isAuthenticated ?? false;

    return (
        <Routes>
            {/* route "/" */}
            <Route path="/" element={<Home />}/>
        </Routes>
    )
}