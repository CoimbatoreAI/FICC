import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import { Package, Grid, TrendingUp, Users, ShoppingCart, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        products: 0,
        categories: 0,
        subCategories: 0,
        revenue: 45200, // Dummy for now
        orders: 12
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const prodData = await api.get('/products');
                const catData = await api.get('/categories');
                const subData = await api.get('/categories/sub/all');
                setStats(prev => ({
                    ...prev,
                    products: prodData.length,
                    categories: catData.length,
                    subCategories: subData.length
                }));
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { title: 'Total Products', value: stats.products, icon: <Package className="text-blue-500" />, trend: '+12%', isPositive: true },
        { title: 'Categories', value: stats.categories, icon: <Grid className="text-orange-500" />, trend: '+2', isPositive: true },
        { title: 'Sub-categories', value: stats.subCategories, icon: <Grid className="text-purple-500" />, trend: '+5', isPositive: true },
    ];

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Overview</h1>
                <p className="text-slate-500 mt-1">Welcome back, Antony. Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {statCards.map((stat, i) => (
                    <Card key={i} className="border-none shadow-premium overflow-hidden group hover:translate-y-[-4px] transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                                <div className="p-3 rounded-xl bg-slate-50 group-hover:bg-white transition-colors">
                                    {stat.icon}
                                </div>
                                <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${stat.isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                    {stat.isPositive ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
                                    {stat.trend}
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-slate-500 text-sm font-medium">{stat.title}</h3>
                                <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="space-y-8">
                {/* Recent Activity or Quick Actions */}
                <Card className="border-none shadow-premium">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Quick Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <button
                                onClick={() => window.location.href = '/admin/products'}
                                className="flex flex-col items-center justify-center p-8 rounded-2xl bg-primary/5 text-primary border border-primary/10 hover:bg-primary/10 transition-all group"
                            >
                                <Package size={32} className="mb-3 group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-lg">Add New Product</span>
                                <p className="text-sm text-slate-500 mt-2">Create new listings with colors and customization</p>
                            </button>
                            <button
                                onClick={() => window.location.href = '/admin/categories'}
                                className="flex flex-col items-center justify-center p-8 rounded-2xl bg-orange-50 text-orange-600 border border-orange-100 hover:bg-orange-100 transition-all group"
                            >
                                <Grid size={32} className="mb-3 group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-lg">Manage Categories</span>
                                <p className="text-sm text-slate-500 mt-2">Organize products into distinct categories</p>
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
