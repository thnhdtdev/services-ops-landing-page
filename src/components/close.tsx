import Image from "next/image";
import { cta, site } from "@/data/site";
import { Ticket } from "@/components/ticket";
import { Phieu } from "@/components/phieu";
import logo from "@/assets/brand/logo.png";

function UnitLine({ name, unit }: { name: string; unit: string }) {
  return (
    <span className="unit-line">
      <span>{name}</span>
      <span className="unit-line__unit">{unit}</span>
    </span>
  );
}

export function Close() {
  return (
    <div className="close">
      <section className="sc-section close__range" aria-labelledby="co-san">
        <div className="sc-wrap range">
          <div className="range__col">
            <div
              className="range__text sc-stack"
              data-sc-in
              data-sc-stagger="70"
            >
              <h2 id="co-san" className="close__title">
                Bảng giá theo cách tiệm tính.
              </h2>
              <p className="close__body">
                Giặt theo kg, giày theo đôi, chăn mền theo cái, ga gối theo bộ.
                Dịch vụ nào tạm ngưng thì tắt, đơn mới không chọn nhầm.
              </p>
            </div>
            <div
              className="range__text range__text--second sc-stack"
              data-sc-in
              data-sc-stagger="70"
            >
              <h3 className="close__subtitle">Mỗi khách một hồ sơ.</h3>
              <p className="close__body">
                Số đơn, đơn còn nợ và tổng giá trị đơn của từng khách. Gọi điện
                cho khách ngay từ hồ sơ, in hóa đơn ngay từ đơn.
              </p>
            </div>
          </div>
          <div className="range__visual" data-sc-in>
            <Phieu
              title="Bảng giá của tiệm"
              lines={[
                {
                  text: <UnitLine name="Giặt sấy" unit="theo kg" />,
                  state: "none",
                },
                {
                  text: <UnitLine name="Vệ sinh giày" unit="theo đôi" />,
                  state: "none",
                },
                {
                  text: <UnitLine name="Chăn mền" unit="theo cái" />,
                  state: "none",
                },
                {
                  text: <UnitLine name="Ga gối" unit="theo bộ" />,
                  state: "none",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="close__soon" aria-labelledby="tien-ve">
        <div className="sc-wrap soon-grid" data-sc-in data-sc-stagger="80">
          <h2 id="tien-ve" className="close__subtitle soon-grid__title">
            Không ở tiệm vẫn biết tiền về.
          </h2>
          <div className="soon-item">
            <h3 className="soon-item__title">Báo thanh toán về điện thoại</h3>
            <p className="close__body">
              Mỗi lần nhân viên ghi nhận thanh toán, điện thoại của chủ tiệm
              (tài khoản quản lý) nhận thông báo ngay. Bật cho từng máy, tắt lúc
              nào cũng được.
            </p>
            <p className="soon-item__note">
              Trên iPhone: thêm ServiceOps vào màn hình chính rồi mở từ đó để
              nhận thông báo.
            </p>
          </div>
          <div className="soon-item">
            <p className="soon__tag">Sắp ra mắt</p>
            <h3 className="soon-item__title">Mã VietQR trên hóa đơn</h3>
            <p className="close__body">
              Hóa đơn in ra có sẵn mã VietQR để khách quét và chuyển khoản.
            </p>
          </div>
        </div>
      </section>

      <section
        id="dang-ky"
        className="close__sign"
        aria-labelledby="dang-ky-title"
      >
        <div className="sc-wrap">
          <div className="sign__head" data-sc-in data-sc-stagger="70">
            <h2 id="dang-ky-title" className="close__title">
              Thử trên tiệm của bạn.
            </h2>
            <p className="price">
              Giá: <strong>Liên hệ</strong>
            </p>
            <p className="close__body">
              Giá tùy quy mô tiệm. Điền phiếu dưới đây, bấm {cta.trial} hoặc{" "}
              {cta.zalo} để được tư vấn và báo giá.
            </p>
          </div>
          <Ticket zaloUrl={site.zaloUrl} trialUrl={site.trialUrl} />
        </div>
        <footer className="foot sc-wrap">
          <p className="foot__brand">
            <Image src={logo} alt="" width={24} height={24} />
            ServiceOps
          </p>
        </footer>
      </section>
    </div>
  );
}
