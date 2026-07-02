import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { z } from "zod";
import { Upload, Type, Trash2, ShoppingBag, Check } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PRODUCTS, COLORS, getProduct, type ProductId } from "@/lib/products";
import { addToCart } from "@/lib/cart";
import { toast } from "sonner";

const searchSchema = z.object({
  product: z.enum(["tshirt", "croptop", "hoodie", "tank"]).optional(),
});

export const Route = createFileRoute("/studio")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Studio de création — PRNT.STUDIO" },
      { name: "description", content: "Personnalisez vos vêtements en direct : upload logo, texte, couleurs. Preview temps réel avant commande." },
      { property: "og:title", content: "Studio de création — PRNT.STUDIO" },
      { property: "og:description", content: "Personnalisez vos vêtements en direct : upload logo, texte, couleurs." },
    ],
  }),
  component: StudioPage,
});

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const FONTS = [
  { id: "inter", label: "Inter", css: "'Inter', sans-serif" },
  { id: "serif", label: "Serif", css: "Georgia, serif" },
  { id: "mono", label: "Mono", css: "ui-monospace, monospace" },
  { id: "display", label: "Display", css: "Impact, sans-serif" },
];

function StudioPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const initial = (search.product as ProductId | undefined) ?? "tshirt";
  const [productId, setProductId] = useState<ProductId>(initial);
  const [colorId, setColorId] = useState("black");
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  const [text, setText] = useState("");
  const [textColor, setTextColor] = useState("#ffffff");
  const [fontId, setFontId] = useState("inter");
  const [textSize, setTextSize] = useState(32);
  const [rotation, setRotation] = useState(0);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const product = useMemo(() => getProduct(productId)!, [productId]);
  const color = useMemo(() => COLORS.find((c) => c.id === colorId)!, [colorId]);
  const font = useMemo(() => FONTS.find((f) => f.id === fontId)!, [fontId]);

  const unitPrice = product.price + (uploadedImage || text ? 5 : 0);
  const total = unitPrice * quantity;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Fichier trop volumineux (max 10MB)");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleAddToCart = () => {
    addToCart({
      productId,
      productName: product.name,
      color: color.name,
      colorHex: color.hex,
      size,
      quantity,
      price: unitPrice,
      designText: text || undefined,
      designImage: uploadedImage || undefined,
    });
    toast.success("Ajouté au panier !", {
      action: { label: "Voir le panier", onClick: () => navigate({ to: "/cart" }) },
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Studio de création</h1>
          <p className="text-foreground/60 mt-2">Personnalisez votre vêtement en direct.</p>
        </div>

        <div className="bg-background rounded-3xl shadow-2xl overflow-hidden border border-black/5 grid lg:grid-cols-12 min-h-[700px]">
          {/* Toolbar */}
          <div className="lg:col-span-4 xl:col-span-3 border-r border-black/5 p-6 md:p-8 flex flex-col gap-8 overflow-y-auto">
            <ToolSection label="Produit">
              <div className="grid grid-cols-2 gap-2">
                {PRODUCTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setProductId(p.id)}
                    className={`p-3 rounded-xl text-xs font-bold text-left transition-all ${
                      productId === p.id
                        ? "border-2 border-accent bg-accent/5"
                        : "border border-black/10 hover:bg-secondary"
                    }`}
                  >
                    {p.name}
                    <div className="text-[10px] font-normal text-foreground/50 mt-1">{p.price}€</div>
                  </button>
                ))}
              </div>
            </ToolSection>

            <ToolSection label="Couleur du vêtement">
              <div className="flex flex-wrap gap-3">
                {COLORS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setColorId(c.id)}
                    aria-label={c.name}
                    className={`size-9 rounded-full ring-1 ring-black/10 transition-all ${
                      colorId === c.id ? "ring-2 ring-offset-2 ring-accent" : ""
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </ToolSection>

            <ToolSection label="Taille">
              <div className="grid grid-cols-6 gap-1.5">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`py-2 rounded-lg text-xs font-bold transition-all ${
                      size === s ? "bg-foreground text-background" : "bg-secondary hover:bg-secondary/60"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </ToolSection>

            <ToolSection label="Design — Image">
              <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml"
                onChange={handleUpload}
                className="hidden"
              />
              {uploadedImage ? (
                <div className="flex items-center gap-2">
                  <div className="size-12 rounded-lg overflow-hidden bg-secondary ring-1 ring-black/10">
                    <img src={uploadedImage} alt="Design" className="w-full h-full object-contain" />
                  </div>
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="p-2 rounded-lg hover:bg-secondary text-foreground/60"
                    aria-label="Retirer"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full py-4 border-2 border-dashed border-black/10 rounded-xl flex flex-col items-center gap-1.5 hover:border-accent/40 hover:bg-accent/5 transition-all"
                >
                  <Upload className="size-5 text-foreground/50" />
                  <span className="text-xs font-bold text-foreground/60">Glissez votre logo</span>
                  <span className="text-[10px] text-foreground/40 uppercase">PNG, SVG max 10MB</span>
                </button>
              )}
            </ToolSection>

            <ToolSection label="Design — Texte">
              <div className="space-y-3">
                <div className="relative">
                  <Type className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value.slice(0, 40))}
                    placeholder="Votre texte…"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-secondary text-sm outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                {text && (
                  <>
                    <div className="grid grid-cols-4 gap-1.5">
                      {FONTS.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setFontId(f.id)}
                          className={`py-2 rounded-lg text-[11px] font-bold transition-all ${
                            fontId === f.id ? "bg-foreground text-background" : "bg-secondary hover:bg-secondary/60"
                          }`}
                          style={{ fontFamily: f.css }}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                    <label className="flex items-center gap-3 text-xs">
                      <span className="font-bold w-16">Taille</span>
                      <input
                        type="range"
                        min={16}
                        max={72}
                        value={textSize}
                        onChange={(e) => setTextSize(+e.target.value)}
                        className="flex-1 accent-accent"
                      />
                      <span className="w-8 text-right tabular-nums">{textSize}</span>
                    </label>
                    <label className="flex items-center gap-3 text-xs">
                      <span className="font-bold w-16">Rotation</span>
                      <input
                        type="range"
                        min={-45}
                        max={45}
                        value={rotation}
                        onChange={(e) => setRotation(+e.target.value)}
                        className="flex-1 accent-accent"
                      />
                      <span className="w-8 text-right tabular-nums">{rotation}°</span>
                    </label>
                    <label className="flex items-center gap-3 text-xs">
                      <span className="font-bold w-16">Couleur</span>
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="h-8 w-16 rounded cursor-pointer bg-transparent"
                      />
                    </label>
                  </>
                )}
              </div>
            </ToolSection>
          </div>

          {/* Preview */}
          <div className="lg:col-span-8 xl:col-span-9 flex flex-col">
            <div className="flex-1 bg-secondary/40 p-6 md:p-12 flex items-center justify-center relative min-h-[400px]">
              <div className="relative w-full max-w-md aspect-square">
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden shadow-sm"
                  style={{
                    backgroundColor: color.hex,
                    backgroundImage: `url(${product.image})`,
                    backgroundBlendMode: color.id === "white" ? "normal" : "multiply",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                {/* Print zone */}
                <div className="absolute top-[28%] left-[32%] w-[36%] h-[38%] flex items-center justify-center">
                  {uploadedImage && (
                    <img
                      src={uploadedImage}
                      alt="Design"
                      className="max-w-full max-h-full object-contain"
                      style={{ transform: `rotate(${rotation}deg)` }}
                    />
                  )}
                  {text && !uploadedImage && (
                    <span
                      className="font-bold text-center leading-tight break-words"
                      style={{
                        fontFamily: font.css,
                        color: textColor,
                        fontSize: `${textSize * 0.5}px`,
                        transform: `rotate(${rotation}deg)`,
                      }}
                    >
                      {text}
                    </span>
                  )}
                  {text && uploadedImage && (
                    <span
                      className="absolute bottom-0 font-bold text-center"
                      style={{
                        fontFamily: font.css,
                        color: textColor,
                        fontSize: `${textSize * 0.4}px`,
                        transform: `rotate(${rotation}deg)`,
                      }}
                    >
                      {text}
                    </span>
                  )}
                  {!text && !uploadedImage && (
                    <div className="w-full h-full border-2 border-dashed border-accent/30 rounded-md flex items-center justify-center">
                      <span className="text-[10px] font-bold text-accent/60 uppercase tracking-wider bg-background/80 px-3 py-1.5 rounded-full">
                        Zone d'impression
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="absolute top-4 left-4 md:top-6 md:left-6 flex gap-2">
                <span className="px-3 py-1 bg-background rounded-full text-[10px] font-bold shadow-sm">FACE</span>
                <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold text-foreground/40">DOS</span>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-black/5 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-background">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs text-foreground/50 uppercase font-bold tracking-widest">Total</p>
                  <p className="text-3xl font-extrabold tabular-nums">{total.toFixed(2)}€</p>
                </div>
                <div className="flex items-center border border-black/10 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 hover:bg-secondary font-bold"
                    aria-label="Diminuer"
                  >
                    −
                  </button>
                  <span className="px-4 font-bold tabular-nums">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 hover:bg-secondary font-bold"
                    aria-label="Augmenter"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                className="px-8 py-4 text-white rounded-xl font-bold shadow-lg hover:-translate-y-0.5 transition-transform inline-flex items-center justify-center gap-2"
                style={{ backgroundImage: "linear-gradient(135deg, #8B5CF6, #3B82F6)" }}
              >
                <ShoppingBag className="size-4" /> Ajouter au panier
              </button>
            </div>
          </div>
        </div>

        {/* Trust row */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {["Livraison 48h", "Retours gratuits 30j", "Impression HD garantie", "Aucun minimum"].map((t) => (
            <div key={t} className="flex items-center gap-2 text-foreground/60">
              <Check className="size-4 text-accent" /> {t}
            </div>
          ))}
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

function ToolSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-3 block">
        {label}
      </label>
      {children}
    </div>
  );
}