import React, { useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

const Preloader = ({ onFinish }: { onFinish: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 5000);
        return () => clearTimeout(timer);
    }, [onFinish]);

    const containerVariants: Variants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.4,
                delayChildren: 0.2
            }
        },
        exit: {
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
            transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }
        }
    };

    const ficcVariants: Variants = {
        initial: { opacity: 0, y: -40, scale: 0.9 },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const subsidiaryVariants: Variants = {
        initial: { opacity: 0, y: 30 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeOut" }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-white text-navy overflow-hidden"
        >
            {/* Premium Background Elements */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

            {/* Animated Gradient Orbs */}
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-navy/5 rounded-full blur-[100px]"
            />
            <motion.div
                animate={{
                    x: [0, -40, 0],
                    y: [0, 60, 0],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[100px]"
            />

            <div className="relative flex flex-col items-center z-10 w-full max-w-5xl px-8">

                {/* TOP: FICC Parent Company */}
                <motion.div variants={ficcVariants} className="flex flex-col items-center mb-16">
                    <div className="relative">
                        <motion.div
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute inset-0 bg-navy/5 blur-2xl rounded-full"
                        />
                        <img
                            src="/ficc.png"
                            alt="FICC"
                            className="h-40 md:h-56 object-contain relative z-10"
                        />
                    </div>
                </motion.div>

                {/* BOTTOM: Subsidiaries */}
                <div className="grid grid-cols-2 gap-12 md:gap-32 items-center">
                    <motion.div
                        variants={subsidiaryVariants}
                        className="flex flex-col items-center"
                    >
                        <div className="h-32 md:h-44 flex items-center justify-center">
                            <img src="/vv.png" alt="VV Exports" className="h-full object-contain" />
                        </div>
                    </motion.div>

                    <motion.div
                        variants={subsidiaryVariants}
                        className="flex flex-col items-center"
                    >
                        <div className="h-32 md:h-44 flex items-center justify-center">
                            <img src="/lm.png" alt="Ladderman Clothing" className="h-full object-contain" />
                        </div>
                    </motion.div>
                </div>

                {/* Loading Bar */}
                <div className="absolute bottom-[-120px] w-64">
                    <div className="h-[2px] w-full bg-navy/5 relative overflow-hidden">
                        <motion.div
                            initial={{ left: "-100%" }}
                            animate={{ left: "100%" }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-accent to-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Decorative Threads */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                {[...Array(5)].map((_, i) => (
                    <motion.path
                        key={i}
                        d={`M -100 ${20 + i * 15} Q ${200 + i * 100} ${50 + i * 20} 1200 ${30 + i * 10}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.3 }}
                        transition={{ duration: 3, delay: i * 0.2, repeat: Infinity, repeatType: "reverse" }}
                    />
                ))}
            </svg>
        </motion.div>
    );
};

export default Preloader;
