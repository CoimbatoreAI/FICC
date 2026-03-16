import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { api } from "@/lib/api";

const categories = [
    { id: "school", title: "School Uniform" },
    { id: "corporate", title: "Corporate Uniform" },
    { id: "hospitality", title: "Hospitality & Hotel" },
    { id: "healthcare", title: "Hospital & Medical" },
    { id: "industrial", title: "Industrial & Workwear" },
    { id: "police", title: "Police & Security" },
    { id: "military", title: "Military & Tactical" },
    { id: "salon", title: "Salon & Wellness" },
    { id: "sports", title: "Sports & Athletics" },
    { id: "customize", title: "Custom Fabrics" }
];

const FilterAccordion = ({ title, children, defaultOpen = true }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-gray-100 py-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center group"
            >
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a] group-hover:text-accent transition-colors">
                    {title}
                </span>
                {isOpen ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-6">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Uniforms = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get("category");
    const typeParam = searchParams.get("type")?.toLowerCase();
    const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");
    const [sortBy, setSortBy] = useState("best-selling");
    const [realProducts, setRealProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await api.get('/products');
                // Map backend data to frontend interface if needed
                const normalized = data.map((p: any) => ({
                    ...p,
                    id: p._id,
                    image: p.images && p.images[0] ? `/${p.images[0]}` : 'https://placehold.co/400x400?text=No+Image',
                    category: p.category?.slug || p.category // Use slug for filtering
                }));
                setRealProducts(normalized);
            } catch (err) {
                console.error("Failed to fetch products", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        setSelectedCategory(categoryParam || "all");
    }, [categoryParam]);

    const filteredProducts = useMemo(() => {
        let base = realProducts;

        if (selectedCategory !== "all") {
            base = base.filter(p => p.category === selectedCategory);
        }

        if (typeParam) {
            base = base.filter(p =>
                p.subcategory?.toLowerCase().includes(typeParam) ||
                p.name.toLowerCase().includes(typeParam)
            );
        }

        if (sortBy === "price-low") base = [...base].sort((a, b) => a.price - b.price);
        if (sortBy === "price-high") base = [...base].sort((a, b) => b.price - a.price);

        return base;
    }, [realProducts, selectedCategory, typeParam, sortBy]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categoryParam, typeParam]);

    return (
        <div className="min-h-screen bg-white text-[#1a1a1a]">
            <Navbar />

            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="pt-24 md:pt-32"
            >
                <div className="container-narrow px-6 lg:px-12">
                    {/* Header Breadcrumb */}
                    <div className="mb-12">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-[10px] uppercase tracking-widest text-[#999]">Home</span>
                            <span className="text-[10px] uppercase tracking-widest text-[#999]">/</span>
                            <span className="text-[10px] uppercase tracking-widest text-[#1a1a1a] font-bold">
                                {selectedCategory === "all" ? "Our Collections" : categories.find(c => c.id === selectedCategory)?.title}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight uppercase">
                            {selectedCategory === "all" ? "All Products" : categories.find(c => c.id === selectedCategory)?.title}
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 lg:gap-16">
                        {/* Sidebar Filters */}
                        <aside className="space-y-2">
                            <FilterAccordion title="Filter by Price">
                                <div className="space-y-4">
                                    {["Under ₹1,000", "₹1,000 - ₹5,000", "₹5,000 - ₹10,000", "Over ₹10,000"].map(range => (
                                        <label key={range} className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="w-4 h-4 border-[#e5e5e5] rounded text-accent focus:ring-accent" />
                                            <span className="text-[13px] text-[#666] group-hover:text-[#1a1a1a] transition-colors">{range}</span>
                                        </label>
                                    ))}
                                </div>
                            </FilterAccordion>

                            <FilterAccordion title="Size">
                                <div className="grid grid-cols-4 gap-2">
                                    {["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"].map(size => (
                                        <button
                                            key={size}
                                            className="h-10 border border-gray-100 flex items-center justify-center text-[10px] font-bold hover:border-black transition-colors"
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </FilterAccordion>

                            <div className="pt-8">
                                <button className="w-full bg-black text-white py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-accent transition-colors active:scale-95">
                                    Apply Filters
                                </button>
                            </div>
                        </aside>

                        {/* Main Content Area */}
                        <div>
                            {/* Sort & Count Bar */}
                            <div className="flex flex-col sm:flex-row justify-between items-center pb-8 mb-8 border-b border-gray-100 gap-4">
                                <div className="text-[13px] text-[#1a1a1a]">
                                    <span className="font-bold">{filteredProducts.length}</span> products
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#999]">Sort by:</span>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="text-[11px] font-bold uppercase tracking-widest border-none p-0 focus:ring-0 cursor-pointer bg-white"
                                    >
                                        <option value="best-selling">Best selling</option>
                                        <option value="newest">New arrivals</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                    </select>
                                </div>
                            </div>

                            {/* Product Grid */}
                            {filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
                                    {filteredProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-32 bg-[#f9f9f9] rounded-2xl border border-dashed border-gray-200">
                                    <X size={40} className="text-gray-200 mx-auto mb-6" />
                                    <p className="text-[11px] uppercase tracking-widest font-bold text-gray-400 max-w-sm mx-auto">
                                        No products match your current filters.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.main>
            <Footer />
        </div>
    );
};

export default Uniforms;
