"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";
import {
  previewViews,
  sampleOrders,
  sampleTotals,
  orderStatuses,
} from "@/data/product";
import { formatCurrency, orderTotal } from "@/lib/format";
import type { PreviewView, SampleOrder, OrderStatus } from "@/types/product";
import { Brand } from "@/components/ui/brand";
import { Icon } from "@/components/ui/icon";
import { StatusBadge } from "@/components/ui/status-badge";
import { RevenueChart } from "./revenue-chart";
import { OrderDialog } from "./order-dialog";

export function ProductPreview() {
  const [view, setView] = useState<PreviewView>("overview");
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [query, setQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<SampleOrder | null>(null);
  const filteredOrders = sampleOrders.filter(
    (order) =>
      (filter === "all" || order.status === filter) &&
      `${order.customer} ${order.id}`
        .toLocaleLowerCase("vi")
        .includes(query.toLocaleLowerCase("vi").trim()),
  );

  function navigateTabs(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    const offsets: Record<string, number> = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    };
    let next = index;
    if (event.key in offsets)
      next =
        (index + offsets[event.key] + previewViews.length) %
        previewViews.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = previewViews.length - 1;
    else return;
    event.preventDefault();
    setView(previewViews[next].id);
    document.getElementById(`preview-tab-${previewViews[next].id}`)?.focus();
  }

  return (
    <figure id="giao-dien" className="product-preview">
      <div className="preview-shell">
        <div className="preview-topbar">
          <Brand compact />
          <span>Không gian quản lý tiệm</span>
          <span className="preview-avatar" aria-label="Chủ tiệm minh họa">
            CT
          </span>
        </div>
        <div className="preview-layout">
          <div className="preview-sidebar">
            <div className="preview-store">
              <span className="store-icon">
                <Icon name="washer" size={18} />
              </span>
              <div>
                Tiệm giặt của bạn<small>Không gian làm việc</small>
              </div>
            </div>
            <div
              className="preview-tabs"
              role="tablist"
              aria-label="Giao diện sản phẩm"
            >
              {previewViews.map((tab, index) => (
                <button
                  key={tab.id}
                  id={`preview-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={view === tab.id}
                  aria-controls={`preview-panel-${tab.id}`}
                  tabIndex={view === tab.id ? 0 : -1}
                  onKeyDown={(event) => navigateTabs(event, index)}
                  onClick={() => setView(tab.id)}
                >
                  <Icon name={tab.id} size={17} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
            <div className="preview-sidebar-note">
              <Icon name="checkCircle" size={18} />
              <span>
                Mọi việc,
                <br />
                cùng một nơi.
              </span>
            </div>
          </div>
          <div className="preview-content">
            {previewViews.map((tab) => (
              <div
                key={tab.id}
                id={`preview-panel-${tab.id}`}
                role="tabpanel"
                aria-labelledby={`preview-tab-${tab.id}`}
                hidden={view !== tab.id}
                tabIndex={0}
              >
                {tab.id === "overview" && (
                  <>
                    <div className="preview-page-heading">
                      <div>
                        <h2>Tổng quan hôm nay</h2>
                        <p>Một ngày làm việc, trong tầm mắt.</p>
                      </div>
                      <span className="preview-date">08 Th09, 2026</span>
                    </div>
                    <dl className="preview-metrics">
                      <div>
                        <dt>Đơn hàng</dt>
                        <dd>
                          {String(sampleTotals.orders).padStart(2, "0")}
                          <Icon name="orders" size={16} />
                        </dd>
                      </div>
                      <div>
                        <dt>Đã thu</dt>
                        <dd>{formatCurrency(sampleTotals.paid)}</dd>
                      </div>
                      <div>
                        <dt>Còn phải thu</dt>
                        <dd>{formatCurrency(sampleTotals.outstanding)}</dd>
                      </div>
                    </dl>
                    <div className="preview-chart-card">
                      <div className="preview-card-heading">
                        <h3>Khoản thu trong tuần</h3>
                        <span>7 ngày gần nhất</span>
                      </div>
                      <RevenueChart />
                    </div>
                    <div className="preview-recent">
                      <div className="preview-card-heading">
                        <h3>Đơn hàng gần đây</h3>
                        <button
                          type="button"
                          onClick={() => {
                            setView("orders");
                            document
                              .getElementById("preview-tab-orders")
                              ?.focus();
                          }}
                        >
                          Xem tất cả
                          <Icon name="arrow" size={12} />
                        </button>
                      </div>
                      <div className="recent-orders">
                        {sampleOrders.slice(0, 3).map((order) => (
                          <button
                            type="button"
                            key={order.id}
                            onClick={() => setSelectedOrder(order)}
                            aria-label={`Xem đơn ${order.id} của ${order.customer}`}
                            aria-haspopup="dialog"
                          >
                            <span className="recent-order-name">
                              <span>{order.id}</span>
                              <strong>{order.customer}</strong>
                            </span>
                            <StatusBadge status={order.status} />
                            <span className="recent-order-total">
                              {formatCurrency(orderTotal(order))}
                            </span>
                            <Icon name="chevronRight" size={13} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {tab.id === "orders" && (
                  <>
                    <div className="preview-page-heading">
                      <div>
                        <h2>Đơn hàng của tiệm</h2>
                        <p>Tìm một đơn, xem đủ thông tin.</p>
                      </div>
                      <Icon name="orders" size={23} weight="light" />
                    </div>
                    <label className="preview-search">
                      <Icon name="search" size={17} />
                      <input
                        aria-label="Tìm đơn theo khách hàng hoặc mã đơn"
                        placeholder="Tìm tên khách hoặc mã đơn..."
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                      />
                    </label>
                    <label className="preview-filter">
                      Trạng thái
                      <select
                        aria-label="Lọc trạng thái đơn hàng"
                        value={filter}
                        onChange={(event) =>
                          setFilter(event.target.value as OrderStatus | "all")
                        }
                      >
                        <option value="all">Tất cả đơn hàng</option>
                        {Object.entries(orderStatuses).map(([id, label]) => (
                          <option key={id} value={id}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <p className="result-count" role="status">
                      {filteredOrders.length} đơn hàng
                    </p>
                    <div className="filtered-orders">
                      {filteredOrders.map((order) => (
                        <button
                          key={order.id}
                          type="button"
                          aria-haspopup="dialog"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <span>
                            <strong>{order.customer}</strong>
                            <small>
                              {order.id} · {order.service}
                            </small>
                          </span>
                          <span>
                            <StatusBadge status={order.status} />
                            <small>{formatCurrency(orderTotal(order))}</small>
                          </span>
                        </button>
                      ))}
                      {filteredOrders.length === 0 && (
                        <div className="preview-empty">
                          <Icon name="search" size={28} weight="light" />
                          <strong>Chưa tìm thấy đơn phù hợp</strong>
                          <span>Thử tên khách hoặc trạng thái khác.</span>
                          <button
                            type="button"
                            onClick={() => {
                              setQuery("");
                              setFilter("all");
                            }}
                          >
                            Xóa bộ lọc
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
                {tab.id === "customers" && (
                  <>
                    <div className="preview-page-heading">
                      <div>
                        <h2>Khách hàng thân quen</h2>
                        <p>Thông tin và công nợ, dễ tìm lại.</p>
                      </div>
                      <Icon name="customers" size={23} weight="light" />
                    </div>
                    <div className="customer-list-heading">
                      <span>Khách hàng</span>
                      <span>Còn phải thu</span>
                    </div>
                    <div className="preview-customers">
                      {sampleOrders.map((order) => (
                        <button
                          type="button"
                          key={order.id}
                          aria-label={`Xem đơn của ${order.customer}`}
                          aria-haspopup="dialog"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <span className="customer-initials">
                            {order.initials}
                          </span>
                          <span className="customer-name">
                            <strong>{order.customer}</strong>
                            <small>1 đơn hàng mẫu</small>
                          </span>
                          <span
                            className={
                              orderTotal(order) - order.paid > 0
                                ? "customer-debt"
                                : "customer-paid"
                            }
                          >
                            {orderTotal(order) - order.paid > 0
                              ? formatCurrency(orderTotal(order) - order.paid)
                              : "Đã thanh toán"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption>
        <span>Giao diện minh họa · Dữ liệu mẫu</span>
        <span className="preview-hint">
          Chọn một mục để khám phá
          <Icon name="arrowUp" size={14} />
        </span>
      </figcaption>
      <OrderDialog
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </figure>
  );
}
