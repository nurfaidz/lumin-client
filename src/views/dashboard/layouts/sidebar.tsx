import { FC } from "react";

import { Link } from "react-router";

const Sidebar: FC = () => {
    return (
        <div className="card border-0 rounded-4 shadow-sm">
            <div className="card-header">
                <h2 className="text-xl font-bold mb-4">Dashboard</h2>
            </div>
            <div className="card-body">
                <div className="list-group">
                    <Link to="/admin/dashboard" className="list-group-item list-group-item-action active">
                        <span className="text-white">Dashboard</span>
                    </Link>

                    <Link to="/admin/users" className="list-group-item list-group-item-action">
                        <span className="text-gray-700">Users</span>
                    </Link>
                    <a href="#" className="list-group-item list-group-item-action" style={{ cursor: 'pointer' }}>Logout</a>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;