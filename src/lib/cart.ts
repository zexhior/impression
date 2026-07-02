import { useSyncExternalStore } from "react";
import type { ProductId } from "./products";

export type CartItem = {
  id: string;
  productId: ProductId;
  productName: string;
  color: string;
  colorHex: string;
  size: string;
  quantity: number;
  price: number;
  designText?: string;
  designImage?: string;
};

const STORAGE_KEY = "prnt_cart";
let items: CartItem[] = [];
const listeners = new Set<() => void>();

function load() {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) items = JSON.parse(raw);
  } catch {
    items = [];
  }
}

function save() {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  listeners.forEach((l) => l());
}

load();

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function getSnapshot() {
  return items;
}

function getServerSnapshot(): CartItem[] {
  return [];
}

export function useCart() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function addToCart(item: Omit<CartItem, "id">) {
  items = [...items, { ...item, id: crypto.randomUUID() }];
  save();
}

export function removeFromCart(id: string) {
  items = items.filter((i) => i.id !== id);
  save();
}

export function updateQuantity(id: string, quantity: number) {
  items = items.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i));
  save();
}

export function clearCart() {
  items = [];
  save();
}

export function cartSubtotal(list: CartItem[]) {
  return list.reduce((sum, i) => sum + i.price * i.quantity, 0);
}