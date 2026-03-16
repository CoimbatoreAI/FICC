import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { to: "/", label: "Home" },
  {
    label: "Shop",
    mega: true,
    sections: [
      {
        label: "Uniforms",
        subsections: [
          {
            title: "School",
            children: [
              { to: "/uniforms?category=school&type=regular", label: "Regular" },
              { to: "/uniforms?category=school&type=sports", label: "Sports" },
              { to: "/uniforms?category=school&type=kinder-garden", label: "Kinder Garden" },
              { to: "/uniforms?category=school&type=play-group", label: "Play Group" },
            ]
          },
          {
            title: "Hospitality",
            children: [
              { to: "/uniforms?category=hospitality&type=apron", label: "Apron" },
              { to: "/uniforms?category=hospitality&type=cap", label: "Cap" },
              { to: "/uniforms?category=hospitality&type=chef-coat", label: "Chef Coat" },
              { to: "/uniforms?category=hospitality&type=tableware", label: "Tableware" },
              { to: "/uniforms?category=hospitality&type=t-shirt", label: "T-Shirt" },
              { to: "/uniforms?category=hospitality&type=shirts", label: "Shirts" },
              { to: "/uniforms?category=hospitality&type=working-coat-sleeve", label: "Normal working coat (sleeve)" },
              { to: "/uniforms?category=hospitality&type=working-coat-no-sleeve", label: "Normal working coat (without sleeve)" },
            ]
          },
          {
            title: "Healthcare",
            children: [
              { to: "/uniforms?category=healthcare&type=lab-coat-apron", label: "Lab Coat Apron" },
              { to: "/uniforms?category=healthcare&type=ot-gowns", label: "OT Gowns" },
              { to: "/uniforms?category=healthcare&type=scrubs", label: "Scrubs" },
              { to: "/uniforms?category=healthcare&type=scrub-cap", label: "Scrub Cap" },
              { to: "/uniforms?category=healthcare&type=t-shirt", label: "T-Shirt" },
            ]
          },
          {
            title: "Industrial",
            children: [
              { to: "/uniforms?category=industrial&type=coverall", label: "Coverall" },
              { to: "/uniforms?category=industrial&type=safety-vest", label: "Safety Vest" },
              { to: "/uniforms?category=industrial&type=safety-shirt", label: "Safety Shirt" },
              { to: "/uniforms?category=industrial&type=steel", label: "Steel" },
              { to: "/uniforms?category=industrial&type=welding", label: "Welding" },
            ]
          },
          {
            title: "Police",
            children: [
              { to: "/uniforms?category=police&type=police-fabric", label: "Police Fabric" },
              { to: "/uniforms?category=police&type=police-jacket", label: "Police Jacket" },
              { to: "/uniforms?category=police&type=police-uniform", label: "Police Uniform" },
              { to: "/uniforms?category=police&type=t-shirt", label: "T-Shirt" },
            ]
          },
          {
            title: "Military",
            children: [
              { to: "/uniforms?category=military&type=indian-coast-guard", label: "Indian Coast Guard" },
              { to: "/uniforms?category=military&type=paramilitary", label: "Paramilitary" },
              { to: "/uniforms?category=military&type=indian-navy", label: "Indian Navy" },
            ]
          },
          {
            title: "Salon",
            children: [
              { to: "/uniforms?category=salon&type=apron", label: "Apron" },
              { to: "/uniforms?category=salon&type=hair-cutting-sheet", label: "Hair Cutting Sheet" },
              { to: "/uniforms?category=salon&type=staff-cap", label: "Staff Cap" },
              { to: "/uniforms?category=salon&type=t-shirt", label: "T-Shirt" },
              { to: "/uniforms?category=salon&type=shirts", label: "Shirts" },
            ]
          },
          {
            title: "Corporate",
            children: [
              { to: "/uniforms?category=corporate&type=shirts", label: "Shirts" },
              { to: "/uniforms?category=corporate&type=t-shirts", label: "T-Shirts" },
              { to: "/uniforms?category=corporate&type=blazers", label: "Blazers" },
              { to: "/uniforms?category=corporate&type=trousers", label: "Trousers" },
            ]
          },
          {
            title: "Sports",
            children: [
              { to: "/uniforms?category=sports&type=events", label: "Events" },
              { to: "/uniforms?category=sports&type=bouncers", label: "Bouncers" },
              { to: "/uniforms?category=sports&type=marathon", label: "Marathon" },
              { to: "/uniforms?category=sports&type=kabaddi", label: "Kabaddi" },
            ]
          }
        ]
      },
      {
        label: "Customize",
        subsections: [
          {
            title: "Fabric & Style",
            children: [
              { to: "/uniforms?category=customize&type=linen", label: "Linen" },
              { to: "/uniforms?category=customize&type=cotton", label: "Cotton" },
              { to: "/uniforms?category=customize&type=dhotis", label: "Dhotis" },
              { to: "/uniforms?category=customize", label: "Uniforms" },
            ]
          }
        ]
      }
    ]
  },
  { to: "/about", label: "About Us" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close shop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShopOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isLinkActive = (to: string) => {
    return location.pathname === to;
  };

  const isShopActive = () => {
    const shopItem = navLinks.find(l => l.label === "Shop");
    if (!shopItem?.sections) return false;
    return shopItem.sections.some(s =>
      s.subsections?.some(sub =>
        sub.children.some(child => (location.pathname + location.search) === child.to)
      )
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-navy/10 shadow-sm" onMouseLeave={() => setShopOpen(false)}>
      <div className="container-narrow px-6 lg:px-12 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105 active:scale-95">
          <img src="/logo.png" alt="FICC" className="h-10 md:h-12 object-contain" />
        </Link>

        {/* Regular Links */}
        <div className="hidden lg:flex items-center gap-12 h-full">
          {navLinks.map((link) => (
            <div key={link.label} className="h-full flex items-center">
              {link.sections ? (
                <div
                  className="relative h-full flex items-center gap-1 cursor-pointer"
                  onMouseEnter={() => setShopOpen(true)}
                  onClick={() => setShopOpen(!shopOpen)}
                >
                  <span className={`text-[11px] tracking-[0.3em] uppercase font-bold transition-all duration-300 ${isShopActive() ? "text-accent" : "text-navy/60 hover:text-accent"}`}>
                    {link.label}
                  </span>
                  <ChevronDown size={14} className={`text-navy/40 transition-transform duration-300 ${shopOpen ? 'rotate-180' : ''}`} />
                </div>
              ) : (
                <Link
                  to={link.to!}
                  className={`text-[11px] tracking-[0.3em] uppercase transition-all duration-300 font-bold relative ${isLinkActive(link.to!) ? "text-accent" : "text-navy/60 hover:text-navy"}`}
                >
                  {link.label}
                  {isLinkActive(link.to!) && (
                    <motion.div layoutId="nav-underline" className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-accent rounded-full" />
                  )}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-6">
          <Link to="/cart" className="relative p-3 rounded-full bg-navy/5 text-navy hover:bg-accent hover:text-white transition-all duration-300 group shadow-sm hover:shadow-lg hover:shadow-accent/20">
            <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-[9px] rounded-full flex items-center justify-center font-black border-2 border-white shadow-lg animate-in zoom-in duration-300">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="lg:hidden p-3 rounded-full bg-navy/5 text-navy hover:bg-navy/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Full-Width Mega Menu Dropdown */}
      <AnimatePresence>
        {shopOpen && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
            className="absolute top-full left-0 w-full bg-white shadow-[0_40px_80px_rgba(0,0,0,0.1)] border-t border-navy/5 z-50 overflow-y-auto max-h-[calc(100vh-100px)] custom-scrollbar"
          >
            <div className="container-narrow px-6 lg:px-12 py-16 flex flex-col gap-12">
              {navLinks.find(l => l.label === "Shop")?.sections?.map((section) => (
                <div key={section.label} className="flex flex-col gap-8">
                  <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-navy/30 border-b border-navy/5 pb-4">
                    {section.label}
                  </h4>
                  <div className={`grid gap-x-10 gap-y-10 ${section.label === "Uniforms" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-5" : "grid-cols-2 lg:grid-cols-4"}`}>
                    {section.subsections?.map((sub) => (
                      <div key={sub.title} className="flex flex-col gap-6">
                        <h5 className="text-[11px] uppercase tracking-[0.2em] font-bold text-navy">{sub.title}</h5>
                        <div className="flex flex-col gap-3">
                          {sub.children.map((child) => (
                            <Link
                              key={child.to}
                              to={child.to}
                              onClick={() => setShopOpen(false)}
                              className={`text-[13px] font-medium transition-all duration-200 ${location.pathname + location.search === child.to ? "text-accent" : "text-navy/60 hover:text-navy hover:translate-x-1"}`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t border-navy/10 overflow-hidden"
          >
            <div className="px-6 py-10 flex flex-col gap-10">
              {navLinks.map((link) => (
                <div key={link.label} className="flex flex-col gap-6">
                  {link.sections ? (
                    link.sections.map(section => (
                      <div key={section.label} className="flex flex-col gap-6">
                        <div className="text-[10px] tracking-[0.4em] uppercase font-black text-accent italic">
                          {section.label}
                        </div>
                        <div className="flex flex-col gap-8 pl-4 border-l border-navy/5">
                          {section.subsections?.map(sub => (
                            <div key={sub.title} className="flex flex-col gap-4">
                              <div className="text-[9px] tracking-[0.2em] uppercase font-black text-navy/40">{sub.title}</div>
                              <div className="flex flex-col gap-3 pl-4 border-l border-accent/10">
                                {sub.children.map((child) => (
                                  <Link
                                    key={child.to}
                                    to={child.to}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-[10px] tracking-[0.2em] uppercase font-bold transition-all ${location.pathname + location.search === child.to ? "text-accent" : "text-navy/60 active:text-accent"}`}
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <Link
                      to={link.to!}
                      onClick={() => setIsOpen(false)}
                      className={`text-[10px] tracking-[0.25em] uppercase font-bold transition-all ${location.pathname === link.to ? "text-accent" : "text-navy/60 active:text-accent"}`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
