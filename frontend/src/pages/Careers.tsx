import { motion } from "framer-motion";
import { Mail, Phone, Briefcase, Video, Edit, Image as ImageIcon, Rocket, Users, Shield, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";

const jobRequirement = [
    { icon: Rocket, title: "Digital Marketing", desc: "Strong knowledge of social media, basic campaigns, and content handling." },
    { icon: Video, title: "Video Editing", desc: "Experience in editing testimonial and promotional videos/reels." },
    { icon: ImageIcon, title: "Creative Design", desc: "Ability to create banners and creatives for digital platforms." },
    { icon: Edit, title: "Multitasking", desc: "Self-driven and able to manage multiple tasks efficiently." },
];

const Careers = () => {
    return (
        <div className="min-h-screen">
            <Navbar />

            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 bg-navy text-white overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
                    </div>

                    <div className="container-narrow relative z-10 text-center px-6">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs uppercase tracking-[0.4em] text-accent font-bold mb-4 block"
                        >
                            Join Our Team
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-display font-bold mb-6 italic uppercase tracking-tighter"
                        >
                            Careers at <span className="text-accent underline decoration-white/20">FICC</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-white/40 text-base md:text-lg max-w-2xl mx-auto leading-relaxed italic font-medium"
                        >
                            We're looking for passionate individuals to join our growing family.
                            Be part of a startup fashion brand that's redefining inclusive apparel.
                        </motion.p>
                    </div>
                </section>

                {/* Open Positions Section */}
                <section className="section-padding bg-white">
                    <div className="container-narrow px-6">
                        <SectionHeading label="Opportunities" title="Open Positions" />

                        <div className="grid grid-cols-1 gap-12 mt-16">
                            {[
                                {
                                    title: "Digital Marketing Executive",
                                    type: "Full-Time",
                                    location: "Coimbatore",
                                    desc: "Our startup fashion brand LadderMan clothing is looking for a creative & stylish Digital Content Creator. We need someone who can multitask and bring our brand story to life through reels and digital content.",
                                    requirements: jobRequirement
                                },
                                {
                                    title: "Business Development Executive",
                                    type: "Full-Time",
                                    location: "Coimbatore",
                                    desc: "Focus on identifying new business opportunities, building institutional partnerships, and expanding FICC's presence in the uniform manufacturing sector.",
                                    requirements: [
                                        { icon: Users, title: "Networking", desc: "Build and maintain strong relationships with institutional clients." },
                                        { icon: Rocket, title: "Growth Mindset", desc: "Identify and tap into new market segments for bulk orders." }
                                    ]
                                },
                                {
                                    title: "Key Account Manager (Sales Role)",
                                    type: "Full-Time",
                                    location: "Coimbatore",
                                    desc: "Manage and nurture major institutional accounts, ensuring high client satisfaction and sustained business growth through personalized service and expert product matching.",
                                    requirements: [
                                        { icon: Shield, title: "Account Planning", desc: "Develop strategic plans for major institutional accounts." },
                                        { icon: Award, title: "Sales Excellence", desc: "Drive revenue growth within assigned key accounts." }
                                    ]
                                }
                            ].map((job, idx) => (
                                <div key={idx} className="bg-white border border-navy/5 p-8 md:p-12 rounded-[2.5rem] shadow-premium hover:shadow-2xl transition-all duration-500 group">
                                    <div className="flex flex-col lg:flex-row gap-12">
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-4 mb-8">
                                                <span className="px-5 py-2 bg-accent/10 text-accent rounded-full text-[10px] font-black uppercase tracking-wider italic">{job.type}</span>
                                                <span className="px-5 py-2 bg-navy/5 text-navy rounded-full text-[10px] font-black uppercase tracking-wider italic">{job.location}</span>
                                            </div>

                                            <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 italic uppercase tracking-tighter group-hover:text-accent transition-colors">
                                                {job.title}
                                            </h3>
                                            <p className="text-navy/60 text-base leading-relaxed mb-8 italic font-medium max-w-2xl">
                                                {job.desc}
                                            </p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {job.requirements.map((req, i) => (
                                                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-navy/[0.02]">
                                                        <div className="w-8 h-8 rounded-lg bg-navy text-white flex items-center justify-center shrink-0">
                                                            <req.icon size={14} />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-[10px] uppercase tracking-widest text-navy mb-1">{req.title}</h4>
                                                            <p className="text-[10px] text-navy/40 uppercase tracking-tight">{req.desc}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="lg:w-72 shrink-0">
                                            <div className="bg-navy text-white p-8 rounded-3xl h-full flex flex-col justify-center text-center">
                                                <p className="text-[9px] uppercase tracking-[0.4em] text-white/40 mb-6 font-bold">Apply Today</p>
                                                <a href="mailto:firstindiaclothingcompany@gmail.com" className="bg-white text-navy py-4 rounded-full font-black uppercase tracking-[0.3em] text-[10px] hover:bg-accent hover:text-white transition-all mb-4 block">
                                                    Dispatch CV
                                                </a>
                                                <a href="https://wa.me/919543101234" target="_blank" rel="noopener noreferrer" className="bg-white/10 text-white py-4 rounded-full font-black uppercase tracking-[0.3em] text-[10px] hover:bg-green-500 transition-all block">
                                                    WhatsApp
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Brand Culture */}
                <section className="section-padding bg-navy/5">
                    <div className="container-narrow px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-display font-bold mb-6">Why Work With <span className="text-accent underline decoration-accent/20">LadderMan?</span></h2>
                                <p className="text-navy/70 leading-relaxed mb-8 text-lg">
                                    At LadderMan, we aren't just making clothes; we're building a brand that celebrates style, comfort, and character. As a Digital Content Creator, you'll have the creative freedom to shape our visual identity and engage with a growing community of fashion enthusiasts.
                                </p>
                                <div className="space-y-4">
                                    {[
                                        "Young & Dynamic Startup Environment",
                                        "Creative Freedom for Content Creators",
                                        "Opportunity to grow with a new brand",
                                        "Inclusive and supportive team culture"
                                    ].map((benefit, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                            <span className="text-sm font-medium text-navy/80">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="aspect-[4/5] bg-navy/10 rounded-2xl overflow-hidden shadow-2xl">
                                    <div className="w-full h-full bg-gradient-to-br from-navy/20 to-accent/20 flex items-center justify-center">
                                        <Briefcase size={40} className="text-navy/20" />
                                    </div>
                                </div>
                                <div className="aspect-[4/5] bg-navy/10 rounded-2xl overflow-hidden shadow-2xl mt-8">
                                    <div className="w-full h-full bg-gradient-to-tr from-accent/20 to-navy/20 flex items-center justify-center">
                                        <Rocket size={40} className="text-navy/20" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="section-padding text-center bg-white">
                    <div className="container-narrow px-6">
                        <div className="max-w-3xl mx-auto p-12 md:p-24 bg-accent rounded-[3rem] text-white shadow-2xl shadow-accent/20 relative overflow-hidden">
                            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 italic uppercase tracking-tighter">Lead the Future.</h2>
                            <p className="text-white/60 mb-12 italic font-medium text-lg leading-relaxed">Take the leap and join a team that values your creativity. <br />We're excited to see what you can create!</p>
                            <div className="flex flex-wrap justify-center gap-6 relative z-10">
                                <a href="mailto:firstindiaclothingcompany@gmail.com" className="bg-white text-accent px-12 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-navy hover:text-white transition-all shadow-xl active:scale-95">
                                    Dispatch CV
                                </a>
                                <a href="https://wa.me/919543101234" target="_blank" rel="noopener noreferrer" className="bg-navy text-white px-12 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-navy transition-all shadow-xl active:scale-95">
                                    Quick Connect
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </motion.main>

            <Footer />
        </div>
    );
};

export default Careers;

import { Link } from "react-router-dom";
