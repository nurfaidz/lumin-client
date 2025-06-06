import { FC } from "react";
import SidebarMenu from "../../components/sidebar";

import { useAuthUser } from "../../hooks/auth/useAuthUser";

const Dashboard: FC = () => {

    const user = useAuthUser();

    return (
        <div className="container mx-auto mt-5 mb-5 px-4">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/4 w-full">
                    <SidebarMenu />
                </div>
                <div className="lg:w-3/4 w-full">
                    <div className="bg-white border-0 rounded-lg shadow-sm">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800">DASHBOARD</h2>
                        </div>
                        <div className="px-6 py-4">
                            {user ? (
                                <p className="text-gray-700">
                                    Selamat Datang, <strong className="text-gray-900">{user.username}</strong>!
                                </p>
                            ) : (
                                <p className="text-gray-700">
                                    Anda belum login. Silakan masuk untuk melanjutkan.
                                </p>
                            )}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;