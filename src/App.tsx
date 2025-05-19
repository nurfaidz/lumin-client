import React, { FC } from "react";
import AppRoutes from "./routes";
import { Link } from "react-router";

const App: FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-blue-500 bg-gradient-to-tl from-blue-500 to-blue-700 p-4">
            <AppRoutes />
        </div>
    )
}

export default App;