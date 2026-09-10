export type OrderStatus = "received" | "washing" | "ready" | "completed";
export type PreviewView = "overview" | "orders" | "customers";

export interface OrderItem {
  name: string;
  quantity: number;
  unit: string;
  price: number;
}

export interface SampleOrder {
  id: string;
  customer: string;
  initials: string;
  service: string;
  status: OrderStatus;
  items: OrderItem[];
  discount: number;
  paid: number;
  receivedAt: string;
  dueAt: string;
}
