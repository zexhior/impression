import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "À propos — PRNT.STUDIO" },
      {
        name: "description",
        content:
          "L'histoire de PRNT.STUDIO : production locale, coton bio, expression créative sans compromis.",
      },
      { property: "og:title", content: "À propos — PRNT.STUDIO" },
      {
        property: "og:description",
        content: "Production locale, coton bio, expression créative sans compromis.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="max-w-4xl mx-auto px-6 py-24">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">
          Notre histoire
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mt-4 mb-8">
          Habiller ceux qui n'aiment pas se ressembler.
        </h1>
        <p className="text-xl text-foreground/70 leading-relaxed mb-6">
          PRNT.STUDIO est né d'une frustration : commander un vêtement personnalisé de qualité était
          compliqué, lent, et souvent décevant. Nous avons refait le processus de zéro.
        </p>
        <p className="text-foreground/60 leading-relaxed mb-16">
          Depuis notre atelier bordelais, nous fabriquons à la demande — pas de stock, pas de
          gaspillage. Chaque pièce est imprimée en DTG haute résolution sur du coton bio certifié
          GOTS, puis expédiée sous 48h.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            {
              title: "Production locale",
              text: "Atelier à Bordeaux. Circuit court, savoir-faire français.",
            },
            {
              title: "Coton bio certifié",
              text: "GOTS & OEKO-TEX. Aucun compromis sur la qualité ou l'éthique.",
            },
            {
              title: "À la demande",
              text: "Zéro stock, zéro gaspillage. Vous commandez, on imprime.",
            },
          ].map((v) => (
            <div key={v.title} className="p-6 bg-secondary/40 rounded-2xl">
              <h3 className="font-extrabold text-lg mb-2">{v.title}</h3>
              <p className="text-sm text-foreground/60">{v.text}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 py-16 border-y border-black/10">
          {[
            { n: "12k+", l: "Créations imprimées" },
            { n: "48h", l: "Livraison moyenne" },
            { n: "4.9/5", l: "Satisfaction client" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-5xl font-extrabold tracking-tight">{s.n}</div>
              <div className="text-sm text-foreground/50 mt-2 uppercase tracking-widest font-bold">
                {s.l}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight mb-4">Votre style commence ici.</h2>
          <Link
            to="/studio"
            className="inline-block mt-4 px-8 py-4 bg-foreground text-background rounded-xl font-bold"
          >
            Créer mon design
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
