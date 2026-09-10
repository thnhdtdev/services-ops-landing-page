import Image from "next/image";
import { Icon } from "@/components/ui/icon";

const stages = [
  { number: "01", label: "Tiếp nhận", state: "done" },
  { number: "02", label: "Đang xử lý", state: "active" },
  { number: "03", label: "Hoàn tất", state: "next" },
] as const;

export function ServiceFlowVisual() {
  return (
    <figure
      className="service-flow-visual"
      aria-labelledby="service-flow-caption"
    >
      <div className="service-flow-art" aria-hidden="true">
        <div className="service-flow-topline">
          <span>services-ops / order flow</span>
          <span>Đơn dịch vụ · 001</span>
        </div>

        <div className="service-flow-route">
          {stages.map((stage) => (
            <div
              key={stage.number}
              className="service-flow-route-step"
              data-state={stage.state}
            >
              <span>{stage.number}</span>
              <strong>{stage.label}</strong>
            </div>
          ))}
        </div>

        <div className="service-ticket-stack">
          <span className="service-ticket-sheet service-ticket-sheet-back" />
          <span className="service-ticket-sheet service-ticket-sheet-middle" />
          <div className="service-ticket">
            <div className="service-ticket-heading">
              <Image
                src="/images/logo.png"
                alt=""
                width={38}
                height={38}
                sizes="38px"
              />
              <div>
                <span>Phiếu dịch vụ</span>
                <strong>NP—0128</strong>
              </div>
            </div>

            <div className="service-ticket-customer">
              <span>Khách hàng</span>
              <strong>Minh Anh</strong>
              <small>Nhận lúc 08:30 · 08.09.2026</small>
            </div>

            <div className="service-ticket-details">
              <div>
                <span>Dịch vụ</span>
                <strong>Giặt sấy</strong>
              </div>
              <div>
                <span>Khối lượng</span>
                <strong>5 kg</strong>
              </div>
            </div>

            <div className="service-ticket-progress">
              <div data-state="done">
                <span>
                  <Icon name="check" size={12} weight="bold" />
                </span>
                <p>Đã nhận đồ</p>
              </div>
              <div data-state="active">
                <span>02</span>
                <p>Đang xử lý</p>
              </div>
              <div data-state="next">
                <span>03</span>
                <p>Chờ trả đồ</p>
              </div>
            </div>

            <div className="service-ticket-total">
              <div>
                <span>Hẹn trả</span>
                <strong>17:00 · 09.09</strong>
              </div>
              <div>
                <span>Thành tiền</span>
                <strong>90.000 đ</strong>
              </div>
            </div>

            <div className="service-ticket-barcode">
              <span />
              <small>NP0128 · 0909 · 1700</small>
            </div>
          </div>
        </div>

        <div className="service-flow-tag service-flow-status-tag">
          <Icon name="washer" size={22} weight="light" />
          <span>Trạng thái</span>
          <strong>Đang xử lý</strong>
        </div>

        <div className="service-flow-tag service-flow-due-tag">
          <span>Hẹn trả</span>
          <strong>17:00</strong>
          <small>09 / 09</small>
        </div>
      </div>

      <figcaption id="service-flow-caption">
        <span>Một đơn hàng, đi xuyên suốt quy trình.</span>
        <span>01 — 03</span>
      </figcaption>
    </figure>
  );
}
