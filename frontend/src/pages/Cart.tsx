import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
    const shipping = cartItems.length > 0 ? 150 : 0;
    const total = cartTotal + shipping;

    return (
        <div className="min-h-screen pt-20">
            <Navbar />

            <main className="section-padding">
                <div className="container-narrow">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                            <ShoppingBag size={28} />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-display font-bold text-navy italic uppercase tracking-tighter">Your Cart</h1>
                    </div>

                    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12">
                        {/* Cart Items */}
                        <div className="lg:col-span-8 space-y-6">
                            {cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <motion.div
                                        key={`${item.id}-${item.size}-${item.color}`}
                                        layout
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col sm:flex-row gap-8 p-6 md:p-8 bg-white border border-navy/5 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 group"
                                    >
                                        <div className="w-full sm:w-40 aspect-[3/4] rounded-[1.5rem] overflow-hidden bg-navy/[0.02] border border-navy/5">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                        </div>

                                        <div className="flex-grow flex flex-col justify-between">
                                            <div>
                                                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-2">
                                                    <h3 className="text-xl md:text-2xl font-display font-bold text-navy italic uppercase tracking-tighter">{item.name}</h3>
                                                    <p className="text-xl font-black text-navy italic">₹{item.price.toLocaleString()}</p>
                                                </div>
                                                <div className="flex flex-wrap gap-4 text-navy/40 text-[9px] uppercase tracking-[0.2em] font-black italic">
                                                    {item.size && <span className="px-3 py-1 bg-navy/5 rounded-full">Size: {item.size}</span>}
                                                    {item.color && <span className="px-3 py-1 bg-navy/5 rounded-full">Color: {item.color}</span>}
                                                    {item.customization && item.customization.type !== "None" && (
                                                        <span className="px-3 py-1 bg-accent/10 text-accent rounded-full">Custom: {item.customization.type}</span>
                                                    )}
                                                    {item.customization?.text && (
                                                        <span className="px-3 py-1 bg-navy/5 rounded-full">Text: {item.customization.text}</span>
                                                    )}
                                                    {item.customization?.logo && (
                                                        <span className="px-3 py-1 bg-navy/5 rounded-full flex items-center gap-2">
                                                            Logo: <img src={item.customization.logo} className="w-4 h-4 rounded object-cover" />
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center mt-8">
                                                <div className="flex items-center bg-navy/[0.03] rounded-full p-1 border border-navy/5">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white hover:text-accent transition-all shadow-sm"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="px-6 font-black text-navy italic">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white hover:text-accent transition-all shadow-sm"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-navy/20 hover:text-accent transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]"
                                                >
                                                    <Trash2 size={14} /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-navy/[0.01] rounded-[2rem] border-2 border-dashed border-navy/5">
                                    <p className="text-navy/20 mb-8 lowercase tracking-[0.4em] font-black italic">Your cart is currently empty.</p>
                                    <Link to="/uniforms" className="bg-navy text-white px-12 py-5 rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:bg-accent transition-all shadow-2xl shadow-navy/20">
                                        Start Browsing
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                            <div className="p-10 bg-navy text-white rounded-[2rem] shadow-2xl shadow-navy/30 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                <h2 className="text-xl md:text-2xl font-display font-bold mb-8 italic uppercase tracking-tighter">Order Summary</h2>

                                <div className="space-y-6 mb-10 text-[10px] uppercase tracking-[0.2em] font-black">
                                    <div className="flex justify-between text-white/40">
                                        <span>Subtotal</span>
                                        <span className="text-white">₹{cartTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-white/40">
                                        <span>Shipping Index</span>
                                        <span className="text-white">₹{shipping.toLocaleString()}</span>
                                    </div>
                                    <div className="h-px bg-white/5 my-4" />
                                    <div className="flex justify-between text-lg md:text-xl font-bold italic">
                                        <span className="text-accent">Total</span>
                                        <span className="text-white">₹{total.toLocaleString()}</span>
                                    </div>
                                </div>

                                <Link
                                    to="/checkout"
                                    className="w-full bg-white text-navy py-5 rounded-full font-black uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-4 hover:bg-accent hover:text-white transition-all shadow-xl active:scale-95"
                                >
                                    Proceed <ArrowRight size={18} />
                                </Link>

                                <p className="text-center text-[8px] text-white/20 mt-6 uppercase tracking-[0.4em] font-black">
                                    Global Logistics Verified
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Cart;
