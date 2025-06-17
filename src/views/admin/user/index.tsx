import { FC } from "react";
import SidebarMenu from "../../../components/sidebar";
import { Link } from "react-router";
import { useUsers, User } from "../../../hooks/user/userUser";
import { useQueryClient } from "@tanstack/react-query";
import { useUserDelete } from "../../../hooks/user/useUserDelete";

const UserIndex: FC  = () => {
    const {data: users, isLoading, isError, error} = useUsers();

    // initalize useQueryClient
    const queryClient = useQueryClient();

    // initialize useUserDelete
    const {mutate, isPending} = useUserDelete();

    const handleDelete = (id: number) => {
        if (confirm("Are you sure want to delete this user")) {
            mutate(id, {
                onSuccess: () => {
                    // refresh data
                    queryClient.invalidateQueries({queryKey: ['users']});
                }
            });
        }
    }

    return (
    <div className="container mx-auto mt-5 mb-5 px-4">
        <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/4 w-full">
                <SidebarMenu />
            </div>
            
            <div className="lg:w-3/4 w-full">
                <div className="bg-white border-0 rounded-lg shadow-sm">

                        <div className="px-6 py-4 border-b bg-gradient-to-r from-blue-500 to-blue-600 flex items-start justify-center">
                            <h2 className="text-lg font-semibold text-white">Users</h2>
                            <button className="ml-auto bg-gray-600 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition-colors duration-200">
                                <Link to="/admin/users/create" className="text-white hover:text-gray-200">
                                    Add User
                                </Link>
                            </button>
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
                                                    <Link to={`/admin/users/${user.id}/edit`} className="text-gray-300 hover:text-gray-100 mr-2 bg-blue-600 rounded-md shadow-sm border-0 me-2 p-2">Edit</Link>
                                                    <button 
                                                        className="bg-red-600 p-2 rounded-md shadow-sm border-0 text-gray-300 hover:text-gray-100"
                                                        onClick={() => handleDelete(user.id)}
                                                        disabled={isPending}
                                                    >
                                                        { isPending ? 'Deleting...' : 'Delete' }
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