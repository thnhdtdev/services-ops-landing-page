"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import type { SampleOrder } from "@/types/product";
import { sampleOrders } from "@/data/product";
import { OrderDetails } from "./order-details";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export function OrderDialog({
  order,
  onClose,
}: {
  order: SampleOrder | null;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  function containKeyboardFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = event.currentTarget.querySelectorAll<HTMLButtonElement>(
      "button:not([disabled])",
    );
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  useEffect(() => {
    if (!order) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [order]);

  return (
    <dialog
      ref={dialog}
      className="order-dialog"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onKeyDown={containKeyboardFocus}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialog.current?.close();
      }}
    >
      <div className="dialog-content">
        <div className="dialog-heading">
          <div>
            <h2 id={titleId}>Xem một đơn hàng mẫu</h2>
            <p id={descriptionId}>Giao diện minh họa với dữ liệu mẫu.</p>
          </div>
          <button
            type="button"
            className="icon-button"
            aria-label="Đóng chi tiết đơn"
            autoFocus
            onClick={() => dialog.current?.close()}
          >
            <Icon name="close" size={22} />
          </button>
        </div>
        {order && <OrderDetails order={order} />}
        <Button
          variant="secondary"
          className="dialog-done"
          onClick={() => dialog.current?.close()}
        >
          Đã hiểu
          <Icon name="check" size={17} />
        </Button>
      </div>
    </dialog>
  );
}

export function SampleOrderButton({
  children,
  variant = "primary",
  className,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "text";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant={variant}
        className={className}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        {children}
      </Button>
      <OrderDialog
        order={open ? sampleOrders[0] : null}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
