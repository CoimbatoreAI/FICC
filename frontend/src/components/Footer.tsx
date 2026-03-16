import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white text-navy border-t border-navy/5">
      <div className="container-narrow section-padding !pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="flex flex-col items-start gap-8">
            <img src="/logo.png" alt="FICC" className="h-16 lg:h-20" />
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/vvexports_ficc?utm_source=qr&igsh=enp4eTB5NGI2cXNx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] uppercase tracking-[0.2em] text-navy/40 hover:text-accent transition-colors font-black"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-8 italic">Explore</h4>
            <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest italic">
              {[
                { label: "Uniforms", to: "/uniforms" },
                { label: "Customize", to: "/customize" },
                { label: "Careers", to: "/careers" },
                { label: "About Us", to: "/about" },
                { label: "Contact", to: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-navy/40 hover:text-navy transition-all duration-300">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-8 italic">Specialty</h4>
            <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest italic">
              {[
                { label: "Ladderman Custom", to: "/customize" },
                { label: "Corporate Bulk", to: "/contact" },
                { label: "Size Guide", to: "/about" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-navy/40 hover:text-navy transition-all duration-300">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-8 italic">Contact</h4>
            <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest italic">
              <li className="flex items-center gap-3 text-navy/40">
                <Mail size={16} className="text-accent" />
                firstindiaclothingcompany@gmail.com
              </li>
              <li className="flex items-center gap-3 text-navy/40">
                <Phone size={16} className="text-accent" />
                +91 95431 01234
              </li>
              <li className="flex items-start gap-3 text-navy/40">
                <MapPin size={16} className="text-accent mt-0.5" />
                Coimbatore, Tamil Nadu
              </li>
            </ul>

            <div className="mt-8">
              <p className="text-xs uppercase tracking-wider text-navy/40 mb-3">Newsletter</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-navy/5 border border-navy/10 text-xs px-5 py-2.5 rounded-l-2xl text-navy/80 placeholder:text-navy/30 focus:outline-none focus:border-accent/50 italic font-medium"
                />
                <button className="bg-accent px-6 py-2.5 text-[11px] uppercase tracking-widest font-black text-white rounded-r-2xl hover:bg-navy transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-navy/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] uppercase tracking-[0.3em] text-navy/30 font-black">
            © 2026 FICC. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-navy/40">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
