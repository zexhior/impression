import tshirt from "@/assets/product-tshirt.jpg";
import croptop from "@/assets/product-croptop.jpg";
import hoodie from "@/assets/product-hoodie.jpg";
import tank from "@/assets/product-tank.jpg";

export type ProductId = "tshirt" | "croptop" | "hoodie" | "tank";

export type Product = {
  id: ProductId;
  name: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "tshirt",
    name: "T-shirt Oversized",
    tagline: "L'essentiel unisexe",
    description: "Coton peigné 220g. Coupe oversized moderne, épaules tombantes, finitions renforcées.",
    price: 29,
    image: tshirt,
  },
  {
    id: "croptop",
    name: "Crop Top Signature",
    tagline: "La coupe femme moderne",
    description: "Coupe boxy ajustée. Coton stretch premium, tombé impeccable, made for style.",
    price: 25,
    image: croptop,
  },
  {
    id: "tank",
    name: "Débardeur Sport",
    tagline: "Performance & style",
    description: "Coton respirant 180g. Emmanchures larges, séchage rapide, coupe athlétique.",
    price: 22,
    image: tank,
  },
  {
    id: "hoodie",
    name: "Hoodie Léger",
    tagline: "Le confort premium",
    description: "French Terry 280g. Capuche doublée, poche kangourou, coupe relax intemporelle.",
    price: 45,
    image: hoodie,
  },
];

export function getProduct(id: ProductId): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export const COLORS = [
  { id: "black", name: "Noir", hex: "#0a0a0a" },
  { id: "white", name: "Blanc", hex: "#ffffff" },
  { id: "grey", name: "Gris", hex: "#a1a1a1" },
  { id: "blue", name: "Bleu", hex: "#2563eb" },
  { id: "violet", name: "Violet", hex: "#8b5cf6" },
  { id: "red", name: "Rouge", hex: "#dc2626" },
];