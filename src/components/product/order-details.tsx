import { site } from "@/data/site";
import { formatCurrency, orderSubtotal, orderTotal } from "@/lib/format";
import type { SampleOrder } from "@/types/product";
import { StatusBadge } from "@/components/ui/status-badge";
import { Icon } from "@/components/ui/icon";

export function OrderDetails({
  order,
  compact = false,
}: {
  order: SampleOrder;
  compact?: boolean;
}) {
  return (
    <div className={`order-details ${compact ? "order-details-compact" : ""}`}>
      <div className="receipt-heading">
        <div className="receipt-symbol">
          <Icon name="receipt" size={24} weight="light" />
        </div>
        <div>
          <strong>Phiếu nhận đồ</strong>
          <span>
            {site.name} · {order.id}
          </span>
        </div>
        <StatusBadge status={order.status} />
      </div>
      <dl className="receipt-customer">
        <div>
          <dt>Khách hàng</dt>
          <dd>{order.customer}</dd>
        </div>
        <div>
          <dt>Hẹn trả</dt>
          <dd>{order.dueAt}</dd>
        </div>
        {!compact && (
          <div>
            <dt>Nhận đồ lúc</dt>
            <dd>{order.receivedAt}</dd>
          </div>
        )}
      </dl>
      <div className="receipt-items">
        {order.items.map((item) => (
          <div key={item.name}>
            <span>
              <strong>{item.name}</strong>
              <small>
                {item.quantity} {item.unit} × {formatCurrency(item.price)}
              </small>
            </span>
            <strong>{formatCurrency(item.quantity * item.price)}</strong>
          </div>
        ))}
      </div>
      <dl className="receipt-totals">
        <div>
          <dt>Tạm tính</dt>
          <dd>{formatCurrency(orderSubtotal(order))}</dd>
        </div>
        <div>
          <dt>Giảm giá</dt>
          <dd>-{formatCurrency(order.discount)}</dd>
        </div>
        <div className="receipt-grand-total">
          <dt>Tổng cộng</dt>
          <dd>{formatCurrency(orderTotal(order))}</dd>
        </div>
        {!compact && (
          <>
            <div>
              <dt>Đã thanh toán</dt>
              <dd>{formatCurrency(order.paid)}</dd>
            </div>
            <div className="receipt-due">
              <dt>Còn phải thu</dt>
              <dd>{formatCurrency(orderTotal(order) - order.paid)}</dd>
            </div>
          </>
        )}
      </dl>
      {compact && (
        <div className="receipt-note">
          <Icon name="checkCircle" size={15} />
          Thông tin và thanh toán cùng một đơn.
        </div>
      )}
    </div>
  );
}
