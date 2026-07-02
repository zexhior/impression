import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";

export function SiteHeader() {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-black/5 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-extrabold tracking-tighter">
        PRNT<span className="text-accent">.</span>STUDIO
      </Link>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <Link to="/products" className="hover:text-accent transition-colors" activeProps={{ className: "text-accent" }}>Produits</Link>
        <Link to="/studio" className="hover:text-accent transition-colors" activeProps={{ className: "text-accent" }}>Studio</Link>
        <Link to="/about" className="hover:text-accent transition-colors" activeProps={{ className: "text-accent" }}>À propos</Link>
        <Link to="/contact" className="hover:text-accent transition-colors" activeProps={{ className: "text-accent" }}>Contact</Link>
      </div>
      <div className="flex items-center gap-3">
        <Link to="/cart" className="p-2 hover:bg-black/5 rounded-full transition-colors" aria-label="Panier">
          <ShoppingBag className="size-5" />
        </Link>
        <Link
          to="/studio"
          className="px-5 py-2 text-sm font-semibold bg-foreground text-background rounded-full hover:bg-foreground/90 transition-all hidden sm:inline-flex"
        >
          Créer mon design
        </Link>
      </div>
    </nav>
  );
}