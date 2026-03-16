import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";

const Contact = () => {
  const [formType, setFormType] = useState<"contact" | "bulk">("contact");

  return (
    <div className="min-h-screen">
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <section className="bg-white pt-24 pb-12 sm:pt-40 sm:pb-24 border-b border-navy/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-navy/[0.01] pointer-events-none" />
          <div className="container-narrow px-6 md:px-12 relative z-10">
            <SectionHeading label="Direct Line" title="Get in Touch" description="Empowering your institution with premium uniform solutions." />
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-narrow">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                {[
                  { icon: Mail, title: "Email", value: "firstindiaclothingcompany@gmail.com", sub: "24/7 Digital Support" },
                  { icon: Phone, title: "Phone", value: "+91 95431 01234", sub: "Mon-Sat, 9AM-6PM" },
                  { icon: MapPin, title: "Location", value: "Coimbatore, Tamil Nadu", sub: "Manufacturing Hub, India" },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-6 p-6 rounded-[2rem] bg-navy/[0.02] border border-navy/5 hover:border-accent/20 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-navy text-white flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-navy/30 mb-1">{item.title}</h3>
                      <p className="text-sm font-bold text-navy italic">{item.value}</p>
                      <p className="text-[10px] text-navy/40 font-black uppercase tracking-widest mt-1">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}

                <div className="p-8 bg-navy text-white rounded-[2rem] shadow-2xl shadow-navy/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/20 transition-all" />
                  <h4 className="text-[10px] uppercase tracking-[0.4em] font-black mb-4 text-accent">Operations</h4>
                  <p className="text-sm font-bold italic mb-1">Mon – Sat: 9:00 AM – 6:00 PM</p>
                  <p className="text-[10px] text-white/40 font-black uppercase tracking-widest leading-relaxed">Manufacturing facilities closed on Sundays & Public Holidays.</p>
                </div>
              </div>

              {/* Forms */}
              <div className="lg:col-span-2">
                <div className="flex gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
                  {[
                    { key: "contact" as const, label: "General Inquiry" },
                    { key: "bulk" as const, label: "Bulk Order Hub" },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setFormType(tab.key)}
                      className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all whitespace-nowrap shadow-sm hover:shadow-md ${formType === tab.key
                        ? "bg-accent text-white shadow-accent/20"
                        : "bg-navy/5 text-navy/60 hover:text-navy"
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <motion.form key={formType} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-navy/40 font-bold">Full Name *</label>
                      <input type="text" className="mt-1 w-full px-4 py-3 bg-white border border-navy/10 rounded-md text-sm text-navy focus:outline-none focus:border-accent" placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-navy/40 font-bold">Email *</label>
                      <input type="email" className="mt-1 w-full px-4 py-3 bg-white border border-navy/10 rounded-md text-sm text-navy focus:outline-none focus:border-accent" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-navy/40 font-bold">Phone</label>
                      <input type="tel" className="mt-1 w-full px-4 py-3 bg-white border border-navy/10 rounded-md text-sm text-navy focus:outline-none focus:border-accent" placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-navy/40 font-bold">
                        {formType === "bulk" ? "Company Name *" : "Company (Optional)"}
                      </label>
                      <input type="text" className="mt-1 w-full px-4 py-3 bg-white border border-navy/10 rounded-md text-sm text-navy focus:outline-none focus:border-accent" placeholder="Your company" />
                    </div>
                  </div>

                  {formType === "bulk" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs uppercase tracking-wider text-navy/40 font-bold">Uniform Category *</label>
                        <select className="mt-1 w-full px-4 py-3 bg-white border border-navy/10 rounded-md text-sm text-navy focus:outline-none focus:border-accent">
                          <option value="">Select category</option>
                          <option>Corporate</option>
                          <option>Industrial</option>
                          <option>Hospitality</option>
                          <option>Healthcare</option>
                          <option>School</option>
                          <option>Custom</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-wider text-navy/40 font-bold">Quantity *</label>
                        <input type="number" className="mt-1 w-full px-4 py-3 bg-white border border-navy/10 rounded-md text-sm text-navy focus:outline-none focus:border-accent" placeholder="e.g., 500" />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-xs uppercase tracking-wider text-navy/40 font-bold">Message *</label>
                    <textarea
                      rows={5}
                      className="mt-1 w-full px-4 py-3 bg-white border border-navy/10 rounded-md text-sm text-navy focus:outline-none focus:border-accent resize-none"
                      placeholder={formType === "bulk" ? "Tell us about your bulk order requirements, sizes needed, timeline, etc." : "How can we help you?"}
                    />
                  </div>

                  <button
                    type="button"
                    className="w-full sm:w-auto bg-navy text-white px-12 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-accent transition-all flex items-center justify-center gap-4 shadow-2xl shadow-navy/20 active:scale-95"
                  >
                    {formType === "bulk" ? "Request Bulk Quote" : "Dispatch Message"}
                    <Send size={16} />
                  </button>
                </motion.form>
              </div>
            </div>
          </div>
        </section>

      </motion.main>
      <Footer />
    </div>
  );
};

export default Contact;
