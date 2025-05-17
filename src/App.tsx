import { FC } from "react";
import AppRoutes from "./routes";
import { Link } from "react-router";

const App: FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
 
            <AppRoutes />
        </div>
    )
}

export default App;