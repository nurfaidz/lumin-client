import { FC, useState, FormEvent } from "react";
import SidebarMenu from "../../../components/sidebar";
import { useNavigate, Link } from "react-router";
import { useUserCreate } from "../../../hooks/user/useUserCreate";

interface ValidationErrors {
    [key: string]: string;
}

const UserCreate = () => {
    // Initialize navigate and useUserCreate hook
    const navigate = useNavigate();

    // define state user
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // define state errors
    const [errors, setErrors] = useState<ValidationErrors>({});

    // Initialize useUserCreate hook
    const { mutate, isPending } = useUserCreate();

    const storeUser = (e: FormEvent) => {
        e.preventDefault();

        mutate({
            name,
            username,
            email,
            password
        }, {
            onSuccess: () => {
                navigate("/admin/users");
            },
            onError: (error: any) => {
                console.log(error, error.response?.status);
                if (error.response?.status === 422) {
                    if (error.response.data?.data && typeof error.response.data.data === 'object') {
                        setErrors(error.response.data.data);
                    } else {
                        setErrors({ general: "An error occurred while creating the user." });
                    }
                } else if (error.response?.status === 500) {
                    const message = error.response?.data?.message || "An internal server error occurred.";
                    setErrors({ general: message });
                } else if (error.response?.status === 401) {
                    setErrors({ general: "Unauthorized access. Please log in again." });
                } else {
                    setErrors({ general: "An unexpected error occurred. Please try again later." });
                }
            }
        })
    }

    return (
        <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <div className="lg:w-1/4 w-full">
                    <SidebarMenu />
                </div>

                {/* Main Content */}
                <div className="lg:w-3/4 w-full">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                        
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-5">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-white">
                                    Add New User
                                </h2>
                                <Link 
                                    to="/admin/users" 
                                    className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-colors duration-200"
                                >
                                    ← Back to Users
                                </Link>
                            </div>
                        </div>

                        {/* Form Content */}
                        <div className="p-8">
                            {/* General Error Alert */}
                            {errors.general && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-red-800">{errors.general}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={storeUser} className="space-y-6">
                                {/* Full Name Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                            errors.Name ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                        }`}
                                        placeholder="Enter full name"
                                    />
                                    {errors.Name && (
                                        <p className="text-sm text-red-600 mt-1">{errors.Name}</p>
                                    )}
                                </div>

                                {/* Username Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                            errors.Username ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                        }`}
                                        placeholder="Enter username"
                                    />
                                    {errors.Username && (
                                        <p className="text-sm text-red-600 mt-1">{errors.Username}</p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                            errors.Email ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                        }`}
                                        placeholder="Enter email address"
                                    />
                                    {errors.Email && (
                                        <p className="text-sm text-red-600 mt-1">{errors.Email}</p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                            errors.Password ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                        }`}
                                        placeholder="Enter password"
                                    />
                                    {errors.Password && (
                                        <p className="text-sm text-red-600 mt-1">{errors.Password}</p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                    <button 
                                        type="submit" 
                                        disabled={isPending} 
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        {isPending ? (
                                            <div className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Saving...
                                            </div>
                                        ) : (
                                            "Save User"
                                        )}
                                    </button>

                                    <Link 
                                        to="/admin/users" 
                                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default UserCreate;