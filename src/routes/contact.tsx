import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, MessageCircle, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & FAQ — PRNT.STUDIO" },
      { name: "description", content: "Contactez l'équipe PRNT.STUDIO. Email, WhatsApp, questions fréquentes." },
      { property: "og:title", content: "Contact — PRNT.STUDIO" },
      { property: "og:description", content: "Une question ? On vous répond sous 24h." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  message: z.string().trim().min(10, "Message trop court").max(1000),
});

const FAQS = [
  { q: "Quel est le délai de livraison ?", a: "Vos commandes sont expédiées sous 48h ouvrées depuis notre atelier de Bordeaux. Livraison sous 2-4 jours en France, 3-6 jours en Europe." },
  { q: "Y a-t-il un minimum de commande ?", a: "Aucun minimum. Vous pouvez commander une seule pièce personnalisée." },
  { q: "Quels formats de fichiers puis-je uploader ?", a: "PNG, JPG et SVG jusqu'à 10 MB. Pour une qualité optimale, préférez le SVG ou un PNG haute résolution (300 dpi min)." },
  { q: "Puis-je retourner un vêtement personnalisé ?", a: "Retours gratuits sous 30 jours si le produit présente un défaut ou si l'impression ne correspond pas à votre design." },
];

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Formulaire invalide");
      return;
    }
    toast.success("Message envoyé ! On revient vers vous sous 24h.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="max-w-6xl mx-auto px-6 py-16">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">Contact</span>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mt-3 mb-4">Parlons-en.</h1>
        <p className="text-foreground/60 text-lg max-w-xl mb-16">
          Une question, un projet en volume, une demande sur-mesure ? On vous répond sous 24h.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-foreground/60 mb-1.5 block">Nom</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-3 rounded-lg bg-secondary text-sm outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-foreground/60 mb-1.5 block">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-3 rounded-lg bg-secondary text-sm outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-foreground/60 mb-1.5 block">Message</label>
              <textarea
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-3 py-3 rounded-lg bg-secondary text-sm outline-none focus:ring-2 focus:ring-accent resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-foreground text-background rounded-xl font-bold"
            >
              Envoyer le message
            </button>
          </form>

          <div className="space-y-6">
            <a
              href="mailto:hello@prnt.studio"
              className="flex items-start gap-4 p-6 bg-secondary/40 rounded-2xl hover:bg-secondary transition-colors"
            >
              <div className="size-11 bg-background rounded-xl grid place-items-center ring-1 ring-black/5">
                <Mail className="size-5" />
              </div>
              <div>
                <h3 className="font-bold">Email</h3>
                <p className="text-sm text-foreground/60 mt-0.5">hello@prnt.studio</p>
              </div>
            </a>
            <a
              href="https://wa.me/33600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-6 bg-secondary/40 rounded-2xl hover:bg-secondary transition-colors"
            >
              <div className="size-11 bg-background rounded-xl grid place-items-center ring-1 ring-black/5">
                <MessageCircle className="size-5" />
              </div>
              <div>
                <h3 className="font-bold">WhatsApp</h3>
                <p className="text-sm text-foreground/60 mt-0.5">Réponse en direct 9h—19h</p>
              </div>
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8">Questions fréquentes</h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group bg-secondary/40 rounded-xl p-5 open:bg-secondary/60">
                <summary className="flex items-center justify-between cursor-pointer font-bold list-none">
                  {f.q}
                  <ChevronDown className="size-4 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-sm text-foreground/60 mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}