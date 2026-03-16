import { motion } from "framer-motion";
import { Truck, ShieldCheck, CheckCircle2, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        pincode: ""
    });

    const shipping = cartItems.length > 0 ? 150 : 0;
    const total = cartTotal + shipping;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleWhatsAppRedirect = () => {
        const orderId = `FICC-${Math.floor(10000 + Math.random() * 90000)}`;
        let message = `*New Order: ${orderId}*\n\n`;
        message += `*Customer Details:*\n`;
        message += `Name: ${formData.fullName}\n`;
        message += `Phone: ${formData.phone}\n`;
        message += `Address: ${formData.address}, ${formData.city} - ${formData.pincode}\n\n`;
        message += `*Items:*\n`;

        cartItems.forEach(item => {
            message += `- ${item.name} (x${item.quantity}) - ₹${item.price}\n`;
            message += `  Size: ${item.size || 'N/A'}, Color: ${item.color || 'N/A'}\n`;
            if (item.customization && item.customization.type !== "None") {
                message += `  Custom: ${item.customization.type}\n`;
                if (item.customization.text) message += `  Text: ${item.customization.text}\n`;
            }
            message += `\n`;
        });

        message += `*Total Amount: ₹${total.toLocaleString()}* (incl. shipping)\n\n`;
        message += `Please confirm my order.`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/919500595550?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        setStep(3);
        clearCart();
    };

    return (
        <div className="min-h-screen pt-20">
            <Navbar />

            <main className="section-padding">
                <div className="container-narrow max-w-4xl">
                    <h1 className="text-3xl md:text-5xl font-display font-bold mb-12 text-center text-navy italic uppercase tracking-tighter">Checkout</h1>

                    {/* Progress Bar */}
                    <div className="flex items-center justify-between mb-16 relative">
                        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-border -translate-y-1/2 z-0" />
                        {[
                            { id: 1, label: "Shipping" },
                            { id: 2, label: "WhatsApp" },
                            { id: 3, label: "Review" }
                        ].map(s => (
                            <div key={s.id} className="relative z-10 flex flex-col items-center gap-3">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xs border-2 transition-all duration-500 ${step >= s.id ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20' : 'bg-white border-navy/10 text-navy/20'
                                    }`}>
                                    {step > s.id ? <CheckCircle2 size={24} /> : s.id}
                                </div>
                                <span className={`text-[9px] font-black uppercase tracking-[0.3em] italic transition-colors duration-500 ${step >= s.id ? 'text-navy' : 'text-navy/20'
                                    }`}>{s.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm">
                        {step === 1 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                                <div className="flex items-center gap-4 border-b border-navy/5 pb-6">
                                    <Truck className="text-accent" size={24} />
                                    <h2 className="text-2xl font-display font-bold text-navy italic uppercase tracking-tighter">Shipping Logistics</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-[0.2em] font-black text-navy/30 italic">Full Name</label>
                                        <input name="fullName" value={formData.fullName} onChange={handleChange} type="text" className="w-full bg-navy/[0.02] border border-navy/5 rounded-xl px-5 py-4 text-xs font-bold text-navy focus:outline-none focus:border-accent/40" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-[0.2em] font-black text-navy/30 italic">Phone Number</label>
                                        <input name="phone" value={formData.phone} onChange={handleChange} type="text" className="w-full bg-navy/[0.02] border border-navy/5 rounded-xl px-5 py-4 text-xs font-bold text-navy focus:outline-none focus:border-accent/40" placeholder="+91 98765 43210" />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[9px] uppercase tracking-[0.2em] font-black text-navy/30 italic">Address line 1</label>
                                        <input name="address" value={formData.address} onChange={handleChange} type="text" className="w-full bg-navy/[0.02] border border-navy/5 rounded-xl px-5 py-4 text-xs font-bold text-navy focus:outline-none focus:border-accent/40" placeholder="Street Address" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-[0.2em] font-black text-navy/30 italic">City</label>
                                        <input name="city" value={formData.city} onChange={handleChange} type="text" className="w-full bg-navy/[0.02] border border-navy/5 rounded-xl px-5 py-4 text-xs font-bold text-navy focus:outline-none focus:border-accent/40" placeholder="Coimbatore" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-[0.2em] font-black text-navy/30 italic">Pincode</label>
                                        <input name="pincode" value={formData.pincode} onChange={handleChange} type="text" className="w-full bg-navy/[0.02] border border-navy/5 rounded-xl px-5 py-4 text-xs font-bold text-navy focus:outline-none focus:border-accent/40" placeholder="641001" />
                                    </div>
                                </div>

                                <button
                                    onClick={() => setStep(2)}
                                    disabled={!formData.fullName || !formData.phone}
                                    className="w-full bg-navy text-white py-6 rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:bg-accent transition-all shadow-2xl shadow-navy/20 mt-6 active:scale-95 disabled:opacity-50"
                                >
                                    Proceed to Confirmation
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 text-center">
                                <div className="flex flex-col items-center gap-6 border-b border-navy/5 pb-10">
                                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                                        <MessageSquare size={40} />
                                    </div>
                                    <h2 className="text-3xl font-display font-bold text-navy italic uppercase tracking-tighter text-center">WhatsApp Verification</h2>
                                    <p className="text-navy/40 max-w-sm mx-auto text-[10px] uppercase tracking-[0.2em] font-bold italic leading-relaxed">
                                        We use WhatsApp for instant order confirmation and personalization details. Pressing the button will open WhatsApp with your order manifest.
                                    </p>
                                </div>

                                <div className="space-y-4 py-6 px-8 bg-navy/[0.02] rounded-2xl">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-navy/30">
                                        <span>Order Total</span>
                                        <span className="text-navy">₹{total.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row gap-4 mt-8">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="flex-1 bg-navy/5 text-navy/40 py-6 rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:bg-navy/10 transition-all italic"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleWhatsAppRedirect}
                                        className="flex-[2] bg-green-600 text-white py-6 rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:bg-green-700 transition-all shadow-2xl shadow-green-600/20 active:scale-95 flex items-center justify-center gap-3"
                                    >
                                        <MessageSquare size={16} /> Confirm on WhatsApp
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 space-y-6">
                                <div className="w-24 h-24 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                                    <CheckCircle2 size={48} />
                                </div>
                                <h2 className="text-3xl md:text-5xl font-display font-bold text-navy italic uppercase tracking-tighter">Order Sent.</h2>
                                <p className="text-navy/40 max-w-md mx-auto italic font-medium uppercase tracking-[0.2em] text-[10px]">
                                    Your order manifest has been generated. Please send the message on WhatsApp to complete the process.
                                </p>
                                <div className="pt-10 flex flex-wrap justify-center gap-6">
                                    <button
                                        onClick={() => window.location.href = '/'}
                                        className="bg-navy text-white px-12 py-5 rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:bg-accent transition-all shadow-2xl shadow-navy/20 active:scale-95"
                                    >
                                        Return to Hub
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-8 opacity-50">
                        <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest"><ShieldCheck size={14} /> WhatsApp Verified</div>
                        <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest"><Truck size={14} /> Pan-India Delivery</div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Checkout;
