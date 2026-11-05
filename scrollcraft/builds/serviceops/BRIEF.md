# ServiceOps · BRIEF

**Tự quyết theo uỷ quyền sáng tạo** (Self-authored under explicit creative delegation).
Ngày 2026-11-05, chủ dự án chọn "Tôi tự quyết theo brief" cho phần phong cách và trải nghiệm cuộn trang.
Những gì dưới đây ghi *Quyết định* là do tôi đặt ra. Những gì ghi *Từ brief* hoặc *Trả lời* là lời của chủ dự án.

## Sự thật đã kiểm chứng (từ mã nguồn app `~/Desktop/service_ops`)

- Trạng thái đơn: Mới nhận, Đang xử lý, Đã xong, Đã trả khách, Đã hủy.
- Thanh toán: Chưa thanh toán, Thanh toán một phần, Đã thanh toán. Hình thức: Tiền mặt, Chuyển khoản, Khác.
- Đơn có trường "Hẹn lấy". Tổng quan có "Doanh thu hôm nay", "Đơn hôm nay", "Đơn còn chưa thu đủ tiền". Có in hóa đơn.
- Lịch: tuần "Đang nhận lịch bận" rồi "Đã công bố", có hạn chót báo lịch bận, ca mẫu, cảnh báo "Nhân viên đã báo bận trong giờ này". Nhân viên báo bận qua link riêng `/s/[token]`, không cần tài khoản.
- Đơn vị dịch vụ: kg, đôi, cái, bộ (khớp cả giặt sấy và vệ sinh giày).
- **Đã có (cập nhật 2026-11-05):** thông báo đẩy (web push) về thiết bị của tài khoản quản lý khi tiệm ghi nhận thanh toán; bật/tắt theo từng thiết bị; trên iPhone cần mở app từ màn hình chính. App cài được như PWA.
- **Sắp ra mắt** (phải gắn nhãn này): mã VietQR trên hóa đơn.

## Ràng buộc cứng (Từ brief)

- **Sửa ngày 2026-11-05:** ảnh và video quay màn hình app chỉ để hiểu sản phẩm, KHÔNG đưa lên trang dưới bất kỳ hình thức nào (không cắt, không làm nền, không vẽ lại giống hệt). Bản dựng đầu đã cắt ảnh app vào trang; đã gỡ toàn bộ. Logo `icon-512.png` được dùng. Không ảnh AI, không dashboard giả, không bịa số liệu, số khách hay lời chứng thực. Hướng hình ảnh thay thế đã được chọn: **phiếu giặt + chữ** (tờ phiếu nhận đồ răng cưa như logo, viết bằng markup thật, không mô phỏng giao diện app).
- Không có nút "Tạo tài khoản ngay". Hai hành động: **Đăng ký dùng thử**, **Nhắn Zalo**.
- Bảng giá: **Liên hệ** (Trả lời).
- Link CTA: để biến môi trường, điền sau. Khi chưa có link, nút vẫn hiện nhưng nói rõ, không dẫn tới link giả (Trả lời).
- Toàn bộ tiếng Việt, gần gũi, đúng ngôn ngữ chủ tiệm. Font Be Vietnam Pro, kiểm tra dấu trên điện thoại.
- Mobile trước (mở từ Zalo, Facebook). Tải nhanh trên 4G.
- Trang hiện tại trong repo dùng preview dashboard tự dựng và ảnh tạo bằng AI: **bỏ cả hai**.

## Tám câu hỏi

1. **Không khí trong 3–5 từ.** *Quyết định:* thật thà, gọn gàng, nhẹ người, như quầy tiệm buổi sáng. Tham chiếu: cuốn sổ ghi đơn bìa xanh ở quầy tiệm giặt; tờ phiếu nhận đồ có răng cưa (chính là hình trong logo); bảng phân ca dán tường bị gạch xoá.
2. **Hành trình cuộn, theo trình tự.** *Quyết định, theo đúng thứ tự vấn đề trong brief:* nhận ra tiệm mình → khách hỏi đồ mà tìm không ra đơn → quên hẹn trả → đi vắng không biết thu bao nhiêu → xếp ca qua tin nhắn → cách cũ bị xé bỏ → sắp ra mắt, giá, đăng ký.
3. **Nhịp năng lượng.** *Quyết định:* mở đầu bình thản; bốn vấn đề tăng dần độ "ngứa"; vấn đề xếp ca là lúc ồn nhất; một nhịp im ngắn; rồi cú xé là đỉnh; kết thúc yên và chắc.
4. **Cảm xúc từng chặng và một khoảnh khắc đáng nhớ.** Xem *Đường cảm xúc* và *Đỉnh* bên dưới.
5. **Một điều trang này làm mà trang khác không làm.** *Quyết định:* đường chia giữa "cách cũ" và ServiceOps là mép răng cưa của tờ phiếu giặt. Mỗi vấn đề kéo qua, đường chia lấn sang phía cách cũ và đóng một dấu tích như ba dấu tích trong logo. Cuối cùng nửa cách cũ bị xé hẳn đi, và người xem cầm một tờ phiếu đăng ký mang thông tin tiệm của chính họ để gửi qua Zalo.
6. **Cách xa premium-minimal bao nhiêu.** *Quyết định:* không premium-minimal. Gần "dense / editorial thực dụng": nền sáng, mực xanh navy, xanh dương của logo, chữ to rõ, ảnh màn hình thật là hình ảnh chính. Không gradient AI, không phát sáng.
7. **Một thế giới liền mạch hay các cảnh rời.** *Quyết định:* các cảnh rời, nhưng hai nửa luôn cùng hiện diện (split stage). Không có thế giới 3D, không có chuyến bay camera.
8. **Tài nguyên sẵn có.** *Trả lời:* chủ dự án sẽ chép ảnh và video quay màn hình thật vào `assets/`. Logo: `~/Desktop/service_ops/frontend/public/icon-512.png`. Font Be Vietnam Pro đã tự host trong repo. Không sinh ảnh, không chi phí kie.ai.

## Ngữ pháp trang: Split stage

Hai cột giằng co suốt trang (trên điện thoại là hai nửa trên/dưới), cuộn để phân thắng bại.

Vì sao bảy ngữ pháp kia thua:
- **Filmic one-shot:** cần cảnh quay điện ảnh; ở đây chỉ có quay màn hình, và video nặng trên 4G là điều brief cấm ngầm.
- **Chaptered editorial:** đòi đọc dài; chủ tiệm bận, xem trên điện thoại.
- **Live surface:** phải là giao diện chạy thật trong trang; dựng lại app bằng div là "dashboard giả", bị cấm.
- **Continuous world:** không có địa lý nào để bay qua.
- **Typographic poster:** sản phẩm phải được nhìn thấy; ảnh màn hình thật là bằng chứng duy nhất được phép.
- **Gallery / catalog:** hợp cho danh sách tính năng, nhưng brief là một lập luận "trước và sau" quanh bốn nỗi khổ cụ thể, và catalog cấm lập luận.
- **Rhythmic cutlist:** dành cho thương hiệu năng lượng; sai người xem.

## Hành trình

```
1  Nhận ra      sổ tay, Excel, nhóm Zalo: đúng là tiệm mình
2  Căng         khách hỏi đồ, lật sổ không thấy phiếu
3  Căng hơn     quên hẹn trả, khách tới không có đồ
4  Bất an       đi vắng cả ngày, tối mới cộng sổ
5  Rối          xếp ca qua tin nhắn nhóm
6  Chuyển       cách cũ bị xé bỏ
7  Cam kết      sắp ra mắt, giá Liên hệ, phiếu đăng ký
```

## Đường cảm xúc (viết trước khi có act)

```
1  Nhận ra (bình thản)    nửa trên liệt kê đúng công cụ họ đang dùng; nửa dưới hứa một chỗ duy nhất
2  Ngượng                 câu khách hỏi "đồ chị xong chưa em?" đặt cạnh cảnh gõ số điện thoại ra ngay đơn (video thật, cuộn để tua)
3  Áy náy → yên tâm       lời hẹn trôi trong tin nhắn, bị gạt sang bởi ô "Hẹn lấy" trên đơn (wipe)
4  Bất an → nắm được      "tối về mới cộng sổ" đặt cạnh tổng quan "Doanh thu hôm nay" (ảnh thật, các lớp tách nhau)
5  Bực → bất ngờ thích    tin nhắn nhóm dồn lên, rồi ba bước: nhân viên tự báo bận qua link, chủ xếp vào khung trống, báo trùng (ghim, ba trạng thái)
   (lặng)                 nhịp ngắn chỉ còn một dòng: "Còn gì phải nhớ trong đầu không?" Im lặng có chủ đích, không phải cuộn chết
6  Nhẹ người (ĐỈNH)       đường răng cưa trượt hết sang phía cách cũ, nửa đó bị xé đi, cả màn hình là ServiceOps
7  Sẵn sàng               phiếu đăng ký: chọn loại tiệm, số nhân viên; tin nhắn Zalo tự soạn theo lựa chọn
```

## Đỉnh

> "Kéo xuống tới đâu thì nửa sổ tay hẹp lại tới đó, rồi nó bị xé phăng như tờ phiếu giặt."

Nằm ở act 6. Có khoảng lặng ngay trước (một dòng duy nhất trên nền trống). Có quãng cuộn dài nhất trang.

## Câu kể lại cho bạn

> Đó là trang mà mỗi lần kéo qua một chuyện đau đầu quen thuộc của tiệm, nửa "sổ tay" lại bị lấn bớt, cuối cùng bị xé hẳn như tờ phiếu giặt, và mình cầm trên tay tờ phiếu đăng ký ghi đúng tiệm của mình để gửi Zalo.

## Khoảng lặng có chủ đích

- Nhịp lặng giữa act 5 và act 6: một câu hỏi duy nhất trên nền trống, cố ý, để cú xé có chỗ để "rơi".

## Bố cục điểm số (đã chốt)

Một act ghim duy nhất (`#tiem`, span 8, quãng cuộn 7 viewport) chứa cả sân khấu chia đôi, rồi phần đóng trang chạy theo dòng tự nhiên. Cửa sổ thời gian nằm ở `src/data/beats.ts`.

| Nhịp | Cửa sổ | Device | Vì sao |
|---|---|---|---|
| 1 Nhận ra | 0–0.075 | split mở 50/50 + hai tờ phiếu chồng lớp (tờ trước có 4 ô trống) | Hai nửa đọc được cùng lúc; chiều sâu từ hai lớp phiếu chạy khác tốc độ |
| 2 Ngượng | 0.075–0.23 | sequence: chuỗi trạng thái Mới nhận → Đã trả khách bước theo cuộn | Đơn đi tiếp dưới tay người xem |
| 3 Áy náy | 0.23–0.36 | reveal: chữ hẹn được "viết" vào phiếu | Lời hẹn trôi đi, hẹn lấy nằm trên phiếu |
| 4 Bất an | 0.36–0.49 | parallax: hai tờ phiếu tách lớp | Thu tiền và tổng hôm nay ở hai độ sâu |
| 5 Rối | 0.49–0.65 | pin + cue: bốn dòng lịch làm hiện dần, dòng cuối là cảnh báo | Link riêng → báo bận → xếp ca → cảnh báo trùng |
| (lặng) | 0.65–0.73 | kinetic (từng chữ) | Một câu hỏi trên nền trống |
| 6 Đỉnh | 0.73–1.0 | bespoke: xé tờ sổ, rồi tờ phiếu ServiceOps được "in" ra với 4 dấu tích | Quãng cuộn dài nhất trang (1,9 viewport) |
| 7 Sẵn sàng | flow | flow + in, phiếu bespoke | Bảng giá (phiếu đơn vị tính, không giá), hồ sơ khách, sắp ra mắt, giá Liên hệ, phiếu đăng ký |

Mỗi nhịp kết thúc thì dòng "cách cũ" bị gạch bút đỏ, đường chia lấn sang trái/lên trên, dấu chấm trên đường chia được tích.

## Kiểm tra cảm giác (cuộn lạnh, rồi mới so với đường cong dự định)

| Act | Dự định | Cảm thấy | Ghi chú |
|---|---|---|---|
| 1 | Nhận ra | Nhận ra | Cột vở ô ly với "Sổ tay. Excel. Nhóm Zalo." đọc ra ngay |
| 2 | Ngượng | Rõ ràng | Câu khách hỏi gây ngượng, nhưng ảnh lật nhanh làm nhẹ ngay |
| 3 | Áy náy → yên tâm | Yên tâm | Gần giống act 2; khác nhau chủ yếu ở device (lật và wipe) |
| 4 | Bất an → nắm được | Nắm được | Hai lớp màn hình thật đọc tốt trên desktop, nhỏ trên điện thoại |
| 5 | Bực → bất ngờ | Tò mò, bất ngờ | Act mạnh nhất trước đỉnh, đúng ý |
| lặng | Chờ | Chờ | Câu hỏi đứng một mình |
| 6 | Nhẹ người | Nhẹ người | Ban đầu nửa ServiceOps trắng trơn khi xé → giữ câu hỏi suốt cú xé, thêm bóng đổ, nới quãng cuộn |
| 7 | Sẵn sàng | Sẵn sàng | Phiếu soạn sẵn tin nhắn theo lựa chọn |

Lệch còn lại, không giấu: act 2 và 3 cùng một cảm giác "yên tâm". Trên điện thoại, tờ sổ lúc bị xé chỉ còn khoảng 13% màn hình, nên cú xé nhỏ hơn mong muốn; màn trả lời toàn màn hình phía sau mới là thay đổi thị giác lớn nhất.

## Lần sửa 2 (2026-11-05): bỏ ảnh app, dùng phiếu giặt

Chủ dự án yêu cầu không đưa ảnh chụp app lên trang dưới bất kỳ hình thức nào và cho phép tôi tự đổi thiết kế. Giữ split stage vì vở ô ly (cách cũ) đối với phiếu giặt (ServiceOps) là hai vật thể thật đối nhau. Đỉnh được làm mạnh hơn: sổ bị xé xong thì tờ phiếu với 4 dấu tích được "in" ra, nên trên điện thoại đỉnh không còn phụ thuộc vào mảnh sổ chỉ còn 13% màn hình.
