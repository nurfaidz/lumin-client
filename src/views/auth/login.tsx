import { FC, useState, useContext, FormEvent } from "react";
import { useNavigate } from "react-router";
import { useLogin } from "../../hooks/auth/useLogin";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";

interface ValidationErrors {
    [key: string]: string;
}

const Login: FC = () => {

  // Initialize navigate and useLogin hook
  const navigate = useNavigate();

  // Using useLogin hook to handle login mutation
  const {mutate, isPending} = useLogin();

  // Using AuthContext to manage authentication state
  const { setIsAuthenticated } = useContext(AuthContext)!;

  // Define state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const [loading, setLoading] = useState(false);
  const [errors, setError] = useState<ValidationErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError({});

    mutate({
        username,
        password
    }, {
        onSuccess: (data: any) => {
            // Set token to cookies
            Cookies.set("token", data.data.token);

            // Set user to cookies
            Cookies.set("user", JSON.stringify({
                id: data.data.id,
                name: data.data.name,
                username: data.data.username,
                email: data.data.email
            }));

            // Set isAuthenticated to true
            setIsAuthenticated(true);

            // redirect to dashboard
            navigate("/admin/dashboard");
        },
        onError: (error: any) => {
            if (error.response?.status === 422) {
                if (error.response.data?.data && typeof error.response.data.data === 'object') {
                    setError(error.response.data.data);
                } else {
                    setError({general: "Validation failed. Please check your input."});
                }
            } else if (error.response?.status === 401) {
                const message = error.response.data?.message || "Invalid credentials";
                setError({general: message});
            } else {
                const message = error.response?.data?.message || "Login failed. Please try again.";
                setError({general: message});
            }
        }
    })
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-blue-500 bg-gradient-to-tl from-blue-500 to-blue-700 p-4">
      <div className="card w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Lumin Research Client</h1>
            <p className="text-gray-600">Sign in to your account</p>
        </div>

        {errors.general && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {errors.general}
            </div>
        )}

        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your username"
                    disabled={isPending}
                    />
                {errors.Username && (
                            <div className="mt-2 p-2 bg-red-100 text-red-700 rounded text-sm">
                                {errors.Username}
                            </div>
                        )}
            </div>

            <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                </div>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                    disabled={isPending}
                    />
                {errors.Password && (
                            <div className="mt-2 p-2 bg-red-100 text-red-700 rounded text-sm">
                                {errors.Password}
                            </div>
                        )}
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 ease-in-out disabled:opacity-70"
                >
                    {isPending ? "Signing in..." : "Sign In"}
                </button>
        </form>

        <div className="mt-6 text-center">
            <p className="text-gray-600">
                Don't have an account?{""}
                <a href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                    Sign Up
                </a>
            </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
