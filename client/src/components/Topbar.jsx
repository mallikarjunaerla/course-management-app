import React from 'react';
import { Search, Bell, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Topbar = () => {
    const { user, logout } = useAuth();

    return (
        <header className="h-16 bg-[#1a1c23] border-b border-gray-800 flex items-center justify-between px-8 text-gray-400 flex-shrink-0 z-40">
            {/* Search */}
            <div className="flex items-center gap-3 w-96">
                <Search size={20} />
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent border-none focus:outline-none text-white w-full placeholder-gray-500"
                />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-6">
                <button className="hover:text-white transition-colors relative">
                    <MessageSquare size={20} />
                </button>
                <button className="hover:text-white transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">5</span>
                </button>

                <div className="h-8 w-[1px] bg-gray-700 mx-2"></div>

                <div className="flex items-center gap-3 cursor-pointer group relative">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="text-sm font-medium text-white hidden sm:block">
                        {user?.name || 'User'}
                    </span>

                    {/* Simple Dropdown for Logout */}
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block text-gray-800 z-50">
                        <button
                            onClick={logout}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
