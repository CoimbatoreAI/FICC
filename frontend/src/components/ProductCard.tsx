import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";

const ProductCard = ({ product }: { product: Product }) => {
  const savePercentage = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full bg-white group"
    >
      <Link to={`/product/${product.id}`} className="flex flex-col h-full">
        {/* Image Container */}
        <div className="relative aspect-square md:aspect-[4/5] overflow-hidden bg-[#f9f9f9]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Sale Tag */}
          {product.comparePrice && (
            <div className="absolute top-4 right-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 shadow-sm">
              Sale
            </div>
          )}
        </div>

        {/* Content */}
        <div className="pt-6 flex flex-col flex-grow">
          <h3 className="text-base md:text-lg font-bold text-[#1a1a1a] mb-2 leading-tight group-hover:text-accent transition-colors duration-300 capitalize">
            {product.name}
          </h3>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
            {product.comparePrice && (
              <span className="text-sm text-[#999] line-through font-medium">₹{product.comparePrice.toLocaleString()}</span>
            )}
            <span className="text-base md:text-lg font-bold text-[#1a1a1a]">₹{product.price.toLocaleString()}</span>
            {savePercentage > 0 && (
              <span className="text-xs font-bold text-accent uppercase tracking-tighter">Save {savePercentage}%</span>
            )}
          </div>

          {/* Color Swatches */}
          <div className="flex gap-2 mt-auto h-5 items-center">
            {product.colors && product.colors.length > 0 ? (
              <>
                {product.colors.slice(0, 4).map((color: any, idx: number) => (
                  <div
                    key={`${color.name}-${idx}`}
                    className="w-4 h-4 rounded-full border border-gray-200 shadow-sm"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-[9px] text-gray-400 font-bold">+{product.colors.length - 4}</span>
                )}
              </>
            ) : (
              <span className="text-[9px] text-gray-300 uppercase tracking-widest font-bold">Standard</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
