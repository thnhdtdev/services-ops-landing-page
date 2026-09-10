import { httpUrl } from "@/lib/format";

// Product identity and destinations can be changed in one place.
export const site = {
  name: process.env.NEXT_PUBLIC_PRODUCT_NAME?.trim() || "Services-Ops",
  description:
    "Phần mềm quản lý tiệm giặt: theo dõi đơn hàng, khách hàng, dịch vụ, thanh toán và công nợ trong một nơi.",
  url: httpUrl(process.env.NEXT_PUBLIC_SITE_URL),
  adminUrl: httpUrl(process.env.NEXT_PUBLIC_ADMIN_URL),
  contactEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  )
    ? process.env.NEXT_PUBLIC_CONTACT_EMAIL
    : undefined,
};

export const navigation = [
  { label: "Sản phẩm", href: "#san-pham" },
  { label: "Tính năng", href: "#tinh-nang" },
  { label: "Cách hoạt động", href: "#quy-trinh" },
  { label: "Bảng giá", href: "#bang-gia" },
];

export const landing = {
  hero: {
    eyebrow: "PHẦN MỀM QUẢN LÝ TIỆM GIẶT",
    title: ["Tiệm gọn gàng.", "Ngày nhẹ nhàng."],
    description:
      "Đơn hàng, khách hàng, thanh toán. Mọi việc trong tiệm, cùng một nơi dễ quản lý.",
    primary: "Khám phá tính năng",
    secondary: "Xem cách hoạt động",
  },
  benefits: [
    {
      icon: "orders",
      title: "Rõ từng đơn hàng",
      description: "Không còn tìm lại từng trang sổ.",
    },
    {
      icon: "payment",
      title: "Nắm từng khoản thu",
      description: "Biết đã thanh toán, còn phải thu.",
    },
    {
      icon: "overview",
      title: "Hiểu hoạt động của tiệm",
      description: "Có cái nhìn chung để sắp xếp việc.",
    },
  ],
  features: {
    title: "Bớt ghi chép. Thêm ngăn nắp.",
    description:
      "Những việc quen thuộc của tiệm giặt, được kết nối trong một hệ thống.",
    orders: {
      title: "Mỗi đơn hàng, rõ từng chi tiết.",
      description:
        "Dịch vụ, số lượng, ngày hẹn và trạng thái. Mọi thông tin cần thiết đều đi cùng đơn hàng.",
    },
    payments: {
      title: "Tiền đã thu. Tiền cần nhớ.",
      description:
        "Tách bạch thanh toán và công nợ, để cuối ngày không phải cộng lại từ đầu.",
    },
    supporting: [
      {
        icon: "customers",
        title: "Nhớ khách, không cần nhớ hết",
        description:
          "Lưu thông tin khách hàng và xem lại các đơn đã sử dụng dịch vụ.",
      },
      {
        icon: "services",
        title: "Dịch vụ theo cách tiệm làm",
        description:
          "Quản lý danh mục dịch vụ, đơn giá và các khoản giảm giá trên đơn.",
      },
      {
        icon: "overview",
        title: "Nhìn lại một ngày làm việc",
        description:
          "Theo dõi tổng quan đơn hàng, thanh toán và thống kê hoạt động.",
      },
    ],
  },
  workflow: {
    title: ["Vẫn là việc mỗi ngày.", "Chỉ là gọn hơn."],
    description:
      "Từ lúc khách gửi đồ đến khi nhận lại, thông tin luôn liền mạch.",
    steps: [
      {
        title: "Nhận đồ, ghi nhận đơn",
        description:
          "Chọn khách hàng, dịch vụ, số lượng và ngày hẹn trả. Thông tin được lưu ngay trên đơn.",
      },
      {
        title: "Theo dõi trong quá trình giặt",
        description:
          "Xem trạng thái xử lý để biết đơn nào đang giặt, đơn nào đã sẵn sàng trả khách.",
      },
      {
        title: "Trả đồ, ghi nhận thanh toán",
        description:
          "Kiểm tra chi tiết đơn và phiếu nhận. Ghi nhận số tiền khách thanh toán hoặc còn nợ.",
      },
      {
        title: "Cuối ngày, xem lại tổng quan",
        description:
          "Mở bảng tổng quan để xem đơn hàng, khoản đã thu và công nợ của tiệm.",
      },
    ],
  },
  gettingStarted: {
    title: "Để việc quản lý vào nếp.",
    description:
      "Bắt đầu từ một đơn hàng. Xem cách thông tin, dịch vụ và thanh toán được sắp xếp cùng nhau.",
  },
};
