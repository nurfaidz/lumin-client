import { FC } from "react";
import { Link } from "react-router";

const Home: FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
            <p className="text-lg mb-4">This is a simple home page.</p>
            <Link to="/login" className="text-blue-500 hover:underline">
                Go to Login
            </Link>
        </div>
    )
}

export default Home;