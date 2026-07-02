import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 border-b border-white/10 pb-20">
        <div className="col-span-2">
          <div className="text-2xl font-extrabold tracking-tighter mb-6">
            PRNT<span className="text-accent">.</span>STUDIO
          </div>
          <p className="text-white/40 max-w-xs mb-8">
            Révolutionner la personnalisation textile pour les créateurs, les startups et les particuliers exigeants.
          </p>
          <div className="flex gap-3">
            <a href="#" aria-label="Instagram" className="size-9 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors grid place-items-center text-xs font-bold">Ig</a>
            <a href="#" aria-label="TikTok" className="size-9 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors grid place-items-center text-xs font-bold">Tk</a>
            <a href="#" aria-label="Pinterest" className="size-9 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors grid place-items-center text-xs font-bold">Pi</a>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-6">Boutique</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li><Link to="/products" className="hover:text-white">Tous les produits</Link></li>
            <li><Link to="/studio" className="hover:text-white">Studio de création</Link></li>
            <li><Link to="/cart" className="hover:text-white">Panier</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Compagnie</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li><Link to="/about" className="hover:text-white">À propos</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact & FAQ</Link></li>
            <li><a href="#" className="hover:text-white">Livraison</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-10 flex flex-col md:flex-row justify-between gap-6 text-[10px] font-bold uppercase tracking-widest text-white/20">
        <p>© 2026 PRNT.STUDIO — Tous droits réservés.</p>
        <div className="flex gap-8">
          <a href="#">Mentions légales</a>
          <a href="#">Confidentialité</a>
        </div>
      </div>
    </footer>
  );
}