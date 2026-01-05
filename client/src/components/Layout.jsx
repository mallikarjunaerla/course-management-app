import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden w-full">
            {/* Sidebar - Remains static in flex flow, effectively fixed left */}
            <Sidebar />

            {/* Right Side Content Wrapper */}
            <div className="flex-1 flex flex-col h-full min-w-0">
                {/* Topbar - Remains static at top of this column */}
                <Topbar />

                {/* Main Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-8 relative scroll-smooth">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
