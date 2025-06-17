import { FC, useState, useEffect, FormEvent } from "react";
import SidebarMenu from "../../../components/sidebar";
import { useNavigate, useParams, Link } from "react-router";
import { useUserById } from "../../../hooks/user/useUserById";
import { useUserUpdate } from "../../../hooks/user/useUserUpdate";

interface ValidationErrors {
    [key: string]: string;
}

const UserEdit: FC = () => {
    // initialize useNavigate
    const navigate = useNavigate();
    // initialize useParams
    const {id} = useParams();

    // define sstate for user data
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // define state errors
    const [errors, setErrors] = useState<ValidationErrors>({});

    const  { data:user } = useUserById(Number(id));

    useEffect(() => {
        if (user) {
            setName(user.name);
            setUsername(user.username);
            setEmail(user.email)
        }
    }, [user]);

    //  initialize isPending
    const { mutate, isPending } = useUserUpdate();

    // handle form submit
    const updateUser = async (e: FormEvent) => {
        e.preventDefault();

        // Call the user update mutation
        mutate({
            id: Number(id),
            data: {
                name,
                username,
                email,
                password
            }
        }, {
            onSuccess: () => {
                navigate("/admin/users");
            },
            onError: (error: any) => {
                if (error.response?.status === 422) {
                    if (error.response.data?.data && typeof error.response.data.data === 'object') {
                        setErrors(error.response.data.data);
                    } else {
                        setErrors({general: "An error occured while creating the user"});
                    }
                } else if (error.response?.status === 500) {
                    const message = error.response?.data?.message || "An internal server error occured.";
                    setErrors({general: message});
                } else if (error.response?.status === 401) {
                    setErrors({general: "Unauthorized access. Please log in again"});
                } else {
                    setErrors({general: "An unexpected error occurred. Please try again later."});
                }
            }
        })

    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/4 w-full">
                        <SidebarMenu />
                    </div>

                    <div className="lg:w-3/4 w-full bg-white rounded-lg shadow-lg border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-5">                            
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-white">
                                    Edit User
                                </h2>
                                <Link to="/admin/users" className="text-blue-600 hover:text-blue-800">
                                    Back to Users
                                </Link>
                            </div>
                        </div>

                        <div className="p-8">
                        {errors.general && (
                            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-center">
                                    <div className="flex-shrin-0">
                                        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-800">{errors.general}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                            <form onSubmit={updateUser} className="space-y-6">
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
                                        />
                                        {errors.Name && (
                                            <p className="text-sm text-red-600 mt-1">{errors.Name}</p>
                                        )}
                                </div>

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
                                        />
                                        {errors.Username && (
                                            <p className="text-sm text-red-600 mt-1">{errors.Username}</p>
                                        )}
                                </div>

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
                                    />
                                    {errors.Email && (
                                        <p className="text-sm text-red-600 mt-1">{errors.Email}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) =>setPassword(e.target.value)}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                            errors.Password ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                        }`}
                                    />
                                    {errors.Password && (
                                        <p className="text-sm text-red-600 mt-1">{errors.Password}</p>
                                    )}
                                </div>

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
    )
}

export default UserEdit;

