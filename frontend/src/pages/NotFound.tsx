import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MoveLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="section-padding flex items-center justify-center min-h-[80vh]"
      >
        <div className="container-narrow px-6 text-center">
          <span className="text-accent text-[10px] uppercase tracking-[0.6em] font-black block mb-6 italic">Protocol / 404</span>
          <h1 className="text-6xl md:text-9xl font-display font-bold text-navy italic uppercase tracking-tighter mb-8 leading-none">
            Lost in <br /><span className="text-accent">Production.</span>
          </h1>
          <p className="text-navy/40 text-base md:text-lg max-w-sm mx-auto mb-12 italic font-medium uppercase tracking-widest">
            The requested collection or sector profile could not be located in our manifest.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-4 bg-navy text-white px-10 py-5 rounded-full font-black uppercase tracking-[0.3em] text-[10px] hover:bg-accent transition-all shadow-2xl shadow-navy/20 active:scale-95"
          >
            <MoveLeft size={18} /> Re-Route to Hub
          </Link>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default NotFound;
