import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ArrowRight, ArrowLeft, Check, Sparkles, Ruler } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products as allProducts } from "@/data/products";
import raymondLogo from "@/assets/RAYMOND.NS_BIG-02a3e63e.png";
import reidTaylorLogo from "@/assets/Reid-Taylor-Bond-Logo-Vector.svg-.png";
import arvindLogo from "@/assets/arvind.png";
import ggLogo from "@/assets/gg.png";
import linenClubLogo from "@/assets/linen_club-removebg-preview.png";
import siyaramLogo from "@/assets/siyaram-silk-mills-ltd-logo-png_seeklogo-653187-removebg-preview.png";
import soktasLogo from "@/assets/soktas_.jpg";

const builderApparel = [
    { id: "t-shirt", name: "Premium T-Shirt", desc: "Available up to 20XL. Heavy-duty fabric, perfect fit." },
    { id: "shirt", name: "Executive Shirt", desc: "Corporate elegance meeting extreme plus size comfort." },
    { id: "track", name: "Performance Tracksuit", desc: "Breathable & flexible fabric for all body types." },
    { id: "shorts", name: "Comfort Shorts", desc: "Relaxed fit with reinforced stitching." },
];

const steps = ["Select Apparel", "Material", "Color", "Extreme Size (Up to 20XL)", "Confirm"];

const Customize = () => {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState({
        product: "",
        material: "Cotton",
        color: "Navy",
        size: "XL",
        notes: "",
    });

    const customProductsList = useMemo(() => {
        return allProducts.filter(p => p.category === 'tshirts' || p.category === 'sports');
    }, []);

    const scrollToBuilder = (productName?: string) => {
        if (productName) {
            setForm(prev => ({ ...prev, product: productName }));
            setStep(1); // Skip selection if they choose a specific product
        }
        document.getElementById('builder-interface')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="min-h-screen bg-white text-navy">
            <Navbar />

            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Brand Header - Premium & Vibrant */}
                <section className="relative py-20 md:py-32 overflow-hidden bg-white">
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 bg-[radial-gradient(circle_at_center,_var(--accent)_0%,_transparent_70%)] blur-[100px] pointer-events-none" />
                    <div className="container-narrow px-6 md:px-12 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="flex flex-col items-center justify-center">
                                <img src="/lm.png" alt="Ladderman" className="h-24 md:h-32 object-contain mb-8 drop-shadow-xl" />
                                <div className="space-y-4 mb-10">
                                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter italic text-navy uppercase leading-[0.85]">
                                        Ladder <br /><span className="text-accent underline decoration-accent/10">Man.</span>
                                    </h1>
                                    <p className="text-accent text-base md:text-xl font-black tracking-[0.3em] uppercase italic">
                                        The One Stop Uniform Shop
                                    </p>
                                </div>
                                <div className="bg-navy text-white px-8 py-4 md:px-12 md:py-5 rounded-[1.5rem] md:rounded-[2rem] mb-12 shadow-2xl shadow-navy/20 border border-white/10">
                                    <p className="text-[8px] md:text-xs font-black uppercase tracking-[0.3em] md:tracking-[0.4em] italic mb-1 opacity-50 text-accent">Manufacturing Excellence</p>
                                    <p className="text-xs md:text-lg font-black uppercase tracking-[0.1em] md:tracking-[0.2em] italic">
                                        School & Corporate Uniforms Since 1990
                                    </p>
                                </div>
                                <p className="text-navy/40 max-w-2xl mx-auto text-[10px] md:text-xs uppercase tracking-[0.5em] font-black italic border-t border-navy/5 pt-10">
                                    A House of Premium Fabrics: Linen • Cotton • Dhotis • Uniforms
                                </p>

                                {/* Running Brand Logos - Brighter */}
                                <div className="mt-20 w-full max-w-6xl mx-auto overflow-hidden relative">
                                    <div className="flex gap-24 md:gap-40 animate-marquee whitespace-nowrap py-12 items-center">
                                        {[
                                            { name: "Raymond", logo: raymondLogo },
                                            { name: "Linen Club", logo: linenClubLogo },
                                            { name: "Siyaram's", logo: siyaramLogo },
                                            { name: "Arvind", logo: arvindLogo },
                                            { name: "Reid & Taylor", logo: reidTaylorLogo },
                                            { name: "Georgia Gulinni", logo: ggLogo },
                                            { name: "Soktas", logo: soktasLogo }
                                        ].concat([
                                            { name: "Raymond", logo: raymondLogo },
                                            { name: "Linen Club", logo: linenClubLogo },
                                            { name: "Siyaram's", logo: siyaramLogo },
                                            { name: "Arvind", logo: arvindLogo },
                                            { name: "Reid & Taylor", logo: reidTaylorLogo },
                                            { name: "Georgia Gulinni", logo: ggLogo },
                                            { name: "Soktas", logo: soktasLogo }
                                        ]).map((brand, i) => (
                                            <img
                                                key={`${brand.name}-${i}`}
                                                src={brand.logo}
                                                alt={brand.name}
                                                className="h-8 md:h-16 w-auto object-contain grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700 hover:scale-110"
                                            />
                                        ))}
                                    </div>
                                    <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
                                    <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Customizable Collections */}
                <section className="section-padding bg-navy/[0.01] border-t border-navy/5">
                    <div className="container-narrow px-6 md:px-12">
                        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div className="text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                                    <Sparkles className="text-accent" size={20} />
                                    <span className="text-accent text-[10px] font-black uppercase tracking-[0.5em] italic">Pre-Architected Bases</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-display font-bold text-navy uppercase italic tracking-tighter leading-tight">
                                    Ladderman Elite <br /><span className="text-accent">Custom.</span>
                                </h2>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    onClick={() => scrollToBuilder()}
                                    className="group bg-navy text-white px-10 py-5 rounded-full font-black uppercase tracking-[0.3em] text-[10px] hover:bg-accent transition-all flex items-center justify-center gap-4 shadow-2xl shadow-navy/20 active:scale-95"
                                >
                                    Launch Product Builder <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                            {customProductsList.map((product) => (
                                <div key={product.id} className="group relative">
                                    <ProductCard product={product} />
                                    <div className="absolute top-[37.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700 scale-90 group-hover:scale-105 p-4 w-full flex justify-center z-10">
                                        <button
                                            onClick={() => scrollToBuilder(product.name)}
                                            className="bg-accent text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] shadow-[0_20px_40px_rgba(255,0,0,0.3)] whitespace-nowrap hover:bg-navy transition-all active:scale-95"
                                        >
                                            Customize Design
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Builder Section - More Modern UI */}
                <section id="builder-interface" className="pb-20 md:pb-40 px-4 md:px-6 scroll-mt-24 pt-20 md:pt-40 relative">
                    <div className="absolute inset-0 bg-navy pointer-events-none -z-10" />
                    <div className="container-narrow max-w-5xl bg-white border border-white/10 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden">

                        {/* Decorative Background for Builder */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                        {/* Steps Progress */}
                        <div className="flex justify-between items-center mb-12 md:mb-16 px-2 md:px-4 relative">
                            {/* Connector Line */}
                            <div className="absolute top-5 md:top-6 left-10 right-10 h-0.5 bg-navy/10 -z-10">
                                <motion.div
                                    className="h-full bg-accent"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>

                            {steps.map((s, i) => (
                                <div key={s} className="flex flex-col items-center gap-2 md:gap-4">
                                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-xs md:text-sm border-2 transition-all duration-500 ${step >= i ? 'bg-accent border-accent text-white shadow-2xl shadow-accent/20 rotate-0' : 'bg-white border-navy/5 text-navy/20 rotate-45'
                                        }`}>
                                        <div className={step >= i ? '' : '-rotate-45'}>
                                            {step > i ? <Check className="w-5 h-5 md:w-6 md:h-6" /> : i + 1}
                                        </div>
                                    </div>
                                    <span className={`hidden md:block text-[9px] uppercase tracking-[0.3em] font-black ${step >= i ? 'text-navy' : 'text-navy/20'
                                        }`}>{s}</span>
                                </div>
                            ))}
                        </div>

                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="min-h-[450px]"
                        >
                            {step === 0 && (
                                <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                                    {builderApparel.map(p => (
                                        <button
                                            key={p.id}
                                            onClick={() => { setForm({ ...form, product: p.name }); setStep(1); }}
                                            className="group p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-navy/[0.02] border border-navy/5 text-left hover:bg-navy/[0.04] hover:border-accent hover:translate-y-[-4px] transition-all duration-500"
                                        >
                                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                                                <Sparkles size={20} />
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-display font-bold mb-3 md:mb-4 text-navy group-hover:text-accent transition-colors italic leading-none">{p.name}</h3>
                                            <p className="text-navy/60 leading-relaxed font-medium italic text-sm md:text-base">{p.desc}</p>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {step === 1 && (
                                <div className="grid md:grid-cols-2 gap-8">
                                    {[
                                        { name: "Raymond", desc: "The essence of timeless elegance.", logo: raymondLogo },
                                        { name: "Linen Club", desc: "The official house of premium linen.", logo: linenClubLogo },
                                        { name: "Siyaram's", desc: "Comfort meeting superior craft.", logo: siyaramLogo },
                                        { name: "Arvind", desc: "Global fashioning possibilities.", logo: arvindLogo },
                                        { name: "Reid & Taylor", desc: "Luxury bonded with durability.", logo: reidTaylorLogo },
                                        { name: "Georgia Gulinni", desc: "Premium Italian style & comfort.", logo: ggLogo },
                                        { name: "Soktas", desc: "Finest Turkish cotton shirting.", logo: soktasLogo }
                                    ].map(m => (
                                        <button
                                            key={m.name}
                                            onClick={() => { setForm({ ...form, material: m.name }); setStep(2); }}
                                            className={`p-6 md:p-8 rounded-[1.5rem] border text-left transition-all duration-500 flex flex-col items-center md:items-start text-center md:text-left group relative overflow-hidden ${form.material === m.name
                                                ? 'bg-navy border-navy text-white shadow-xl shadow-navy/30'
                                                : 'bg-navy/[0.02] border-navy/5 hover:border-accent hover:translate-y-[-4px] text-navy'
                                                }`}
                                        >
                                            <div className="h-12 md:h-14 w-full flex items-center justify-center md:justify-start mb-6 md:mb-8 overflow-hidden z-10">
                                                <img
                                                    src={m.logo}
                                                    alt={m.name}
                                                    className={`h-full object-contain transition-all duration-500 group-hover:scale-110 ${form.material === m.name ? 'brightness-0 invert' : 'grayscale group-hover:grayscale-0'
                                                        }`}
                                                />
                                            </div>
                                            <h3 className="text-xl font-display font-bold mb-2 z-10 italic">{m.name}</h3>
                                            <p className={`text-[9px] uppercase tracking-widest leading-relaxed font-black z-10 ${form.material === m.name ? 'text-accent' : 'text-navy/40'
                                                }`}>{m.desc}</p>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {step === 2 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                    {["Midnight Blue", "Classic Black", "Stealth Gray", "Arctic White", "Royal Maroon"].map(c => (
                                        <button
                                            key={c}
                                            onClick={() => { setForm({ ...form, color: c }); setStep(3); }}
                                            className={`p-6 md:p-8 rounded-[1.5rem] border flex flex-col items-center gap-4 transition-all duration-500 hover:translate-y-[-4px] ${form.color === c
                                                ? 'border-accent bg-accent/[0.05] shadow-xl shadow-accent/10'
                                                : 'border-navy/5 hover:border-accent/20'
                                                }`}
                                        >
                                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 md:border-4 border-white shadow-xl" style={{ backgroundColor: c === 'Classic Black' ? '#000' : c === 'Stealth Gray' ? '#333' : c === 'Arctic White' ? '#fff' : c === 'Midnight Blue' ? '#1a2744' : '#800020' }} />
                                            <span className="text-[9px] uppercase tracking-[0.2em] font-black text-navy italic">{c}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-12 md:space-y-16 text-navy">
                                    <div className="text-center px-4">
                                        <h3 className="text-4xl md:text-5xl font-display font-bold mb-4 md:mb-6 italic uppercase tracking-tighter">Extreme Sizing.</h3>
                                        <p className="text-navy/60 text-base md:text-lg font-medium italic">Supporting every unique build from XS up to <span className="text-accent font-black">20XL.</span></p>
                                    </div>
                                    <div className="grid grid-cols-4 md:grid-cols-7 gap-3 md:gap-5">
                                        {["XS", "S", "M", "L", "XL", "2XL", "3XL", "5XL", "8XL", "10XL", "12XL", "15XL", "18XL", "20XL"].map(s => (
                                            <button
                                                key={s}
                                                onClick={() => setForm({ ...form, size: s })}
                                                className={`py-4 md:py-5 rounded-xl md:rounded-2xl border text-[10px] md:text-[11px] font-black tracking-widest transition-all duration-300 active:scale-90 ${form.size === s
                                                    ? 'bg-accent border-accent text-white shadow-2xl shadow-accent/40'
                                                    : 'border-navy/5 bg-navy/5 text-navy/40 hover:border-accent hover:text-accent'
                                                    }`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex flex-col md:flex-row items-start gap-6 p-8 md:p-10 bg-accent/[0.02] border border-accent/10 rounded-[2rem] md:rounded-[3rem]">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0 mx-auto md:mx-0">
                                            <Ruler size={20} />
                                        </div>
                                        <p className="text-xs md:text-sm text-navy/60 font-medium italic leading-relaxed text-center md:text-left">
                                            Can't find your exact silhouette? Select <span className="text-navy font-black">ANY SIZE</span> and we will perform a <span className="text-accent font-black">PERSONALISED MEASUREMENT</span> session via video call or at our store. We specialize in making clothing that fits <span className="text-navy font-black italic underline decoration-accent/20">your reality.</span>
                                        </p>
                                    </div>
                                </div>
                            )}

                            {step === 4 && (
                                <div className="space-y-8 md:space-y-12 text-navy">
                                    <div className="p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] bg-navy text-white relative overflow-hidden shadow-xl">
                                        <div className="absolute -top-20 -right-20 w-48 h-48 bg-accent opacity-10 rounded-full blur-[60px]" />
                                        <h3 className="text-xl md:text-2xl font-display font-bold mb-6 md:mb-8 italic uppercase border-b border-white/5 pb-4">Architect Plan</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-8 text-[9px] md:text-[10px] uppercase tracking-[0.3em]">
                                            <div className="space-y-1 border-l-2 border-accent/30 pl-4 md:pl-5">
                                                <span className="text-white/40 font-black">Apparel Base</span>
                                                <div className="text-accent font-black text-base md:text-lg italic">{form.product}</div>
                                            </div>
                                            <div className="space-y-1 border-l-2 border-white/10 pl-4 md:pl-5">
                                                <span className="text-white/40 font-black">Material House</span>
                                                <div className="text-white font-black text-base md:text-lg italic">{form.material}</div>
                                            </div>
                                            <div className="space-y-1 border-l-2 border-white/10 pl-4 md:pl-5">
                                                <span className="text-white/40 font-black">Tone</span>
                                                <div className="text-white font-black text-base md:text-lg italic">{form.color}</div>
                                            </div>
                                            <div className="space-y-1 border-l-2 border-accent/60 pl-4 md:pl-5">
                                                <span className="text-white/40 font-black">Scale Index</span>
                                                <div className="text-accent font-black text-xl md:text-2xl italic tracking-tighter">{form.size}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <p className="text-[10px] uppercase tracking-[0.6em] font-black text-navy/30 ml-8">Special Instructions</p>
                                        <textarea
                                            className="w-full bg-navy/[0.02] border border-navy/5 rounded-[2.5rem] p-10 text-navy font-medium italic focus:outline-none focus:border-accent transition-all placeholder:text-navy/20 min-h-[200px]"
                                            placeholder="Specify extra sleeve length, pocket variations, or custom branding requirements..."
                                            value={form.notes}
                                            onChange={(e) => setForm({ ...form, notes: e.target.value })}
                                        />
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        {/* Nav Controls */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-12 md:mt-16 pt-6 md:pt-10 border-t border-navy/5 gap-8">
                            <button
                                onClick={() => setStep(Math.max(0, step - 1))}
                                className={`flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-black transition-all ${step === 0 ? 'opacity-0 pointer-events-none' : 'text-navy/40 hover:text-accent'
                                    }`}
                            >
                                <ArrowLeft size={18} /> Previous Step
                            </button>
                            {step < 4 ? (
                                <button
                                    onClick={() => setStep(step + 1)}
                                    className="w-full sm:w-auto bg-navy text-white px-10 py-5 md:px-16 md:py-6 rounded-full text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-accent transition-all shadow-2xl shadow-navy/20 active:scale-95"
                                >
                                    Proceed <ArrowRight size={18} />
                                </button>
                            ) : (
                                <button
                                    className="w-full sm:w-auto bg-accent text-white px-10 py-5 md:px-16 md:py-6 rounded-full text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-navy transition-all shadow-2xl shadow-accent/30 active:scale-95"
                                >
                                    Confirm Order <ArrowRight size={18} />
                                </button>
                            )}
                        </div>

                    </div>
                </section>

            </motion.main>
            <Footer />
        </div>
    );
};

export default Customize;
