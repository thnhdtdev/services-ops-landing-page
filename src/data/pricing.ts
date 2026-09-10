interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string | null;
}

// Prices and entitlements have not been announced. Keep them unset until confirmed.
export const pricing = {
  title: "Chọn gói phù hợp với tiệm.",
  description:
    "Dự kiến có hai gói sử dụng. Giá và quyền lợi chi tiết sẽ được cập nhật sau.",
  pendingPrice: "Sắp công bố",
  note: "Thông tin từng gói đang được hoàn thiện và chưa mở đăng ký.",
  plans: [
    {
      id: "basic",
      name: "Cơ bản",
      description: "Cho những nhu cầu quản lý hằng ngày của tiệm.",
      price: null,
    },
    {
      id: "advanced",
      name: "Nâng cao",
      description: "Cho nhu cầu quản lý và vận hành chuyên sâu hơn.",
      price: null,
    },
  ] satisfies PricingPlan[],
};
