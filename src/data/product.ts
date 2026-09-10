import type { OrderStatus, SampleOrder, PreviewView } from "@/types/product";
import { orderTotal } from "@/lib/format";

// Illustrative data only. No connection to the separate store admin application.
export const sampleOrders: SampleOrder[] = [
  {
    id: "NP-0128",
    customer: "Minh Anh",
    initials: "MA",
    service: "Giặt sấy",
    status: "washing",
    items: [
      { name: "Giặt sấy quần áo", quantity: 5, unit: "kg", price: 20000 },
    ],
    discount: 10000,
    paid: 0,
    receivedAt: "08:30, 08/09/2026",
    dueAt: "17:00, 09/09/2026",
  },
  {
    id: "NP-0127",
    customer: "Hoàng Nam",
    initials: "HN",
    service: "Giặt chăn",
    status: "ready",
    items: [{ name: "Giặt chăn", quantity: 2, unit: "chiếc", price: 80000 }],
    discount: 0,
    paid: 160000,
    receivedAt: "09:15, 08/09/2026",
    dueAt: "15:00, 09/09/2026",
  },
  {
    id: "NP-0126",
    customer: "Thu Hà",
    initials: "TH",
    service: "Giặt sấy",
    status: "completed",
    items: [
      { name: "Giặt sấy quần áo", quantity: 6, unit: "kg", price: 20000 },
    ],
    discount: 0,
    paid: 120000,
    receivedAt: "10:00, 08/09/2026",
    dueAt: "10:00, 09/09/2026",
  },
  {
    id: "NP-0125",
    customer: "Gia Bảo",
    initials: "GB",
    service: "Giặt hấp",
    status: "received",
    items: [
      { name: "Giặt hấp áo vest", quantity: 1, unit: "chiếc", price: 80000 },
    ],
    discount: 0,
    paid: 0,
    receivedAt: "11:30, 08/09/2026",
    dueAt: "17:00, 10/09/2026",
  },
  {
    id: "NP-0124",
    customer: "Ngọc Lan",
    initials: "NL",
    service: "Giặt sấy",
    status: "washing",
    items: [
      { name: "Giặt sấy quần áo", quantity: 7, unit: "kg", price: 20000 },
    ],
    discount: 0,
    paid: 70000,
    receivedAt: "14:20, 08/09/2026",
    dueAt: "17:00, 09/09/2026",
  },
];

export const orderStatuses: Record<OrderStatus, string> = {
  received: "Mới nhận",
  washing: "Đang giặt",
  ready: "Chờ trả",
  completed: "Hoàn thành",
};

export const previewViews: { id: PreviewView; label: string }[] = [
  { id: "overview", label: "Tổng quan" },
  { id: "orders", label: "Đơn hàng" },
  { id: "customers", label: "Khách hàng" },
];

export const sampleTotals = {
  orders: sampleOrders.length,
  paid: sampleOrders.reduce((sum, order) => sum + order.paid, 0),
  outstanding: sampleOrders.reduce(
    (sum, order) => sum + orderTotal(order) - order.paid,
    0,
  ),
};

export const weeklyRevenue = [
  { day: "T4", amount: 220000 },
  { day: "T5", amount: 380000 },
  { day: "T6", amount: 290000 },
  { day: "T7", amount: 460000 },
  { day: "CN", amount: 570000 },
  { day: "T2", amount: 420000 },
  { day: "T3", amount: sampleTotals.paid },
];
