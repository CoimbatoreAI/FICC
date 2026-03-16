import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import { toast } from '@/hooks/use-toast';
import { Plus, Trash2, Edit2, X, Upload, Check, ChevronDown } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const ManageProducts = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [subCategories, setSubCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        details: '',
        careInstructions: '',
        price: '',
        comparePrice: '',
        category: '',
        subCategory: '',
        sizes: [] as string[],
        colors: [] as { name: string; hex: string }[],
        isCustomizable: false,
    });

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [newSize, setNewSize] = useState('');
    const [newColor, setNewColor] = useState({ name: '', hex: '#000000' });

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const [prodData, catData, subData] = await Promise.all([
                api.get('/products'),
                api.get('/categories'),
                api.get('/categories/sub/all')
            ]);
            setProducts(prodData);
            setCategories(catData);
            setSubCategories(subData);
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to fetch data" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setImageFiles(prev => [...prev, ...files]);

            const previews = files.map(file => URL.createObjectURL(file));
            setImagePreviews(prev => [...prev, ...previews]);
        }
    };

    const removeImage = (index: number) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const addSize = () => {
        if (newSize && !formData.sizes.includes(newSize)) {
            setFormData({ ...formData, sizes: [...formData.sizes, newSize] });
            setNewSize('');
        }
    };

    const addColor = () => {
        if (newColor.name && newColor.hex) {
            setFormData({ ...formData, colors: [...formData.colors, newColor] });
            setNewColor({ name: '', hex: '#000000' });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('productData', JSON.stringify({
            ...formData,
            price: Number(formData.price),
            comparePrice: formData.comparePrice ? Number(formData.comparePrice) : undefined,
        }));

        imageFiles.forEach(file => {
            data.append('images', file);
        });

        try {
            if (editingProduct) {
                await api.putFormData(`/products/${editingProduct._id}`, data);
                toast({ title: "Success", description: "Product updated successfully" });
            } else {
                await api.postFormData('/products', data);
                toast({ title: "Success", description: "Product created successfully" });
            }
            setIsDialogOpen(false);
            resetForm();
            fetchInitialData();
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to save product" });
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            details: '',
            careInstructions: '',
            price: '',
            comparePrice: '',
            category: '',
            subCategory: '',
            sizes: [],
            colors: [],
            isCustomizable: false,
        });
        setImageFiles([]);
        setImagePreviews([]);
        setEditingProduct(null);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                toast({ title: "Deleted", description: "Product removed" });
                fetchInitialData();
            } catch (error) {
                toast({ variant: "destructive", title: "Error", description: "Delete failed" });
            }
        }
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Manage Products</h1>
                    <p className="text-slate-500">Add and edit your inventory</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Button className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                            <Plus className="mr-2 h-4 w-4" /> Add Product
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-8 pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Basic Info */}
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold">Product Name</label>
                                        <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold">Price (₹)</label>
                                            <Input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold">Compare Price (₹)</label>
                                            <Input type="number" value={formData.comparePrice} onChange={e => setFormData({ ...formData, comparePrice: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold">Category</label>
                                            <select
                                                className="w-full h-10 px-3 rounded-md border border-input focus:ring-1 focus:ring-primary outline-none"
                                                value={formData.category}
                                                onChange={e => setFormData({ ...formData, category: e.target.value, subCategory: '' })}
                                                required
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold">Sub Category</label>
                                            <select
                                                className="w-full h-10 px-3 rounded-md border border-input focus:ring-1 focus:ring-primary outline-none"
                                                value={formData.subCategory}
                                                onChange={e => setFormData({ ...formData, subCategory: e.target.value })}
                                                disabled={!formData.category}
                                            >
                                                <option value="">Select Sub Category</option>
                                                {subCategories.filter(s => s.category?._id === formData.category).map(s => (
                                                    <option key={s._id} value={s._id}>{s.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold">Description</label>
                                        <Textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="h-24" />
                                    </div>
                                </div>

                                {/* Variations & Media */}
                                <div className="space-y-6">
                                    {/* Image Upload */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold">Product Images</label>
                                        <div className="flex flex-wrap gap-3">
                                            {imagePreviews.map((url, i) => (
                                                <div key={i} className="relative w-20 h-20 group">
                                                    <img src={url} alt="" className="w-full h-full object-cover rounded-lg border border-slate-200" />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(i)}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                            <label className="w-20 h-20 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-primary hover:bg-slate-50 transition-all">
                                                <Upload size={20} className="text-slate-400" />
                                                <span className="text-[10px] text-slate-500 font-medium mt-1">Upload</span>
                                                <input type="file" multiple onChange={handleImageChange} className="hidden" accept="image/*" />
                                            </label>
                                        </div>
                                    </div>

                                    {/* Sizes */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold">Sizes</label>
                                        <div className="flex gap-2">
                                            <Input placeholder="e.g. XL, 42, Medium" value={newSize} onChange={e => setNewSize(e.target.value)} />
                                            <Button type="button" variant="outline" onClick={addSize}><Plus size={16} /></Button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.sizes.map((s, i) => (
                                                <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded-md flex items-center">
                                                    {s} <X size={12} className="ml-1 cursor-pointer" onClick={() => setFormData({ ...formData, sizes: formData.sizes.filter((_, idx) => idx !== i) })} />
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Colors */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold">Product Colors</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input placeholder="Color Name (e.g. Navy Blue)" value={newColor.name} onChange={e => setNewColor({ ...newColor, name: e.target.value })} />
                                            <div className="flex gap-2">
                                                <Input type="color" className="p-1 h-10 w-16" value={newColor.hex} onChange={e => setNewColor({ ...newColor, hex: e.target.value })} />
                                                <Button type="button" variant="outline" className="flex-1" onClick={addColor}><Plus size={16} /></Button>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {formData.colors.map((c, i) => (
                                                <div key={i} className="flex items-center gap-2 px-2 py-1 bg-slate-100 rounded-lg group">
                                                    <div className="w-4 h-4 rounded-full border border-slate-200" style={{ backgroundColor: c.hex }} title={c.name} />
                                                    <span className="text-xs font-medium">{c.name}</span>
                                                    <X size={12} className="text-slate-400 cursor-pointer opacity-0 group-hover:opacity-100" onClick={() => setFormData({ ...formData, colors: formData.colors.filter((_, idx) => idx !== i) })} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Customization Toggle */}
                                    <div className="flex items-center gap-3 p-4 bg-accent/5 border border-accent/10 rounded-xl">
                                        <input
                                            type="checkbox"
                                            id="isCustomizable"
                                            className="w-4 h-4 accent-primary"
                                            checked={formData.isCustomizable}
                                            onChange={e => setFormData({ ...formData, isCustomizable: e.target.checked })}
                                        />
                                        <label htmlFor="isCustomizable" className="text-sm font-bold text-navy cursor-pointer">
                                            Allow Customization (Embroidery/Printing)
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-6 flex justify-end gap-4">
                                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                                <Button type="submit" className="px-8 bg-primary">Save Product</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <Card key={product._id} className="overflow-hidden border-none shadow-premium hover:shadow-xl transition-all duration-300">
                        <div className="relative aspect-square">
                            <img
                                src={product.images[0] ? `/${product.images[0]}` : 'https://placehold.co/400x400?text=No+Image'}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 flex gap-1">
                                <button onClick={() => { setEditingProduct(product); setFormData({ ...product, price: product.price.toString(), comparePrice: product.comparePrice?.toString() || '' }); setIsDialogOpen(true); }} className="p-2 bg-white/90 backdrop-blur rounded-full text-slate-600 hover:text-primary transition-colors shadow-sm">
                                    <Edit2 size={14} />
                                </button>
                                <button onClick={() => handleDelete(product._id)} className="p-2 bg-white/90 backdrop-blur rounded-full text-slate-600 hover:text-red-500 transition-colors shadow-sm">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-slate-900 line-clamp-1">{product.name}</h3>
                                <span className="text-primary font-bold">₹{product.price}</span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-3">
                                <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded uppercase font-bold tracking-wider">
                                    {product.category?.name}
                                </span>
                                {product.sizes?.length > 0 && (
                                    <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded uppercase font-bold">
                                        {product.sizes.length} Sizes
                                    </span>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </AdminLayout>
    );
};

export default ManageProducts;
