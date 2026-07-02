import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Produits — PRNT.STUDIO" },
      { name: "description", content: "Catalogue de vêtements premium personnalisables : t-shirts, crop tops, débardeurs, hoodies." },
      { property: "og:title", content: "Catalogue — PRNT.STUDIO" },
      { property: "og:description", content: "T-shirts, crop tops, débardeurs et hoodies premium à personnaliser." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Catalogue</span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mt-3 mb-4">
            Chaque pièce, à votre image.
          </h1>
          <p className="text-foreground/60 text-lg">
            Coupes modernes, matières premium. Choisissez votre base, passez au studio pour la personnaliser.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="group">
              <div className="aspect-[4/5] bg-secondary rounded-2xl overflow-hidden mb-5 ring-1 ring-black/5 relative">
                <img
                  src={p.image}
                  alt={p.name}
                  width={800}
                  height={800}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Link
                  to="/studio"
                  search={{ product: p.id }}
                  className="absolute inset-x-4 bottom-4 py-3 bg-background rounded-xl font-bold text-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all inline-flex items-center justify-center gap-2"
                >
                  Personnaliser <ArrowRight className="size-4" />
                </Link>
              </div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h2 className="text-xl font-bold">{p.name}</h2>
                  <p className="text-xs text-foreground/50 mt-0.5">{p.tagline}</p>
                </div>
                <p className="text-lg font-extrabold whitespace-nowrap">à partir de {p.price}€</p>
              </div>
              <p className="text-sm text-foreground/60 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}