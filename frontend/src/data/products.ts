import productExecutiveShirt from "@/assets/product-executive-shirt.jpg";
import productIndustrialCoverall from "@/assets/product-industrial-coverall.jpg";
import productChefJacket from "@/assets/product-chef-jacket.jpg";
import productCorporateBlazer from "@/assets/product-corporate-blazer.jpg";
import productMedicalScrubs from "@/assets/product-medical-scrubs.jpg";
import productOfficeTrousers from "@/assets/product-office-trousers.jpg";
import productCorporateSaree from "@/assets/product-corporate-saree.jpg";
import productSchoolUniform from "@/assets/product-school-uniform.jpg";

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  category: string;
  subcategory?: string;
  image: string;
  images?: string[];
  sizes: string[];
  colors?: ColorOption[];
  isCustomizable?: boolean;
  fabric?: string;
  description: string;
  features?: string[];
}

export const defaultColors: ColorOption[] = [
  { name: "Navy Blue", hex: "#1a2744" },
  { name: "Midnight Black", hex: "#0a0a0a" },
  { name: "Arctic White", hex: "#ffffff" },
  { name: "Royal Maroon", hex: "#800020" },
  { name: "Charcoal Grey", hex: "#444444" },
];

export const allSizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL", "Custom"];

export const categories = [
  { id: "corporate", name: "Corporate Office", description: "Sharp, professional attire for executive roles" },
  { id: "tshirts", name: "Custom T-Shirts", description: "Promotional and branding wear for all industries" },
  { id: "school", name: "School & College", description: "Durable uniforms for students of all ages" },
  { id: "healthcare", name: "Hospital & Medical", description: "Sterile, comfortable scrubs and lab coats" },
  { id: "industrial", name: "Industrial & Factory", description: "Safety-first workwear for heavy-duty environments" },
  { id: "hospitality", name: "Hotel & Restaurant", description: "Elegant uniforms for the service industry" },
  { id: "sports", name: "Sports & Athletics", description: "Performance wear for team events and marathons" },
  { id: "police", name: "Police & Security", description: "Official authorized fabrics and uniforms" },
  { id: "military", name: "Military & Tactical", description: "Specialized uniforms for defense sectors" },
  { id: "salon", name: "Salon & Wellness", description: "Functional attire for the beauty industry" },
  { id: "customize", name: "Custom Fabrics", description: "Premium Linen, Cotton, and Dhotis" },
];

export const products: Product[] = [];

export const getProductsByCategory = (categoryId: string) =>
  products.filter((p) => p.category === categoryId);

export const getProductById = (id: string) =>
  products.find((p) => p.id === id);
