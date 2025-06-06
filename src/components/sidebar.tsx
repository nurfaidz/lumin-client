import { FC } from "react";

import { Link } from "react-router";
import { useLogout } from "../hooks/auth/useLogout";

const SidebarMenu: FC = () => {
    const handleLogout = useLogout();

    return (
        <div className="bg-white border-0 rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">MAIN MENU</h2>
            </div>
            <div className="px-6 py-4">
                <div className="space-y-2">
                    <Link 
                        to="/admin/dashboard" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors duration-200"
                    >
                        Dashboard
                    </Link>
                    <Link 
                        to="/admin/users" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors duration-200"
                    >
                        Users
                    </Link>
                    <button 
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors duration-200 cursor-pointer justify-center"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SidebarMenu;