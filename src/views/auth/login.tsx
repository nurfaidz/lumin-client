import { FC, useState } from "react";
import { Link } from "react-router";

const Login: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      console.log("Logging in...");

      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (err) {
      setError("Invalid email or password");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-blue-500 bg-gradient-to-tl from-blue-500 to-blue-700 p-4">
      <div className="card w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Lumin Research Client</h1>
            <p className="text-gray-600">Sign in to your account</p>
        </div>

        {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
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
                    disabled={loading}
                    />
            </div>

            <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                        Forgot Password?
                    </a>
                </div>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                    disabled={loading}
                    />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 ease-in-out disabled:opacity-70"
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>
        </form>

        <div className="mt-6 text-center">
            <p className="text-gray-600">
                Don't have an account?{""}
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                    Sign Up
                </a>
            </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
