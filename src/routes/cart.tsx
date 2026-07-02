import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Trash2, ShoppingBag, Lock } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useCart, removeFromCart, updateQuantity, cartSubtotal, clearCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Panier & commande — PRNT.STUDIO" },
      { name: "description", content: "Finalisez votre commande de vêtements personnalisés." },
    ],
  }),
  component: CartPage,
});

const formSchema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().min(6, "Téléphone invalide").max(30),
  address: z.string().trim().min(5, "Adresse trop courte").max(300),
  city: z.string().trim().min(2).max(100),
  zip: z.string().trim().min(3).max(20),
});

function CartPage() {
  const items = useCart();
  const subtotal = cartSubtotal(items);
  const shipping = items.length === 0 ? 0 : subtotal >= 60 ? 0 : 4.9;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = formSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Formulaire invalide");
      return;
    }
    if (items.length === 0) {
      toast.error("Votre panier est vide");
      return;
    }
    toast.success("Commande enregistrée ! (démo — Stripe à intégrer)");
    clearCart();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">Panier & commande</h1>
        <p className="text-foreground/60 mb-12">Vérifiez vos créations puis finalisez.</p>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-secondary/40 rounded-3xl">
            <ShoppingBag className="size-12 mx-auto text-foreground/30 mb-4" />
            <p className="text-foreground/60 mb-6">Votre panier est vide.</p>
            <Link
              to="/studio"
              className="inline-block px-8 py-4 bg-foreground text-background rounded-xl font-bold"
            >
              Créer un design
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items + form */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-secondary/40 rounded-2xl">
                    <div
                      className="size-24 rounded-xl shrink-0 relative overflow-hidden ring-1 ring-black/5 grid place-items-center"
                      style={{ backgroundColor: item.colorHex }}
                    >
                      {item.designImage ? (
                        <img src={item.designImage} alt="" className="max-w-[70%] max-h-[70%] object-contain" />
                      ) : item.designText ? (
                        <span
                          className="text-xs font-bold"
                          style={{ color: item.colorHex === "#ffffff" ? "#000" : "#fff" }}
                        >
                          {item.designText.slice(0, 8)}
                        </span>
                      ) : null}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-bold">{item.productName}</h3>
                          <p className="text-xs text-foreground/50 mt-0.5">
                            {item.color} · Taille {item.size}
                            {item.designText && ` · "${item.designText}"`}
                            {item.designImage && ` · Logo personnalisé`}
                          </p>
                        </div>
                        <p className="font-bold whitespace-nowrap">{(item.price * item.quantity).toFixed(2)}€</p>
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center border border-black/10 rounded-lg overflow-hidden text-sm">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-1 hover:bg-secondary"
                            aria-label="Diminuer"
                          >
                            −
                          </button>
                          <span className="px-3 font-bold tabular-nums">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-1 hover:bg-secondary"
                            aria-label="Augmenter"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-foreground/50 hover:text-destructive inline-flex items-center gap-1"
                        >
                          <Trash2 className="size-3.5" /> Retirer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={submit} className="bg-background rounded-2xl border border-black/5 p-6 space-y-4">
                <h2 className="text-xl font-extrabold tracking-tight">Informations de livraison</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Nom complet" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                  <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                  <Field label="Téléphone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                  <Field label="Ville" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
                  <div className="sm:col-span-2">
                    <Field label="Adresse" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
                  </div>
                  <Field label="Code postal" value={form.zip} onChange={(v) => setForm({ ...form, zip: v })} />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 text-white rounded-xl font-bold shadow-lg inline-flex items-center justify-center gap-2"
                  style={{ backgroundImage: "linear-gradient(135deg, #8B5CF6, #3B82F6)" }}
                >
                  <Lock className="size-4" /> Payer {total.toFixed(2)}€
                </button>
                <p className="text-xs text-foreground/50 text-center">
                  Paiement sécurisé — intégration Stripe prête.
                </p>
              </form>
            </div>

            {/* Summary */}
            <aside className="lg:sticky lg:top-24 h-fit bg-secondary/40 rounded-2xl p-6 space-y-4">
              <h2 className="font-extrabold text-lg">Récapitulatif</h2>
              <Row label="Sous-total" value={`${subtotal.toFixed(2)}€`} />
              <Row label="Impression" value="Incluse" />
              <Row label="Livraison" value={shipping === 0 ? "Offerte" : `${shipping.toFixed(2)}€`} />
              <div className="border-t border-black/10 pt-4 flex justify-between items-center">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-extrabold">{total.toFixed(2)}€</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-foreground/50">
                  Livraison offerte dès 60€ d'achat.
                </p>
              )}
            </aside>
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-foreground/60 mb-1.5 block">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-lg bg-secondary text-sm outline-none focus:ring-2 focus:ring-accent"
        required
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-foreground/60">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}