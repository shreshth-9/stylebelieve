import tshirt from "@/assets/product-tshirt.jpg";
import hoodie from "@/assets/product-hoodie.jpg";
import dress from "@/assets/product-dress.jpg";
import jacket from "@/assets/product-jacket.jpg";
import jeans from "@/assets/product-jeans.jpg";
import shirt from "@/assets/product-shirt.jpg";

export type Category =
  | "T-Shirts"
  | "Shirts"
  | "Hoodies"
  | "Jackets"
  | "Jeans"
  | "Dresses"
  | "Tops"
  | "Activewear"
  | "Accessories";

export type Gender = "Men" | "Women" | "Unisex";

export interface Product {
  id: string;
  name: string;
  category: Category;
  gender: Gender;
  price: number;
  salePrice?: number;
  image: string;
  hoverImage: string;
  rating: number;
  reviews: number;
  colors: { name: string; hex: string }[];
  sizes: string[];
  badge?: "New" | "Best Seller" | "Limited" | "Staff Pick" | "Trending";
  description: string;
  stock: number;
  createdAt: number;
}

export const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const baseColors = [
  { name: "Black", hex: "#1a1a1a" },
  { name: "Sand", hex: "#cdbba0" },
  { name: "Ivory", hex: "#f3efe7" },
  { name: "Slate", hex: "#6b6b6b" },
];

export const products: Product[] = [
  {
    id: "essential-oversized-tee",
    name: "Essential Oversized Tee",
    category: "T-Shirts",
    gender: "Unisex",
    price: 48,
    salePrice: 36,
    image: tshirt,
    hoverImage: shirt,
    rating: 4.8,
    reviews: 214,
    colors: baseColors,
    sizes: ALL_SIZES,
    badge: "Best Seller",
    description:
      "A relaxed, drop-shoulder silhouette cut from heavyweight organic cotton. The Essential Tee is the foundation of every STYLE BELIEVE wardrobe — soft, structured, and built to last.",
    stock: 42,
    createdAt: 6,
  },
  {
    id: "monolith-heavy-hoodie",
    name: "Monolith Heavy Hoodie",
    category: "Hoodies",
    gender: "Unisex",
    price: 120,
    image: hoodie,
    hoverImage: tshirt,
    rating: 4.9,
    reviews: 389,
    colors: [baseColors[0], baseColors[3], baseColors[1]],
    sizes: ALL_SIZES,
    badge: "Trending",
    description:
      "Premium 480gsm brushed-back fleece with a boxy, contemporary fit. Garment-dyed for depth of color and finished with a double-layer hood.",
    stock: 18,
    createdAt: 9,
  },
  {
    id: "atelier-slip-dress",
    name: "Atelier Slip Dress",
    category: "Dresses",
    gender: "Women",
    price: 165,
    salePrice: 132,
    image: dress,
    hoverImage: jacket,
    rating: 4.7,
    reviews: 142,
    colors: [baseColors[2], baseColors[0], baseColors[1]],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "New",
    description:
      "A fluid bias-cut slip in matte satin with an asymmetric hem. Designed to move with you — equally at home at dinner or a gallery opening.",
    stock: 9,
    createdAt: 10,
  },
  {
    id: "tailored-relaxed-blazer",
    name: "Tailored Relaxed Blazer",
    category: "Jackets",
    gender: "Women",
    price: 240,
    image: jacket,
    hoverImage: dress,
    rating: 4.9,
    reviews: 98,
    colors: [baseColors[1], baseColors[0]],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "Staff Pick",
    description:
      "A single-button blazer with softly structured shoulders and a longline cut. Tailored in a stretch wool-blend that holds its shape all day.",
    stock: 14,
    createdAt: 8,
  },
  {
    id: "classic-straight-jeans",
    name: "Classic Straight Jeans",
    category: "Jeans",
    gender: "Men",
    price: 98,
    image: jeans,
    hoverImage: tshirt,
    rating: 4.6,
    reviews: 256,
    colors: [
      { name: "Indigo", hex: "#2f4a6b" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    sizes: ALL_SIZES,
    badge: "Best Seller",
    description:
      "Mid-weight rigid denim with a clean straight leg. A timeless cut refined over twelve fittings for the perfect everyday silhouette.",
    stock: 60,
    createdAt: 5,
  },
  {
    id: "signature-poplin-shirt",
    name: "Signature Poplin Shirt",
    category: "Shirts",
    gender: "Men",
    price: 88,
    salePrice: 70,
    image: shirt,
    hoverImage: hoodie,
    rating: 4.8,
    reviews: 167,
    colors: [baseColors[2], baseColors[1], baseColors[3]],
    sizes: ALL_SIZES,
    badge: "Limited",
    description:
      "Crisp cotton poplin with a hidden placket and mother-of-pearl buttons. A modern essential cut for a clean, slightly relaxed drape.",
    stock: 7,
    createdAt: 7,
  },
  {
    id: "luxe-knit-top",
    name: "Luxe Ribbed Knit Top",
    category: "Tops",
    gender: "Women",
    price: 72,
    image: dress,
    hoverImage: shirt,
    rating: 4.7,
    reviews: 83,
    colors: [baseColors[1], baseColors[2], baseColors[0]],
    sizes: ["XS", "S", "M", "L"],
    badge: "New",
    description:
      "A fine-gauge ribbed knit with a sculpted neckline. Lightweight stretch yarn that skims the body for an effortless second-skin feel.",
    stock: 22,
    createdAt: 10,
  },
  {
    id: "motion-active-jacket",
    name: "Motion Active Jacket",
    category: "Activewear",
    gender: "Men",
    price: 135,
    image: hoodie,
    hoverImage: jacket,
    rating: 4.8,
    reviews: 119,
    colors: [baseColors[0], baseColors[3]],
    sizes: ALL_SIZES,
    badge: "Trending",
    description:
      "A water-repellent technical shell with four-way stretch and bonded seams. Engineered for movement, styled for the street.",
    stock: 31,
    createdAt: 9,
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);