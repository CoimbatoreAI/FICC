import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

const SectionHeading = ({ label, title, description, align = "center", light = false }: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 sm:mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {label && (
        <span className="text-[10px] uppercase tracking-[0.4em] font-black mb-4 block italic text-accent">
          {label}
        </span>
      )}
      <h2 className={`text-5xl md:text-6xl font-display font-bold leading-tight italic uppercase tracking-tighter ${light ? "text-white" : "text-navy"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-6 text-base md:text-lg max-w-2xl font-medium italic ${align === "center" ? "mx-auto" : ""} text-navy/40`}>
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
