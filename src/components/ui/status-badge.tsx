import { orderStatuses } from "@/data/product";
import type { OrderStatus } from "@/types/product";

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`status-badge status-${status}`}>
      {orderStatuses[status]}
    </span>
  );
}
