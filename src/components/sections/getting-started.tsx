import Image from "next/image";
import { landing, site } from "@/data/site";
import { SampleOrderButton } from "@/components/product/order-dialog";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export function GettingStarted() {
  return (
    <section
      id="bat-dau"
      className="getting-started container"
      aria-labelledby="getting-started-heading"
    >
      <div className="cta-panel">
        <span className="cta-watermark" aria-hidden="true">
          Services-Ops
        </span>
        <span className="cta-symbol">
          <Image
            src="/images/logo.png"
            alt=""
            width={60}
            height={60}
            sizes="60px"
            className="cta-brand-image"
          />
        </span>
        <h2 id="getting-started-heading">{landing.gettingStarted.title}</h2>
        <p>{landing.gettingStarted.description}</p>
        <div className="cta-actions">
          {site.adminUrl ? (
            <ButtonLink href={site.adminUrl}>
              Mở phần mềm {site.name}
              <Icon name="arrowUp" size={18} />
            </ButtonLink>
          ) : (
            <SampleOrderButton>
              Tìm hiểu qua một đơn mẫu
              <Icon name="arrow" size={18} />
            </SampleOrderButton>
          )}
          {site.contactEmail && (
            <ButtonLink
              variant="text"
              href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(`Tìm hiểu phần mềm ${site.name}`)}`}
            >
              Liên hệ trao đổi
              <Icon name="mail" size={18} />
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
