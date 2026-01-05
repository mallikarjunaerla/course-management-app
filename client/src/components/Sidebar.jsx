import React from 'react';
import { LayoutDashboard, ShoppingCart, Tag, Users, FileText, Settings, HelpCircle, Mail, Ticket } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard-dummy' },
        { icon: FileText, label: 'Orders', path: '/orders-dummy', badge: '16' },
        { icon: Tag, label: 'Products', path: '/products-dummy' },
        { icon: LayoutDashboard, label: 'Categories', path: '/', active: true },
        { icon: Users, label: 'Customers', path: '/customers-dummy' },
        { icon: FileText, label: 'Reports', path: '/reports-dummy' },
        { icon: Ticket, label: 'Coupons', path: '/coupons-dummy' },
        { icon: Mail, label: 'Inbox', path: '/inbox-dummy' },
    ];

    return (
        <aside className="w-64 bg-[#1a1c23] text-gray-400 flex flex-col flex-shrink-0 z-50 h-full">
            <div className="p-6 flex items-center gap-3 text-white">
                <div className="bg-orange-500 p-2 rounded-lg">
                    <ShoppingCart size={24} className="text-white" />
                </div>
                <h1 className="text-xl font-bold tracking-wide">FastCart</h1>
            </div>

            <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${item.active || location.pathname === item.path
                                ? 'bg-white text-blue-600 shadow-md font-bold'
                                : 'hover:bg-gray-800 hover:text-white text-gray-400'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <item.icon size={20} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </div>
                        {item.badge && (
                            <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {item.badge}
                            </span>
                        )}
                    </Link>
                ))}

                <div className="pt-8 pb-2 px-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Other Information
                </div>
                <Link to="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-white transition-colors">
                    <HelpCircle size={20} />
                    <span className="font-medium text-sm">Knowledge Base</span>
                </Link>
                <Link to="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-white transition-colors">
                    <Tag size={20} />
                    <span className="font-medium text-sm">Product Updates</span>
                </Link>

                <div className="pt-8 pb-2 px-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Settings
                </div>
                <Link to="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-white transition-colors">
                    <Users size={20} />
                    <span className="font-medium text-sm">Personal Settings</span>
                </Link>
                <Link to="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-white transition-colors">
                    <Settings size={20} />
                    <span className="font-medium text-sm">Global Settings</span>
                </Link>
            </nav>
        </aside>
    );
};

export default Sidebar;
