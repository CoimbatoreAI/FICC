import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Ruler, Shield, Users, Star, Briefcase, GraduationCap, ChevronLeft, ChevronRight, Truck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { api } from "@/lib/api";

const indexEase: any = [0.22, 1, 0.36, 1];

// New Hero Assets
import schoolHero from "@/assets/school.png";
import corporateHero from "@/assets/corporate.png";
import hospitalityHero from "@/assets/hospitality.png";
import healthcareHero from "@/assets/healthcare.png";
import industrialHero from "@/assets/industrial.png";
import policeHero from "@/assets/police.png";
import militaryHero from "@/assets/military.png";
import customizeHero from "@/assets/customize.png";

// Brand Logos
import raymondLogo from "@/assets/RAYMOND.NS_BIG-02a3e63e.png";
import linenClubLogo from "@/assets/linen_club-removebg-preview.png";
import siyaramLogo from "@/assets/siyaram-silk-mills-ltd-logo-png_seeklogo-653187-removebg-preview.png";
import arvindLogo from "@/assets/arvind.png";
import reidTaylorLogo from "@/assets/Reid-Taylor-Bond-Logo-Vector.svg-.png";
import soktasLogo from "@/assets/soktas_.jpg";

const brands = [
  { name: "Raymond", logo: raymondLogo },
  { name: "Linen Club", logo: linenClubLogo },
  { name: "Siyaram's", logo: siyaramLogo },
  { name: "Arvind", logo: arvindLogo },
  { name: "Reid & Taylor", logo: reidTaylorLogo },
  { name: "Soktas", logo: soktasLogo },
];

const slides = [
  {
    id: "school",
    image: schoolHero,
    title: "School & College",
    subtitle: "Durable uniforms for students of all ages",
    path: "/uniforms?category=school"
  },
  {
    id: "corporate",
    image: corporateHero,
    title: "Corporate Office",
    subtitle: "Sharp, professional attire for executive roles",
    path: "/uniforms?category=corporate"
  },
  {
    id: "hospitality",
    image: hospitalityHero,
    title: "Hotel & Restaurant",
    subtitle: "Elegant uniforms for the service industry",
    path: "/uniforms?category=hospitality"
  },
  {
    id: "healthcare",
    image: healthcareHero,
    title: "Hospital & Medical",
    subtitle: "Sterile, comfortable scrubs and lab coats",
    path: "/uniforms?category=healthcare"
  },
  {
    id: "industrial",
    image: industrialHero,
    title: "Industrial & Factory",
    subtitle: "Safety-first workwear for heavy-duty environments",
    path: "/uniforms?category=industrial"
  },
  {
    id: "police",
    image: policeHero,
    title: "Police & Security",
    subtitle: "Official authorized fabrics and uniforms",
    path: "/uniforms?category=police"
  },
  {
    id: "military",
    image: militaryHero,
    title: "Military & tactical",
    subtitle: "Specialized uniforms for defense sectors",
    path: "/uniforms?category=military"
  },
  {
    id: "customize",
    image: customizeHero,
    title: "Custom Fabrics",
    subtitle: "Premium Linen, Cotton, and Dhotis",
    path: "/uniforms?category=customize"
  },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.get('/products');
        const normalized = data.map((p: any) => ({
          ...p,
          id: p._id,
          image: p.images && p.images[0] ? `/${p.images[0]}` : 'https://placehold.co/400x400?text=No+Image'
        }));
        setFeaturedProducts(normalized.slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch featured products", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Panoramic Minimalist Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden bg-white mt-16 md:mt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              {/* Image Container - Filling the space */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Smaller Neater Button */}
              <div className="absolute inset-x-0 bottom-10 flex justify-center pointer-events-none">
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="pointer-events-auto"
                >
                  <Link
                    to={slides[currentSlide].path}
                    className="inline-flex items-center gap-3 bg-navy text-white px-7 py-3 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-accent transition-all shadow-xl shadow-navy/10 group"
                  >
                    Shop Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Compact Navigation Controls */}
          <div className="absolute bottom-10 right-10 flex gap-3 z-10 scale-75 md:scale-90">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-navy/5 flex items-center justify-center hover:bg-navy hover:text-white transition-all text-navy/40"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-navy/5 flex items-center justify-center hover:bg-navy hover:text-white transition-all text-navy/40"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Minimal Progress Indicator */}
          <div className="absolute bottom-10 left-10 flex gap-1.5 z-10">
            {slides.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-0.5 cursor-pointer transition-all duration-500 rounded-full ${currentSlide === i ? 'w-8 bg-accent' : 'w-2 bg-navy/5'}`}
              />
            ))}
          </div>
        </section>

        {/* Premium Fabrics Showcase - Scrolling Marquee Style */}
        <section className="py-20 lg:py-24 bg-navy relative">
          <div className="container-narrow px-6 md:px-12">
            <div className="grid lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-1">
                <span className="text-accent text-[10px] uppercase tracking-[0.4em] font-black block mb-4 italic">Fabric Lineage</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 italic uppercase tracking-tighter">Premium Houses.</h2>
              </div>
              <div className="lg:col-span-2 relative overflow-hidden">
                <div className="flex gap-16 animate-marquee whitespace-nowrap py-8 items-center">
                  {brands.map((brand) => (
                    <div key={brand.name} className="flex items-center justify-center min-w-[180px] h-20 group">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="max-h-full max-w-full object-contain brightness-125 contrast-125 transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ))}
                  {/* Duplicate for seamless infinite scroll */}
                  {brands.map((brand) => (
                    <div key={`${brand.name}-dup`} className="flex items-center justify-center min-w-[180px] h-20 group">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="max-h-full max-w-full object-contain brightness-125 contrast-125 transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Collections Grid */}
        <section className="section-padding bg-white relative">
          <div className="container-narrow px-6 md:px-12">
            <div className="mb-12 md:mb-16">
              <span className="text-accent text-[10px] uppercase tracking-[0.5em] font-black block mb-4 italic">Premier Selections</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-navy uppercase italic tracking-tighter leading-none mb-6">Featured <br />Industry Standards</h2>
              <div className="h-1 w-20 bg-accent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link
                to="/uniforms"
                className="inline-flex items-center gap-4 border-2 border-navy text-navy px-12 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-navy hover:text-white transition-all group"
              >
                View Full Collection <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Shop By Sector - Visual Grid */}
        <section className="section-padding bg-[#fcfcfc] border-y border-black/[0.03]">
          <div className="container-narrow px-6 md:px-12">
            <div className="text-center mb-16 md:mb-24">
              <span className="text-accent text-[10px] uppercase tracking-[0.5em] font-black block mb-4 italic">Verticals</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-navy uppercase italic tracking-tighter leading-none mb-8">Shop By Category</h2>
              <p className="max-w-xl mx-auto text-navy/50 text-xs md:text-sm uppercase tracking-widest font-black italic">Precision Engineered Uniforms for Every Professional Domain</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                { id: "corporate", name: "Corporate Office", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000", desc: "Executive attire & formal wear" },
                { id: "tshirts", name: "Custom T-Shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2000", desc: "Branding & promotional gear" },
                { id: "school", name: "School & College", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2000", desc: "Durable educational uniforms" },
                { id: "healthcare", name: "Hospital & Medical", image: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?q=80&w=2000", desc: "Sterile scrubs & lab coats" },
                { id: "industrial", name: "Industrial & Factory", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2000", desc: "Safety workwear & coveralls" },
                { id: "hospitality", name: "Hotel & Restaurant", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2000", desc: "Refined service industry wear" }
              ].map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                >
                  <Link
                    to={`/uniforms?category=${cat.id}`}
                    className="group relative h-80 overflow-hidden rounded-[2.5rem] bg-navy block"
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent z-10" />

                    <div className="absolute bottom-0 left-0 p-10 z-20 w-full transform group-hover:translate-y-[-10px] transition-transform duration-500">
                      <h3 className="text-white text-2xl font-bold uppercase italic tracking-tighter mb-4">{cat.name}</h3>
                      <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-black italic line-clamp-1 mb-6 group-hover:text-white/70 transition-colors">
                        {cat.desc}
                      </p>
                      <div className="h-0.5 w-0 bg-accent group-hover:w-16 transition-all duration-500" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>



        <section className="section-padding bg-white relative overflow-hidden pb-20 md:pb-40">
          <div className="absolute bottom-0 right-0 w-full h-[300px] md:h-[500px] bg-accent/[0.02] rounded-full blur-[150px] md:blur-[200px] translate-y-1/2 pointer-events-none" />
          <div className="container-narrow px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: indexEase }}
              className="bg-navy rounded-[2rem] md:rounded-[4rem] p-8 md:p-20 text-white relative overflow-hidden shadow-[0_40px_80px_-20px_rgba(26,39,68,0.3)] border border-white/5 group"
            >
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-1000">
                <img src="/logo.png" alt="" className="w-full h-full object-contain scale-150 rotate-12 brightness-0 invert blur-sm" />
              </div>

              <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-16">
                <div className="text-center lg:text-left">
                  <motion.h2
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-5xl font-display font-bold mb-6 italic uppercase tracking-tighter"
                  >
                    Visit <br /><span className="text-accent">Our Store.</span>
                  </motion.h2>
                  <p className="text-white/60 text-sm md:text-base max-w-md mb-8 md:mb-12 font-medium italic border-l-2 border-accent/30 pl-6">
                    196, Raja Annamalai Road, Neel Complex, Shop No.5, Saibaba Colony, Coimbatore - 641 011
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-8 md:gap-12">
                    <div>
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black text-accent mb-2 md:mb-4">Calls / WhatsApp</p>
                      <p className="text-2xl md:text-3xl font-black italic tracking-widest hover:text-accent transition-colors cursor-pointer">95431 01234</p>
                    </div>
                    <div>
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black text-accent mb-2 md:mb-4">Direct Mobile</p>
                      <p className="text-2xl md:text-3xl font-black italic tracking-widest hover:text-accent transition-colors cursor-pointer">95140 10234</p>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block w-px h-64 bg-white/10" />

                <div className="text-center lg:text-right">
                  <p className="text-white/40 text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] font-black mb-6 md:mb-8">Inquiries</p>
                  <p className="text-xl md:text-3xl font-display font-bold italic mb-10 md:mb-16 text-accent break-all">firstindiaclothingcompany@gmail.com</p>
                  <Link to="/contact" className="bg-white text-navy px-12 py-5 md:px-16 md:py-6 rounded-full font-black text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] inline-block hover:bg-accent hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-accent/20">
                    Get in Touch
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </motion.main>
      <Footer />
    </div>
  );
};

export default Index;
