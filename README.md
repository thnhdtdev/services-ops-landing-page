# ServiceOps · landing page

Landing page tiếng Việt cho ServiceOps, phần mềm quản lý tiệm giặt sấy và tiệm vệ sinh giày. Next.js 16 App Router, React 19, TypeScript strict, CSS thuần. Chuyển động cuộn dùng engine scrollcraft (vanilla JS) đặt trong `src/vendor/`.

## Chạy

```bash
npm install
npm run dev            # http://localhost:3000
```

## Cấu hình

Chép `.env.example` thành `.env.local`. Biến `NEXT_PUBLIC_*` được đóng vào lúc build, đổi xong phải build lại.

| Biến | Dùng cho |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Địa chỉ public; bật canonical, OG URL và cho phép index |
| `NEXT_PUBLIC_ZALO_URL` | Nút **Nhắn Zalo**, ví dụ `https://zalo.me/0xxxxxxxxx` |
| `NEXT_PUBLIC_TRIAL_URL` | Nút **Đăng ký dùng thử** (Google Form...). Để trống thì nút này dùng link Zalo |

Khi chưa có link nào, hai nút vẫn hiện, chép sẵn nội dung phiếu và ghi rõ "Số Zalo và link đăng ký đang được cập nhật". Trang không dẫn tới link giả và không có backend. Zalo không nhận tin nhắn soạn sẵn qua link, nên phiếu chép tin nhắn vào clipboard để chủ tiệm dán.

## Cấu trúc trang

Ngữ pháp "split stage": một nửa là cách cũ (nền vở ô ly), một nửa là ServiceOps. Trên điện thoại chia trên/dưới, từ 860px chia trái/phải.

```text
src/
  app/
    page.tsx              SplitStage + Close + StageController
    globals.css           theme và toàn bộ style của trang
    scrollcraft.css       floor của engine, chép nguyên, không sửa
    opengraph-image.tsx   ảnh chia sẻ Zalo/Facebook
  components/
    split-stage.tsx       act ghim: hero, 4 chuyện đau đầu, khoảng lặng, cú xé
    stage-controller.tsx  mount engine + đường chia, gạch xoá, cú xé
    close.tsx             bảng giá dịch vụ, hồ sơ khách, sắp ra mắt, giá, phiếu
    ticket.tsx            phiếu đăng ký (client), soạn tin nhắn từ lựa chọn
    phieu.tsx             tờ phiếu giặt, vật thể hình ảnh chính của trang
  data/
    site.ts               tên, link, nhãn CTA, 4 chuyện đau đầu
    beats.ts              cửa sổ thời gian của từng nhịp trong act ghim
  assets/brand/           logo
  vendor/scrollcraft.js   engine, chép nguyên, không sửa
scrollcraft/              BRIEF và registry của skill scroll-craft
```

Đổi nhịp cuộn thì sửa `src/data/beats.ts`; markup và controller cùng đọc file này nên không bao giờ lệch nhau.

## Ảnh

Ảnh chụp và video quay app (`src/assets/img/`) chỉ để hiểu sản phẩm, **không bao giờ đưa lên trang** (xem `CLAUDE.md`). Video gốc (`*.mov`) nằm trong `.gitignore`. Hình ảnh trên trang là tờ phiếu giặt dựng bằng markup thật (`phieu.tsx`, mép răng cưa như logo) và logo trong `src/assets/brand/`. Ảnh gốc của app đã chuyển ra ngoài repo.

Font Be Vietnam Pro tự host qua `next/font/google` (chỉ tải phần tiếng Việt và Latin). Hai file TTF trong `src/assets/fonts/` chỉ dùng cho ảnh OG.

## Kiểm tra

```bash
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

Bộ test chạy trên bản build production (cổng 3100), cả desktop lẫn mobile: metadata và font, không có nút "tạo tài khoản", act ghim đi hết tới màn kết, mọi ảnh tải được, phiếu soạn đúng tin nhắn, không tràn ngang từ 320px tới 1440px, và kiểm tra WCAG AA tự động. Test chạy trên Chromium giả lập, không thay được việc thử trên iPhone/Android thật trong trình duyệt của Zalo và Facebook.
