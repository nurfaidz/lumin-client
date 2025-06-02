import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { useRegister } from "../../hooks/auth/userRegister";
import { Link } from "react-router";

interface ValidationError {
    [key: string]: string;
}

const Register: FC = () => {

    // initialize navigate and useRegister hook
    const navigate = useNavigate();
    const {mutate, isPending} = useRegister();

    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [errors, setError] = useState<ValidationError>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError({});

        if (!username || !email || !password || !confirmPassword) {
            setError({general: "All fields are required"});
            return;
        }

        if (password !== confirmPassword) {
            setError({general: "Passwords do not match"});
            return;
        }
        if (password.length < 8) {
            setError({general: "Password must be at least 8 characters long"});
            return;
        }

        mutate({
            name,
            username,
            email,
            password
           }, {
            onSuccess: () => {
                navigate("/login");
            },
            onError: (error: any) => {
                console.log(error);
                if (error.response?.data?.errors) {
                    setError(error.response.data.errors);
                } else {
                    setError({general: "Registration failed. Please try again."});
                }
            }
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-blue-500 bg-gradient-to-tl from-blue-500 to-blue-700 p-4">
            <div className="card w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Lumin Research Client</h1>
                    <p className="text-gray-600">Create a new account</p>
                </div>

            {errors.general && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {errors.general}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your name"
                    />
                    {errors.Name && <div className="alert alert-danger mt-2">{errors.Name}</div>}
                </div>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your username"
                    />
                    {errors.Username && <div className="alert alert-danger mt-2">{errors.Username}</div>}
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your email"
                    />
                    {errors.Email && <div className="alert alert-danger mt-2">{errors.Email}</div>}
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your password"
                    />
                        <p className="mt-1 text-xs text-gray-500">
                        Password must be at least 8 characters long
                        </p>
                    {errors.Password && <div className="alert alert-danger mt-2">{errors.Password}</div>}
                </div>

                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Confirm your password"
                    />
                    {errors.ConfirmPassword && <div className="alert alert-danger mt-2">{errors.ConfirmPassword}</div>}
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 ease-in-out disabled:opacity-70"
                    >
                        {isPending ? "Creating account..." : "Create Account"}
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    </div>
    );
};

export default Register;