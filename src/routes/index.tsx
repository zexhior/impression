import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Truck, Palette, Shield } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PRODUCTS } from "@/lib/products";
import heroModel from "@/assets/hero-model.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/20">
      <SiteHeader />

      {/* Hero */}
      <section className="relative px-6 pt-16 pb-24 md:pt-20 md:pb-32 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest">
            <Sparkles className="size-3" /> Nouvelle collection coton bio
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.9]">
            Crée ton style.<br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #8B5CF6, #3B82F6)" }}
            >
              Imprime ton identité.
            </span>
          </h1>
          <p className="text-xl text-foreground/60 max-w-lg">
            T-shirts, crop tops et hoodies premium personnalisés en quelques clics. Qualité startup, livraison éclair.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              to="/studio"
              className="px-8 py-4 bg-foreground text-background rounded-xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all inline-flex items-center gap-2"
            >
              Lancer le Studio <ArrowRight className="size-5" />
            </Link>
            <Link
              to="/products"
              className="px-8 py-4 border border-black/10 rounded-xl font-bold text-lg hover:bg-black/5 transition-all"
            >
              Voir le catalogue
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="w-full aspect-[4/5] bg-zinc-100 rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-2xl">
            <img
              src={heroModel}
              alt="Modèle portant un t-shirt oversized personnalisé PRNT.STUDIO"
              width={1200}
              height={1408}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-background p-5 rounded-2xl shadow-xl border border-black/5 flex items-center gap-4">
            <div
              className="size-12 rounded-full flex items-center justify-center text-white font-bold"
              style={{ backgroundImage: "linear-gradient(135deg, #8B5CF6, #3B82F6)" }}
            >
              3D
            </div>
            <div>
              <p className="text-xs text-foreground/40 font-bold uppercase tracking-wider">Aperçu temps réel</p>
              <p className="font-bold">Preview réaliste</p>
            </div>
          </div>
          <div
            className="absolute -top-8 -right-8 size-40 blur-3xl -z-10 opacity-40"
            style={{ backgroundImage: "linear-gradient(135deg, #8B5CF6, #3B82F6)" }}
          />
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-black/5 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Sparkles, title: "Impression HD", text: "Technologie DTG, couleurs vibrantes." },
            { icon: Truck, title: "Livraison 48h", text: "Expédié depuis Bordeaux." },
            { icon: Palette, title: "100% sur mesure", text: "Studio créatif intuitif." },
            { icon: Shield, title: "Coton bio certifié", text: "GOTS & OEKO-TEX." },
          ].map((b) => (
            <div key={b.title} className="space-y-3">
              <div className="size-11 bg-background rounded-xl flex items-center justify-center ring-1 ring-black/5">
                <b.icon className="size-5" />
              </div>
              <h3 className="font-bold">{b.title}</h3>
              <p className="text-sm text-foreground/60">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Studio teaser */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Le Studio</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-4 mb-4">
            L'interface la plus intuitive pour donner vie à vos idées.
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Uploadez un logo, ajoutez du texte, choisissez la couleur du vêtement — voyez le résultat en temps réel.
          </p>
        </div>
        <div className="rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-2xl bg-secondary/60 p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              {["Upload d'image (PNG, SVG, JPG)", "Texte personnalisable avec 200+ polices", "Choix produit + couleur en direct", "Prévisualisation photo-réaliste"].map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <div className="size-6 rounded-full bg-accent text-white flex items-center justify-center text-xs shrink-0 mt-0.5">✓</div>
                  <p className="font-medium">{f}</p>
                </div>
              ))}
            </div>
            <Link
              to="/studio"
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-xl font-bold hover:-translate-y-1 hover:shadow-2xl transition-all"
            >
              Ouvrir le Studio <ArrowRight className="size-5" />
            </Link>
          </div>
          <div className="relative aspect-square bg-background rounded-2xl ring-1 ring-black/5 grid place-items-center overflow-hidden">
            <img src={PRODUCTS[0].image} alt="Aperçu studio" width={800} height={800} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-8 border-2 border-dashed border-accent/40 rounded-lg grid place-items-center">
              <span className="text-xs font-bold text-accent bg-background/80 px-4 py-2 rounded-full backdrop-blur-sm">Zone d'impression</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Catalogue</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-3">Les essentiels à personnaliser.</h2>
          </div>
          <Link to="/products" className="text-sm font-semibold inline-flex items-center gap-1 hover:text-accent transition-colors">
            Voir tout <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((p) => (
            <Link key={p.id} to="/studio" search={{ product: p.id }} className="group">
              <div className="aspect-[4/5] bg-secondary rounded-2xl overflow-hidden mb-4 ring-1 ring-black/5">
                <img
                  src={p.image}
                  alt={p.name}
                  width={800}
                  height={800}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{p.name}</h3>
                  <p className="text-xs text-foreground/50 mt-0.5">{p.tagline}</p>
                </div>
                <p className="font-bold">{p.price}€</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div
          className="max-w-6xl mx-auto rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden"
          style={{ backgroundImage: "linear-gradient(135deg, #8B5CF6, #3B82F6)" }}
        >
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-3xl mx-auto">
            Prêt à créer quelque chose d'unique ?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            Aucun minimum de commande. Livraison en 48h. Satisfait ou remboursé.
          </p>
          <Link
            to="/studio"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-foreground rounded-xl font-bold text-lg hover:-translate-y-1 transition-transform shadow-2xl"
          >
            Créer mon design <ArrowRight className="size-5" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
