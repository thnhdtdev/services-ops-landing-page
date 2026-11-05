import { httpUrl } from "@/lib/url";

// Destinations are configured per deployment. Leave a value empty and the
// page says so instead of linking somewhere invented.
export const site = {
  name: "ServiceOps",
  description:
    "Phần mềm quản lý cho tiệm giặt sấy và tiệm vệ sinh giày: đơn hàng, khách hàng, bảng giá, thanh toán và lịch làm nhân viên.",
  url: httpUrl(process.env.NEXT_PUBLIC_SITE_URL),
  zaloUrl: httpUrl(process.env.NEXT_PUBLIC_ZALO_URL),
  trialUrl: httpUrl(process.env.NEXT_PUBLIC_TRIAL_URL),
};

export const cta = {
  trial: "Đăng ký dùng thử",
  zalo: "Nhắn Zalo",
};

// The four things the page takes off the owner's mind, in scroll order.
// The seam pips, the resolve line and the ticket's checklist all read this.
export const pains = [
  {
    id: "don",
    pip: "Đơn",
    need: "Thất lạc đơn",
    done: "Đơn nào cũng có mã và trạng thái",
  },
  {
    id: "hen",
    pip: "Hẹn trả",
    need: "Quên hẹn trả đồ",
    done: "Hẹn lấy nằm ngay trên đơn",
  },
  {
    id: "tien",
    pip: "Tiền",
    need: "Không biết hôm nay thu bao nhiêu",
    done: "Có thanh toán là báo về điện thoại",
  },
  {
    id: "ca",
    pip: "Ca làm",
    need: "Xếp lịch nhân viên",
    done: "Xếp ca không trùng giờ bận",
  },
] as const;

export type PainId = (typeof pains)[number]["id"];
