import { FC } from "react";
import SidebarMenu from "../../../components/sidebar";
import { Link } from "react-router";
import { useUsers, User } from "../../../hooks/user/userUser";

const UserIndex: FC  = () => {
    const {data: users, isLoading, isError, error} = useUsers();

    return (
    <div className="container mx-auto mt-5 mb-5 px-4">
        <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/4 w-full">
                <SidebarMenu />
            </div>
            
            <div className="lg:w-3/4 w-full">
                <div className="bg-white border-0 rounded-lg shadow-sm">

                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800">Users</h2>
                            <Link to="/admin/users/create" className="text-blue-500 hover:text-blue-700">
                                Add User
                            </Link>
                        </div>
                        <div className="px-6 py-4">

                            {isLoading && (
                                <div className="alert alert-danger text-center">
                                    Loading...
                                </div>
                            )}

                            {isError && (
                                <div className="alert alert-danger text-center">
                                    Error: {error.message}
                                </div>
                            )}

                            <table className="min-w-full divide-y table divide-gray-200">
                                <thead className="bg-gray-50 text-white">
                                    <tr>
                                        <th scope="col">Full Name</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Email</th>
                                        <th scope="col" style={{ width: "20%" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users?.map((user: User) => (
                                            <tr key={user.id} className="hover:bg-gray-100 transition-colors duration-200">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.username}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link to={`/admin/users/${user.id}/edit`} className="text-blue-600 hover:text-blue-900 mr-2">Edit</Link>
                                                    <button 
                                                        className="text-red-600 hover:text-red-900"
                                                        onClick={() => {
                                                            if (window.confirm("Are you sure you want to delete this user?")) {
                                                                // Call delete user function here
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            
                        </div>

                </div>
            </div>
        </div>
    </div>
    )
}

export default UserIndex;