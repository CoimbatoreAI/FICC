import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Ruler, ChevronRight, Sparkles, Upload, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProductById, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { api } from "@/lib/api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState<any[]>([]);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [measurements, setMeasurements] = useState({
    chest: "", waist: "", shoulder: "", height: "", weight: "", customSize: "",
  });

  // Customization State
  const [customType, setCustomType] = useState("None");
  const [customText, setCustomText] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const customizationPrices = {
    "None": 0,
    "Printing": 100,
    "Embroidery": 150
  };

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const nextImage = () => {
    if (product?.images?.length) {
      setActiveImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product?.images?.length) {
      setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await api.get(`/products/id/${id}`);

        const normalized = {
          ...data,
          id: data._id,
          image: data.images && data.images[0] ? `/${data.images[0]}` : 'https://placehold.co/400x400?text=No+Image',
          category: data.category?.name || data.category
        };
        setProduct(normalized);

        // Fetch related products
        const allData = await api.get('/products');
        const relatedMapped = allData
          .filter((p: any) => p.category?._id === data.category?._id && p._id !== data._id)
          .map((p: any) => ({
            ...p,
            id: p._id,
            image: p.images && p.images[0] ? `/${p.images[0]}` : 'https://placehold.co/400x400?text=No+Image'
          }))
          .slice(0, 4);
        setRelated(relatedMapped);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 text-center section-padding">
          <p className="text-navy/40 font-bold uppercase tracking-widest">Loading product...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 text-center section-padding">
          <h1 className="text-2xl font-display text-navy">Product not found</h1>
          <Link to="/uniforms" className="text-accent mt-4 inline-block tracking-widest uppercase text-xs font-bold">← Back to Uniforms</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize && !showCustom) {
      toast.error("Please select a size");
      return;
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast.error("Please select a color");
      return;
    }

    const totalProductPrice = product.price + (customizationPrices[customType as keyof typeof customizationPrices] || 0);

    addToCart({
      id: product.id,
      name: product.name,
      price: totalProductPrice,
      image: product.image,
      quantity: 1,
      size: showCustom ? `Custom (${measurements.customSize || 'Unspecified'})` : selectedSize,
      color: selectedColor,
      isCustom: showCustom || customType !== "None",
      customization: {
        type: customType,
        text: customText,
        logo: logoPreview
      }
    });

    toast.success(`${product.name} added to cart!`, {
      description: `Size: ${showCustom ? measurements.customSize : selectedSize}${customType !== "None" ? ` + ${customType}` : ''}`,
      action: {
        label: "View Cart",
        onClick: () => window.location.href = "/cart"
      }
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
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
        <div className="pt-24 sm:pt-28 section-padding">
          <div className="container-narrow">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-navy/40 mb-8 font-bold">
              <Link to="/uniforms" className="hover:text-accent transition-colors">Uniforms</Link>
              <ChevronRight size={10} />
              <span className="text-navy">{product.name}</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Image Slider */}
              <div className="space-y-6">
                <div className="relative group aspect-[3/4] rounded-[2rem] overflow-hidden bg-navy/[0.02] shadow-xl border border-navy/5">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImageIndex}
                      src={product.images && product.images[activeImageIndex] ? `/${product.images[activeImageIndex]}` : product.image}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  {product.images && product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-navy/5 flex items-center justify-center text-navy opacity-0 group-hover:opacity-100 transition-all hover:bg-accent hover:text-white"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-navy/5 flex items-center justify-center text-navy opacity-0 group-hover:opacity-100 transition-all hover:bg-accent hover:text-white"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {product.images && product.images.length > 1 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/20 backdrop-blur-md rounded-full text-[10px] text-white font-bold tracking-widest">
                      {activeImageIndex + 1} / {product.images.length}
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                {product.images && product.images.length > 1 && (
                  <div className="grid grid-cols-5 gap-3">
                    {product.images.map((img: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-accent shadow-lg scale-95' : 'border-transparent opacity-60 hover:opacity-100'}`}
                      >
                        <img src={`/${img}`} className="w-full h-full object-cover" alt="" />
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-center gap-4 py-4 px-6 bg-white/[0.02] rounded-2xl border border-white/5">
                  <img src="/logo.png" className="h-6 opacity-30 grayscale" alt="FICC" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-navy/40 font-bold">Trusted Since 1990</span>
                </div>
              </div>

              {/* Details */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-black px-3 py-1 bg-accent/10 rounded-full">
                    {product.category.replace('-', ' ')}
                  </span>
                  {product.subcategory && (
                    <span className="text-[9px] uppercase tracking-[0.3em] text-navy/30 font-bold">
                      / {product.subcategory}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-5xl font-display font-bold text-navy mb-4 tracking-tighter italic uppercase leading-tight">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4 mb-8">
                  <span className="text-3xl font-black text-navy italic">₹{product.price.toLocaleString()}</span>
                  {product.comparePrice && (
                    <span className="text-lg text-navy/20 line-through font-black italic">₹{product.comparePrice.toLocaleString()}</span>
                  )}
                </div>

                <p className="text-navy/60 text-base leading-relaxed mb-10 border-l-2 border-accent/20 pl-6 italic font-medium">
                  {product.description}
                </p>

                {/* Color Selector */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-10">
                    <div className="flex items-center gap-2 mb-6">
                      <span className="text-[11px] uppercase tracking-[0.4em] text-navy font-black">C O L O R —</span>
                      <span className="text-[13px] font-bold text-navy/60">{selectedColor || "Select Color"}</span>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {product.colors.map((color: any) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`relative w-12 h-12 rounded-full transition-all duration-300 ${selectedColor === color.name ? 'scale-110 shadow-xl ring-2 ring-navy ring-offset-4' : 'opacity-60 hover:opacity-100'}`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        >
                          {selectedColor === color.name && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className={`w-2 h-2 rounded-full ${['#ffffff', '#f8f9fa', 'white', '#fff'].includes(color.hex.toLowerCase()) ? 'bg-navy' : 'bg-white'}`} />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-navy/40 font-black">Dimensions</span>
                    <button
                      onClick={() => setShowCustom(!showCustom)}
                      className="text-[9px] text-accent uppercase tracking-widest flex items-center gap-2 hover:text-navy transition-colors font-bold"
                    >
                      <Ruler size={12} /> Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {product.sizes.filter((s) => s !== "Custom").map((size) => (
                      <button
                        key={size}
                        onClick={() => { setSelectedSize(size); setShowCustom(false); }}
                        className={`py-4 rounded-xl border text-[10px] font-black tracking-widest uppercase transition-all ${selectedSize === size
                          ? "bg-accent text-white border-accent shadow-lg shadow-accent/20"
                          : "border-navy/10 text-navy/40 hover:border-accent/40 hover:bg-accent/5"
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                    <button
                      onClick={() => { setSelectedSize("Custom"); setShowCustom(true); }}
                      className={`py-4 col-span-2 rounded-xl border text-[10px] font-black tracking-widest uppercase transition-all ${selectedSize === "Custom"
                        ? "bg-navy text-white border-navy shadow-lg"
                        : "border-navy/10 text-navy/40 hover:bg-navy/5"
                        }`}
                    >
                      Custom Guide
                    </button>
                  </div>
                </div>

                {/* Customisation Options */}
                {product.isCustomizable && (
                  <div className="mb-10 space-y-8 border-t border-navy/5 pt-8">
                    {/* radio buttons */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[13px] font-bold text-navy">Customisation</span>
                        {customType !== "None" && (
                          <span className="text-[11px] font-medium text-navy/40 italic">
                            Add {customType} | ₹{customizationPrices[customType as keyof typeof customizationPrices]}.00
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-6">
                        {[
                          { id: 'Embroidery', label: 'Add Embroidery', price: 150 },
                          { id: 'Printing', label: 'Add Printing', price: 100 },
                          { id: 'None', label: 'No Customisation', price: 0 }
                        ].map((opt) => (
                          <label key={opt.id} className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                              <input
                                type="radio"
                                name="customType"
                                checked={customType === opt.id}
                                onChange={() => setCustomType(opt.id)}
                                className="peer appearance-none w-5 h-5 border-2 border-navy/10 rounded-full checked:border-accent transition-all"
                              />
                              <div className="absolute w-2.5 h-2.5 bg-accent rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                            </div>
                            <span className="text-[11px] font-bold text-navy/60 group-hover:text-navy transition-colors">
                              {opt.label} {opt.price > 0 && `+ ₹ ${opt.price.toFixed(2)}`}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* text input */}
                    <div className="space-y-3">
                      <label className="text-[13px] font-bold text-navy">Add Text</label>
                      <input
                        type="text"
                        placeholder="Name"
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-navy/10 rounded-lg text-[13px] focus:outline-none focus:border-accent transition-all"
                      />
                    </div>

                    <div className="text-[10px] font-bold text-navy/20 uppercase tracking-widest text-center italic">Or</div>

                    {/* logo upload */}
                    <div className="space-y-3">
                      <label className="text-[13px] font-bold text-navy">Upload Your Logo</label>
                      <div className="flex items-center gap-4">
                        <label className="w-16 h-16 flex flex-col items-center justify-center border-2 border-dashed border-navy/10 rounded-xl cursor-pointer hover:border-accent hover:bg-accent/[0.02] transition-all group overflow-hidden">
                          {logoPreview ? (
                            <img src={logoPreview} className="w-full h-full object-cover" />
                          ) : (
                            <Upload size={20} className="text-navy/20 group-hover:text-accent transition-colors" />
                          )}
                          <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                        </label>
                        {logoFile && (
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-navy line-clamp-1">{logoFile.name}</span>
                            <button onClick={() => { setLogoFile(null); setLogoPreview(null); }} className="text-[9px] text-red-500 font-bold uppercase tracking-widest mt-1">Remove</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Custom Measurement Form */}
                {showCustom && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 p-8 bg-navy/[0.02] rounded-[2rem] border border-navy/5 shadow-inner"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <Sparkles className="text-accent" size={18} />
                      <h3 className="font-display font-bold text-xl uppercase tracking-tighter italic">Extreme Plus Sizing</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { key: "chest", label: "Chest (inches)" },
                        { key: "waist", label: "Waist (inches)" },
                        { key: "shoulder", label: "Shoulder (inches)" },
                        { key: "customSize", label: "Target (e.g. 15XL)" },
                      ].map((field) => (
                        <div key={field.key}>
                          <label className="text-[9px] uppercase tracking-[0.2em] text-navy/30 font-bold mb-2 block">{field.label}</label>
                          <input
                            type="text"
                            value={measurements[field.key as keyof typeof measurements]}
                            onChange={(e) => setMeasurements({ ...measurements, [field.key]: e.target.value })}
                            className="w-full px-5 py-4 bg-white border border-navy/5 rounded-xl text-xs font-bold text-navy focus:outline-none focus:border-accent/40 transition-all placeholder:text-navy/10"
                            placeholder={field.label}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 flex items-start gap-4 p-5 bg-accent/5 rounded-2xl border border-accent/10">
                      <Ruler className="text-accent shrink-0" size={16} />
                      <p className="text-[9px] text-navy/40 leading-relaxed uppercase tracking-widest font-black italic">
                        FICC specialize in extreme sizes up to 20XL. Your body is <span className="text-accent">unique</span>, our craft is <span className="text-navy">absolute</span>.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* CTA */}
                <div className="flex flex-col gap-6">
                  <button
                    onClick={handleAddToCart}
                    className="bg-navy text-white py-6 rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:bg-accent transition-all shadow-2xl shadow-navy/20 active:scale-95"
                  >
                    {showCustom ? "Verify & Add to Cart" : "Add to Cart"}
                  </button>
                  <div className="flex justify-center items-center gap-6">
                    <div className="h-px bg-white/5 flex-grow" />
                    <p className="text-[8px] uppercase tracking-[0.5em] text-navy/20 font-black whitespace-nowrap italic">
                      Premium Apparel Manufacturer
                    </p>
                    <div className="h-px bg-white/5 flex-grow" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="mt-32">
                <div className="flex items-end justify-between mb-12 border-b border-white/5 pb-8">
                  <div>
                    <span className="text-accent text-[10px] font-black uppercase tracking-[0.4em] block mb-2 italic">Discovery</span>
                    <h2 className="text-3xl md:text-4xl font-display font-bold italic tracking-tighter uppercase">You May Also Like</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                  {related.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </motion.main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
