import { landing } from "@/data/site";
import { sampleOrders, sampleTotals } from "@/data/product";
import { formatCurrency, orderTotal } from "@/lib/format";
import { Icon, type IconName } from "@/components/ui/icon";
import { OrderDetails } from "@/components/product/order-details";
import { SampleOrderButton } from "@/components/product/order-dialog";

export function Features() {
  const { features } = landing;
  return (
    <section
      id="tinh-nang"
      className="features section-space container"
      aria-labelledby="features-heading"
    >
      <div className="section-heading">
        <h2 id="features-heading">{features.title}</h2>
        <p>{features.description}</p>
      </div>
      <div className="feature-grid">
        <article className="feature-card feature-orders">
          <div className="feature-copy">
            <div className="feature-card-meta">
              <span>01 / Đơn hàng</span>
              <Icon name="orders" size={24} weight="light" />
            </div>
            <h3>{features.orders.title}</h3>
            <p>{features.orders.description}</p>
            <SampleOrderButton variant="text">
              Xem chi tiết đơn mẫu
              <Icon name="arrow" size={17} />
            </SampleOrderButton>
          </div>
          <div className="receipt-presentation">
            <OrderDetails order={sampleOrders[0]} compact />
            <span className="sample-caption">Phiếu nhận đồ minh họa</span>
          </div>
        </article>
        <article className="feature-card feature-payments">
          <div className="feature-copy">
            <div className="feature-card-meta">
              <span>02 / Thanh toán</span>
              <Icon name="payment" size={24} weight="light" />
            </div>
            <h3>{features.payments.title}</h3>
            <p>{features.payments.description}</p>
          </div>
          <div className="payment-presentation">
            <div className="payment-summary">
              <div>
                <span>Đã thanh toán</span>
                <strong>{formatCurrency(sampleTotals.paid)}</strong>
              </div>
              <span className="payment-check">
                <Icon name="check" size={22} />
              </span>
            </div>
            <div className="outstanding-heading">
              <span>Còn phải thu</span>
              <strong>{formatCurrency(sampleTotals.outstanding)}</strong>
            </div>
            <div className="outstanding-list">
              {sampleOrders
                .filter((order) => orderTotal(order) > order.paid)
                .map((order) => (
                  <div key={order.id}>
                    <span className="customer-initials">{order.initials}</span>
                    <span>{order.customer}</span>
                    <strong>
                      {formatCurrency(orderTotal(order) - order.paid)}
                    </strong>
                  </div>
                ))}
            </div>
            <p className="sample-caption">Số liệu từ các đơn hàng mẫu</p>
          </div>
        </article>
      </div>
      <div className="supporting-features">
        {features.supporting.map((feature, index) => (
          <article key={feature.title}>
            <span className="supporting-index" aria-hidden="true">
              0{index + 3}
            </span>
            <Icon name={feature.icon as IconName} size={25} weight="light" />
            <div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
