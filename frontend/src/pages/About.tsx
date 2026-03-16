import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Heart, Factory, Award, Sparkles, Check, Users, Ruler } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import heroImage from "@/assets/hero-main.jpg";

const values = [
  { icon: Award, title: "Premium Quality", desc: "We use high-grade fabrics and rigorous manufacturing processes to ensure every garment meets our premium standards." },
  { icon: Sparkles, title: "Customized Designs", desc: "Your vision, our expertise. We bring your unique designs to life with precision tailoring and custom branding." },
  { icon: Heart, title: "Competitive Prices", desc: "Direct manufacturing allows us to offer the highest quality uniforms at the most competitive market prices." },
  { icon: Factory, title: "Quick Turnaround", desc: "Efficient processes and a dedicated team ensure your orders are delivered on time, every time." },
  { icon: Shield, title: "Bulk Ordering", desc: "No order is too large. We specialize in bulk manufacturing for institutions, corporates, and events." },
  { icon: Check, title: "Leader Since 1990", desc: "Three decades of excellence in Coimbatore, leading the industry with trust and superior craftsmanship." },
];

const About = () => {
  const sectionEase: any = [0.22, 1, 0.36, 1];

  return (
    <div className="min-h-screen">
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Hero - Immersive Header */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <img src={heroImage} alt="FICC Heritage" className="absolute inset-0 w-full h-full object-cover grayscale" />
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-[2px]" />
          <div className="relative z-10 text-center container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: sectionEase }}
            >
              <span className="text-[10px] uppercase tracking-[0.6em] text-accent font-black block mb-4 italic">A Legacy Since 1990</span>
              <h1 className="text-4xl md:text-7xl font-display font-bold text-white uppercase italic tracking-tighter leading-tight">
                The House <br /><span className="text-accent underline decoration-white/10">of FICC.</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Narrative - Alternating Layouts */}
        <section className="py-32 bg-white">
          <div className="container-narrow">
            <div className="flex flex-col lg:flex-row gap-20 items-center mb-40">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: sectionEase }}
                className="w-full lg:w-1/2"
              >
                <span className="text-accent text-[10px] uppercase tracking-[0.4em] font-black block mb-4">Our DNA</span>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-navy mb-6 italic uppercase leading-tight">
                  Leading Fashion <br />with <span className="text-accent">Integrity.</span>
                </h2>
                <p className="text-navy/60 text-lg leading-relaxed font-medium italic mb-8 border-l-4 border-accent/20 pl-8">
                  First India Clothing Company (FICC) is a premier manufacturer of all kinds of uniforms and ready-made garments, based in the textile hub of Coimbatore, Tamil Nadu.
                </p>
                <p className="text-navy/60 text-base leading-relaxed mb-10">
                  Since our inception in 1990, we have been at the forefront of the fashion apparel industry. We don't just make uniforms; we craft identities that empower institutions and their people.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-[9px] uppercase tracking-widest text-navy/30 mb-2 font-black">Location</h4>
                    <p className="text-xs font-black text-navy italic uppercase">Coimbatore, India</p>
                  </div>
                  <div>
                    <h4 className="text-[9px] uppercase tracking-widest text-navy/30 mb-2 font-black">Specialty</h4>
                    <p className="text-xs font-black text-navy italic uppercase">Bespoke Tailoring</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: sectionEase }}
                className="w-full lg:w-1/2 relative"
              >
                <div className="rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-xl aspect-[4/5] bg-navy/5 border-4 border-white ring-1 ring-navy/5">
                  <img src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2070&auto=format&fit=crop" alt="Quality Craftsmanship" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-10 -right-10 bg-accent text-white p-12 rounded-full shadow-2xl z-10 border-8 border-white">
                  <Factory size={40} />
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: sectionEase }}
                className="w-full lg:w-1/2"
              >
                <span className="text-accent text-[10px] uppercase tracking-[0.4em] font-black block mb-4">Expertise</span>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-navy mb-6 italic uppercase leading-tight">
                  Creative <br /><span className="text-accent">Excellence.</span>
                </h2>
                <p className="text-navy/60 text-lg leading-relaxed font-medium italic mb-8 border-l-4 border-accent/20 pl-8">
                  Our stitching units consist of creative heads and enthusiastic designers with over three decades of expertise.
                </p>
                <p className="text-navy/60 text-base leading-relaxed mb-10">
                  Whether it's corporate wear, hotel uniforms, school uniforms, or sports team jerseys, we've got you covered. We bring your vision to life by blending premium materials with expert craftsmanship and the latest in garment technology.
                </p>
                <Link to="/customize" className="bg-navy text-white px-12 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.4em] inline-block hover:bg-accent transition-all shadow-xl shadow-navy/20">
                  Meet Our Designers
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: sectionEase }}
                className="w-full lg:w-1/2 relative"
              >
                <div className="rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-xl aspect-[4/5] bg-navy/5 border-4 border-white ring-1 ring-navy/5">
                  <img src="https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=2070&auto=format&fit=crop" alt="Modern Manufacturing" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-10 -left-10 bg-white shadow-2xl p-10 rounded-3xl border border-navy/5">
                  <p className="text-4xl font-black text-navy italic">30+</p>
                  <p className="text-[9px] uppercase tracking-widest font-black text-navy/40">Years of Experience</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Statistics - Ultra Modern */}
        <section className="py-32 bg-navy text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <img src="/logo.png" alt="" className="w-full h-full object-contain scale-150 rotate-45 grayscale invert" />
          </div>
          <div className="container-narrow relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
              {[
                { num: "50,000+", label: "Units Weekly", icon: Factory },
                { num: "500+", label: "Global Clients", icon: Users },
                { num: "20XL", label: "Inclusive Sizes", icon: Ruler },
                { num: "99%", label: "Accuracy Rate", icon: Shield },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                >
                  <stat.icon className="mx-auto text-accent mb-6 opacity-40" size={30} />
                  <div className="text-4xl md:text-5xl font-display font-black text-white mb-2 italic">{stat.num}</div>
                  <div className="text-[10px] text-accent uppercase tracking-[0.4em] font-black">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-32 bg-white relative">
          <div className="container-narrow">
            <div className="text-center mb-24">
              <span className="text-accent text-[10px] uppercase tracking-[0.5em] font-black block mb-4 italic">Visionaries</span>
              <h2 className="text-5xl md:text-7xl font-display font-bold text-navy uppercase italic tracking-tighter">Our Leadership</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
              {/* Managing Director */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group p-10 border border-navy/5 rounded-[3rem] bg-navy/[0.01] hover:bg-white hover:shadow-2xl transition-all duration-500"
              >
                <div className="mb-8 aspect-square w-24 h-24 rounded-3xl bg-navy text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-500 shadow-xl shadow-navy/10 overflow-hidden">
                  <Users size={40} />
                </div>
                <h3 className="text-3xl font-display font-bold text-navy mb-2 uppercase italic tracking-tighter">Antony Sebastian</h3>
                <p className="text-accent text-xs font-black uppercase tracking-[0.2em] mb-6 mb-4">Managing Director</p>
                <div className="h-px w-20 bg-accent/20 mb-6 group-hover:w-full transition-all duration-700" />
                <p className="text-navy/60 text-sm leading-relaxed italic font-medium">
                  With over <span className="text-navy font-bold">25+ years of experience</span> in the textile industry, Mr. Sebastian brings profound garments knowledge and strategic vision to FICC, ensuring every stitch meets global standards.
                </p>
              </motion.div>

              {/* Director of Operation & Accounts */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group p-10 border border-navy/5 rounded-[3rem] bg-navy/[0.01] hover:bg-white hover:shadow-2xl transition-all duration-500"
              >
                <div className="mb-8 aspect-square w-24 h-24 rounded-3xl bg-navy text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-500 shadow-xl shadow-navy/10">
                  <Shield size={40} />
                </div>
                <h3 className="text-3xl font-display font-bold text-navy mb-2 uppercase italic tracking-tighter">Anisha Vinodh</h3>
                <p className="text-accent text-xs font-black uppercase tracking-[0.2em] mb-6 mb-4">Director of Operation & Accounts</p>
                <div className="h-px w-20 bg-accent/20 mb-6 group-hover:w-full transition-all duration-700" />
                <p className="text-navy/60 text-sm leading-relaxed italic font-medium">
                  Spearheading operational excellence and financial integrity, Ms. Vinodh ensures the seamless execution of bulk manufacturing projects while maintaining the company's robust fiscal health.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values - High End Cards */}
        <section className="section-padding bg-white">
          <div className="container-narrow">
            <div className="text-center mb-24">
              <span className="text-accent text-[10px] uppercase tracking-[0.5em] font-black block mb-4 italic">Commitment to Excellence</span>
              <h2 className="text-5xl md:text-7xl font-display font-bold text-navy uppercase italic tracking-tighter">Core Values</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-12 bg-navy/[0.02] rounded-[50px] border border-navy/[0.05] hover:border-accent/20 transition-all group"
                >
                  <v.icon size={24} className="text-accent mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl md:text-2xl font-display font-bold text-navy mb-4 italic">{v.title}</h3>
                  <p className="text-navy/60 text-[11px] leading-relaxed font-medium uppercase tracking-[0.05em]">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="pb-32 px-6">
          <div className="container-narrow">
            <div className="bg-accent rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-accent/20">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-5xl md:text-8xl font-display font-bold mb-10 italic uppercase tracking-tighter">Ready to Build <br />Your Vision?</h2>
                <p className="text-white/80 text-xl max-w-2xl mx-auto mb-16 font-medium italic">Whether it's a single institution or a global corporate fleet, FICC delivers excellence at every stitch.</p>
                <div className="flex flex-wrap justify-center gap-8">
                  <Link to="/contact" className="bg-white text-accent px-16 py-6 rounded-full font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl hover:bg-navy hover:text-white transition-all transform hover:scale-105 active:scale-95">
                    Start a Project
                  </Link>
                  <Link to="/uniforms" className="bg-navy text-white px-16 py-6 rounded-full font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl hover:bg-white hover:text-navy transition-all transform hover:scale-105 active:scale-95">
                    Browse Sectors
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </motion.main>
      <Footer />
    </div>
  );
};

export default About;
