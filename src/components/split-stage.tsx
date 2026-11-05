import Image from "next/image";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { beats, cue, stepHold, STAGE_SPAN } from "@/data/beats";
import { cta, pains, site } from "@/data/site";
import { Phieu } from "@/components/phieu";
import logo from "@/assets/brand/logo.png";

// The hero ticket's boxes are empty; the resolve ticket ticks the same four.
const HERO_LINES = ["Đơn hàng", "Hẹn trả đồ", "Tiền thu", "Lịch ca làm"];
const STATUSES = ["Mới nhận", "Đang xử lý", "Đã xong", "Đã trả khách"];
const SHIFT_STEPS = [
  { text: "Gửi link riêng cho từng nhân viên", state: "done" },
  { text: "Nhân viên tự báo giờ bận, không cần tài khoản", state: "done" },
  { text: "Bạn xếp ca vào khung còn trống", state: "done" },
  { text: "Lỡ xếp trùng giờ bận: có cảnh báo", state: "warn" },
] as const;

// A value written onto the ticket, wiped in like ink.
function Hand({
  at,
  children,
}: {
  at: [number, number];
  children: React.ReactNode;
}) {
  return (
    <span
      className="hand"
      data-sc-reveal="left"
      data-sc-reveal-at={`${at[0]} ${at[1]}`}
    >
      {children}
    </span>
  );
}

// Old-way copy is struck through, notebook style, as each fix lands.
function Struck({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <span
      className="struck"
      style={{ "--s": `var(--s-${id}, 0)` } as React.CSSProperties}
    >
      {children}
    </span>
  );
}

export function SplitStage() {
  const zaloHref = site.zaloUrl ?? "#dang-ky";
  return (
    <section
      id="tiem"
      className="tiem"
      data-sc-act="pin"
      data-sc-span={STAGE_SPAN}
      aria-label="Cách cũ và ServiceOps, đặt cạnh nhau"
    >
      <div
        className="stage sc-stage"
        data-sc-stage
        data-split-stage
        data-beat="hero"
      >
        {/* ---------------------------------------------------- cách cũ --- */}
        <div className="old">
          <div className="old__sheet">
            <p className="old__tag">Cách cũ</p>
            <div
              className="old__copy old__copy--hero"
              data-sc-cue={cue("hero", 0, 0.3)}
            >
              <p className="old__lead">Tiệm đang chạy bằng</p>
              <p className="old__big">
                Sổ tay. Excel.
                <br />
                Nhóm Zalo.
                <br />
                Và trí nhớ của chủ.
              </p>
            </div>
            <p className="old__copy old__big" data-sc-cue={cue("don")}>
              <Struck id="don">
                “Đồ của chị xong chưa em?” Lật sổ ba trang vẫn chưa thấy phiếu.
              </Struck>
            </p>
            <p className="old__copy old__big" data-sc-cue={cue("hen")}>
              <Struck id="hen">
                Hẹn chị Vân chiều thứ Năm. Nhắn vội trong Zalo, rồi tin nhắn
                trôi mất.
              </Struck>
            </p>
            <p className="old__copy old__big" data-sc-cue={cue("tien")}>
              <Struck id="tien">
                Đi vắng cả ngày. Tối về mới ngồi cộng sổ xem hôm nay thu được
                bao nhiêu.
              </Struck>
            </p>
            <p className="old__copy old__big" data-sc-cue={cue("ca")}>
              <Struck id="ca">
                “Thứ Bảy ai rảnh ca chiều?” Hỏi nhóm từ sáng tới tối, vẫn thiếu
                người.
              </Struck>
            </p>
          </div>
        </div>

        {/* ----------------------------------------------------- the seam -- */}
        <div className="seam" aria-hidden="true">
          <ol className="seam__pips">
            {pains.map((pain) => (
              <li key={pain.id} className="pip" data-pip={pain.id}>
                <span className="pip__dot">
                  <CheckIcon weight="bold" />
                </span>
                <span className="pip__label">{pain.pip}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* --------------------------------------------------- ServiceOps -- */}
        <div className="new">
          <a className="new__skip" href="#dang-ky">
            {cta.trial}
          </a>

          <div className="beat beat--hero" data-sc-cue={cue("hero", 0, 0.3)}>
            <div className="beat__copy">
              <p className="brand">
                <Image src={logo} alt="" width={36} height={36} preload />
                <span>ServiceOps</span>
              </p>
              <h1 className="hero__title">
                <span>
                  Đơn, khách, tiền, <span className="nw">ca làm.</span>
                </span>
                <span>Gọn trong một chỗ.</span>
              </h1>
              <p className="hero__sub">
                Phần mềm quản lý cho tiệm giặt sấy và tiệm vệ sinh giày.
              </p>
              <div className="actions">
                <a className="btn btn--primary" href="#dang-ky">
                  {cta.trial}
                </a>
                <a
                  className="btn btn--ghost"
                  href={zaloHref}
                  {...(site.zaloUrl
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {cta.zalo}
                </a>
              </div>
            </div>
            <div
              className="beat__visual tickets tickets--hero"
              aria-hidden="true"
            >
              <Phieu className="phieu--back" title="Phiếu nhận đồ">
                <div className="phieu__blank" />
              </Phieu>
              <Phieu
                className="phieu--front"
                title="ServiceOps"
                lines={HERO_LINES.map((text) => ({ text, state: "todo" }))}
              />
            </div>
          </div>

          <div className="beat" data-sc-cue={cue("don")}>
            <div className="beat__copy">
              <h2 className="beat__title">Mỗi đơn có mã, có trạng thái.</h2>
              <p className="beat__body">
                Gõ số điện thoại, hệ thống tìm khách cũ hoặc tạo hồ sơ khách mới
                cùng đơn. Đơn đi qua Mới nhận, Đang xử lý, Đã xong, Đã trả
                khách.
              </p>
            </div>
            <div className="beat__visual">
              <Phieu
                title="Phiếu nhận đồ"
                lines={[
                  { text: "Tìm khách theo tên hoặc số điện thoại" },
                  { text: "Mỗi đơn một mã riêng" },
                ]}
              >
                <ol
                  className="track"
                  data-steps="don"
                  aria-label="Trạng thái đơn"
                >
                  {STATUSES.map((status) => (
                    <li key={status}>{status}</li>
                  ))}
                </ol>
              </Phieu>
            </div>
          </div>

          <div className="beat" data-sc-cue={cue("hen")}>
            <div className="beat__copy">
              <h2 className="beat__title">Hẹn lấy nằm ngay trên đơn.</h2>
              <p className="beat__body">
                Ngày giờ hẹn và ghi chú cho từng đơn được lưu cùng đơn hàng. Mở
                đơn ra là thấy, khỏi lục lại tin nhắn.
              </p>
            </div>
            <div className="beat__visual">
              <Phieu
                title="Hẹn lấy"
                lines={[
                  {
                    text: (
                      <>
                        Ngày giờ:{" "}
                        <Hand at={[beats.hen[0] + 0.01, beats.hen[0] + 0.05]}>
                          chiều thứ Năm
                        </Hand>
                      </>
                    ),
                    state: "none",
                  },
                  {
                    text: (
                      <>
                        Ghi chú:{" "}
                        <Hand at={[beats.hen[0] + 0.045, beats.hen[0] + 0.085]}>
                          khách cần lấy trước 18h
                        </Hand>
                      </>
                    ),
                    state: "none",
                  },
                  { text: "Lưu cùng đơn, mở ra là thấy" },
                ]}
              />
            </div>
          </div>

          <div className="beat" data-sc-cue={cue("tien")}>
            <div className="beat__copy">
              <h2 className="beat__title">Thu đồng nào, ghi đồng đó.</h2>
              <p className="beat__body">
                Tiền mặt, chuyển khoản hay thu một phần đều ghi vào đơn. Nhân
                viên vừa ghi nhận thanh toán, điện thoại của bạn báo ngay.
              </p>
            </div>
            <div className="beat__visual tickets tickets--pair">
              <Phieu
                className="phieu--back"
                title="Thu tiền"
                lines={[
                  { text: "Tiền mặt" },
                  { text: "Chuyển khoản" },
                  { text: "Thu một phần" },
                ]}
              />
              <Phieu
                className="phieu--front"
                title="Báo tiền về"
                lines={[
                  { text: "Có tiền là báo" },
                  { text: "Ở xa vẫn biết" },
                ]}
              />
            </div>
          </div>

          <div className="beat beat--loud" data-sc-cue={cue("ca")}>
            <div className="beat__copy">
              <h2 className="beat__title">
                Nhân viên tự báo bận. Bạn chỉ việc xếp.
              </h2>
              <p className="beat__body">
                Mỗi người một link riêng, không cần tạo tài khoản. Bạn xếp ca
                vào khung trống, lỡ xếp trùng giờ bận là có cảnh báo.
              </p>
            </div>
            <div className="beat__visual">
              <Phieu
                title="Lịch làm tuần này"
                lines={SHIFT_STEPS.map((line, index) => ({
                  text: line.text,
                  state: line.state,
                  attrs: {
                    "data-sc-cue": stepHold("ca", index, SHIFT_STEPS.length),
                  },
                }))}
              />
            </div>
          </div>

          <div className="beat beat--hush">
            <p
              className="hush"
              data-sc-cue={cue("hush", 0.3, 0.2)}
              data-sc-kinetic="words"
            >
              Còn gì phải nhớ trong đầu nữa không?
            </p>
          </div>

          <div className="resolve" data-resolve>
            <h2 className="resolve__title">Không còn gì phải nhớ trong đầu.</h2>
            <div className="resolve__ticket">
              <Phieu
                className="phieu--print"
                title="ServiceOps"
                lines={pains.map((pain) => ({ text: pain.done }))}
              />
            </div>
            <a className="btn btn--primary" href="#dang-ky">
              {cta.trial}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
