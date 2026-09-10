import type { SampleOrder } from "@/types/product";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export function formatCurrency(amount: number) {
  return currencyFormatter.format(amount);
}

export function orderSubtotal(order: SampleOrder) {
  return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function orderTotal(order: SampleOrder) {
  return orderSubtotal(order) - order.discount;
}

export function httpUrl(value: string | undefined) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol)
      ? url.toString()
      : undefined;
  } catch {
    return undefined;
  }
}
