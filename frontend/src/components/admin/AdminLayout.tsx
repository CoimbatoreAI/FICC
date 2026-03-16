import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    Grid,
    LogOut,
    Menu,
    X,
    ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    const navItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
        { name: 'Products', icon: <Package size={20} />, path: '/admin/products' },
        { name: 'Categories', icon: <Grid size={20} />, path: '/admin/categories' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? 'w-64' : 'w-20'
                    } bg-white border-r border-slate-200 transition-all duration-300 flex flex-col z-50`}
            >
                <div className="p-6 flex items-center justify-between border-b border-slate-100">
                    {isSidebarOpen && <span className="font-bold text-xl text-primary tracking-tight">FICC ADMIN</span>}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
                    >
                        {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${location.pathname === item.path
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'text-slate-600 hover:bg-slate-100'
                                }`}
                        >
                            <span className={`${location.pathname === item.path ? 'text-white' : 'text-slate-400 group-hover:text-primary'}`}>
                                {item.icon}
                            </span>
                            {isSidebarOpen && <span className="ml-3 font-medium">{item.name}</span>}
                            {isSidebarOpen && location.pathname === item.path && (
                                <ChevronRight size={16} className="ml-auto opacity-70" />
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className={`w-full flex items-center ${isSidebarOpen ? 'justify-start' : 'justify-center'} text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl py-3 px-4`}
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="ml-3 font-medium">Logout</span>}
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-end px-8 sticky top-0 z-40">
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-slate-700">Admin User</span>
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs border border-primary/20">
                            AD
                        </div>
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
