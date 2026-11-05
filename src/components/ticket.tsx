"use client";

import { useId, useMemo, useState } from "react";
import { CheckIcon } from "@phosphor-icons/react";
import { cta, pains, type PainId } from "@/data/site";

const SHOP_TYPES = ["Giặt sấy", "Vệ sinh giày", "Cả hai"] as const;
const STAFF = ["1–3 người", "4–6 người", "7–10 người"] as const;
const TOOLS = ["Sổ tay", "Excel", "Zalo", "Phần mềm bán hàng"] as const;

function toggle<T>(list: readonly T[], value: T) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // In-app browsers (Zalo, Facebook) often block the async clipboard.
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.append(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }
}

/**
 * The closing ticket. The owner's choices compose the message they send, so
 * what they picked on the page arrives with them instead of resetting.
 * There is no backend: the message goes out through Zalo or the trial link.
 */
export function Ticket({
  zaloUrl,
  trialUrl,
}: {
  zaloUrl?: string;
  trialUrl?: string;
}) {
  const uid = useId();
  const [shopName, setShopName] = useState("");
  const [shopType, setShopType] = useState<string>(SHOP_TYPES[0]);
  const [staff, setStaff] = useState<string>(STAFF[0]);
  const [tools, setTools] = useState<readonly string[]>(["Sổ tay", "Zalo"]);
  const [needs, setNeeds] = useState<readonly PainId[]>(
    pains.map((pain) => pain.id),
  );
  const [status, setStatus] = useState("");

  const lines = useMemo(() => {
    const name = shopName.trim();
    return [
      "Chào ServiceOps, mình muốn đăng ký dùng thử.",
      `Tiệm: ${name ? `${name}, ` : ""}${
        shopType === "Cả hai"
          ? "giặt sấy và vệ sinh giày"
          : shopType.toLowerCase()
      }`,
      `Nhân viên: ${staff}`,
      `Đang quản lý bằng: ${tools.length ? tools.join(", ") : "chưa ghi"}`,
      `Cần giải quyết: ${
        needs.length
          ? pains
              .filter((pain) => needs.includes(pain.id))
              .map((pain) => pain.need.toLowerCase())
              .join(", ")
          : "muốn tìm hiểu thêm"
      }`,
    ];
  }, [shopName, shopType, staff, tools, needs]);
  const message = lines.join("\n");
  const configured = Boolean(zaloUrl || trialUrl);

  async function send(kind: "trial" | "zalo") {
    const copied = await copyText(message);
    const target = kind === "trial" ? (trialUrl ?? zaloUrl) : zaloUrl;
    if (target) {
      setStatus(
        copied
          ? kind === "trial" && trialUrl
            ? "Đã chép nội dung phiếu. Trang đăng ký đang mở ở thẻ mới."
            : "Đã chép tin nhắn. Mở Zalo, dán vào khung chat rồi gửi."
          : "Không chép tự động được. Bạn chép nội dung phiếu bên trên rồi gửi nhé.",
      );
    } else {
      setStatus(
        copied
          ? "Đã chép nội dung phiếu. Số Zalo và link đăng ký đang được cập nhật."
          : "Số Zalo và link đăng ký đang được cập nhật.",
      );
    }
  }

  const chip = (
    name: string,
    value: string,
    checked: boolean,
    onChange: () => void,
    type: "radio" | "checkbox",
  ) => (
    <label key={value} className="chip">
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span>{value}</span>
    </label>
  );

  return (
    <div className="ticket-wrap">
      <div className="ticket-form">
        <div className="field">
          <label className="field__label" htmlFor={`${uid}-name`}>
            Tên tiệm <span className="field__opt">(không bắt buộc)</span>
          </label>
          <input
            id={`${uid}-name`}
            className="input"
            type="text"
            autoComplete="organization"
            maxLength={60}
            placeholder="Ví dụ: Giặt sấy Cô Ba"
            value={shopName}
            onChange={(event) => setShopName(event.target.value)}
          />
        </div>
        <fieldset className="field">
          <legend className="field__label">Loại tiệm</legend>
          <div className="chips">
            {SHOP_TYPES.map((value) =>
              chip(`${uid}-type`, value, shopType === value, () => setShopType(value), "radio"),
            )}
          </div>
        </fieldset>
        <fieldset className="field">
          <legend className="field__label">Số nhân viên</legend>
          <div className="chips">
            {STAFF.map((value) =>
              chip(`${uid}-staff`, value, staff === value, () => setStaff(value), "radio"),
            )}
          </div>
        </fieldset>
        <fieldset className="field">
          <legend className="field__label">Đang quản lý bằng</legend>
          <div className="chips">
            {TOOLS.map((value) =>
              chip(`${uid}-tools`, value, tools.includes(value), () => setTools((list) => toggle(list, value)), "checkbox"),
            )}
          </div>
        </fieldset>
        <fieldset className="field">
          <legend className="field__label">Cần giải quyết trước</legend>
          <div className="chips">
            {pains.map((pain) =>
              chip(`${uid}-needs`, pain.need, needs.includes(pain.id), () => setNeeds((list) => toggle(list, pain.id)), "checkbox"),
            )}
          </div>
        </fieldset>
      </div>

      <figure className="ticket" aria-labelledby={`${uid}-ticket`}>
        <figcaption id={`${uid}-ticket`} className="ticket__head">
          Phiếu đăng ký dùng thử
        </figcaption>
        <output className="ticket__body" htmlFor={`${uid}-name`} aria-live="polite">
          {lines.map((line, index) => (
            <span key={index} className="ticket__line">
              {index > 0 && <CheckIcon weight="bold" aria-hidden="true" />}
              {line}
            </span>
          ))}
        </output>
        <div className="ticket__actions">
          {trialUrl || zaloUrl ? (
            <a
              className="btn btn--primary"
              href={trialUrl ?? zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => void send("trial")}
            >
              {cta.trial}
            </a>
          ) : (
            <button type="button" className="btn btn--primary" onClick={() => void send("trial")}>
              {cta.trial}
            </button>
          )}
          {zaloUrl ? (
            <a
              className="btn btn--ghost"
              href={zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => void send("zalo")}
            >
              {cta.zalo}
            </a>
          ) : (
            <button type="button" className="btn btn--ghost" onClick={() => void send("zalo")}>
              {cta.zalo}
            </button>
          )}
        </div>
        <p className="ticket__status" role="status">
          {status ||
            (configured
              ? "Bấm nút, nội dung phiếu được chép sẵn để bạn dán vào tin nhắn."
              : "Số Zalo và link đăng ký đang được cập nhật.")}
        </p>
      </figure>
    </div>
  );
}
