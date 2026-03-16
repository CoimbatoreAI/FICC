import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import { toast } from '@/hooks/use-toast';
import { Plus, Trash2, Edit2, ChevronDown, ChevronRight, FolderPlus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const ManageCategories = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [subCategories, setSubCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCatDialogOpen, setIsCatDialogOpen] = useState(false);
    const [isSubDialogOpen, setIsSubDialogOpen] = useState(false);

    const [catName, setCatName] = useState('');
    const [catDesc, setCatDesc] = useState('');
    const [catId, setCatId] = useState<string | null>(null);

    const [subName, setSubName] = useState('');
    const [selectedCat, setSelectedCat] = useState('');

    const fetchAll = async () => {
        try {
            setLoading(true);
            const cats = await api.get('/categories');
            const subs = await api.get('/categories/sub/all');
            setCategories(cats);
            setSubCategories(subs);
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to fetch categories" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = { name: catName, description: catDesc };
            if (catId) {
                // Update logic (simplified for now as backend supports json)
                await api.post(`/categories/${catId}`, data);
                toast({ title: "Success", description: "Category updated" });
            } else {
                await api.post('/categories', data);
                toast({ title: "Success", description: "Category created" });
            }
            setCatName('');
            setCatDesc('');
            setCatId(null);
            setIsCatDialogOpen(false);
            fetchAll();
        } catch (err) {
            toast({ variant: "destructive", title: "Error", description: "Operation failed" });
        }
    };

    const handleAddSubCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/categories/sub', { name: subName, category: selectedCat });
            toast({ title: "Success", description: "Subcategory created" });
            setSubName('');
            setIsSubDialogOpen(false);
            fetchAll();
        } catch (err) {
            toast({ variant: "destructive", title: "Error", description: "Failed to create subcategory" });
        }
    };

    const handleDeleteCat = async (id: string) => {
        if (confirm('Delete category and all subcategories?')) {
            await api.delete(`/categories/${id}`);
            fetchAll();
        }
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Categories & Sub-categories</h1>
                    <p className="text-slate-500">Organize your product hierarchy</p>
                </div>
                <div className="flex gap-4">
                    <Dialog open={isCatDialogOpen} onOpenChange={setIsCatDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={() => { setCatId(null); setCatName(''); setCatDesc(''); }} className="bg-primary hover:bg-primary/90">
                                <Plus className="mr-2 h-4 w-4" /> Add Category
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{catId ? 'Edit Category' : 'Add New Category'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleAddCategory} className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Category Name</label>
                                    <Input value={catName} onChange={e => setCatName(e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Description</label>
                                    <Input value={catDesc} onChange={e => setCatDesc(e.target.value)} />
                                </div>
                                <Button type="submit" className="w-full">{catId ? 'Update' : 'Create'}</Button>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={isSubDialogOpen} onOpenChange={setIsSubDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <FolderPlus className="mr-2 h-4 w-4" /> Add Sub-category
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Sub-category</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleAddSubCategory} className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Parent Category</label>
                                    <select
                                        className="w-full h-10 px-3 rounded-md border border-input"
                                        value={selectedCat}
                                        onChange={(e) => setSelectedCat(e.target.value)}
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map(cat => (
                                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Sub-category Name</label>
                                    <Input value={subName} onChange={e => setSubName(e.target.value)} required />
                                </div>
                                <Button type="submit" className="w-full">Create Sub-category</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <p>Loading components...</p>
                ) : categories.map(cat => (
                    <Card key={cat._id} className="border-none shadow-sm hover:shadow-md transition-shadow duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-bold text-slate-800">{cat.name}</CardTitle>
                            <div className="flex gap-2">
                                <button onClick={() => { setCatId(cat._id); setCatName(cat.name); setCatDesc(cat.description || ''); setIsCatDialogOpen(true); }} className="p-1.5 text-slate-400 hover:text-primary transition-colors">
                                    <Edit2 size={16} />
                                </button>
                                <button onClick={() => handleDeleteCat(cat._id)} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-500 mb-4">{cat.description || 'No description'}</p>
                            <div className="space-y-2">
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Sub-categories</h4>
                                <div className="flex flex-wrap gap-2">
                                    {subCategories.filter(sub => sub.category?._id === cat._id).map(sub => (
                                        <span key={sub._id} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                                            {sub.name}
                                        </span>
                                    ))}
                                    {subCategories.filter(sub => sub.category?._id === cat._id).length === 0 && (
                                        <span className="text-xs text-slate-400 italic">No sub-categories</span>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </AdminLayout>
    );
};

export default ManageCategories;
