import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const API_URL = import.meta.env.VITE_API_URL || '/api';
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('adminToken', data.token);
                toast({
                    title: "Login Successful",
                    description: "Welcome to the Admin Dashboard",
                });
                navigate('/admin/dashboard');
            } else {
                toast({
                    variant: "destructive",
                    title: "Login Failed",
                    description: data.message || "Invalid credentials",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not connect to the server",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md shadow-xl border-none">
                <CardHeader className="space-y-1 text-center bg-primary rounded-t-lg py-8">
                    <CardTitle className="text-3xl font-bold text-white tracking-tight">FICC ADMIN</CardTitle>
                    <p className="text-primary-foreground/80">Manage your clothing company</p>
                </CardHeader>
                <CardContent className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                            <Input
                                type="email"
                                placeholder="example@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-12 border-gray-200 focus:border-primary focus:ring-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-12 border-gray-200 focus:border-primary focus:ring-primary"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-300"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>
                    <div className="mt-8 text-center text-sm text-gray-500">
                        &copy; 2024 First India Clothing Company
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminLogin;
