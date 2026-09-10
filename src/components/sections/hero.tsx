import { landing } from "@/data/site";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ServiceFlowVisual } from "@/components/product/service-flow-visual";

export function Hero() {
  const { hero } = landing;
  return (
    <section
      id="san-pham"
      className="hero container"
      aria-labelledby="hero-heading"
    >
      <div className="hero-copy">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 id="hero-heading">
          {hero.title[0]}
          <br />
          <span>{hero.title[1]}</span>
        </h1>
        <p className="hero-description">{hero.description}</p>
        <div className="hero-actions">
          <ButtonLink href="#tinh-nang">
            {hero.primary}
            <Icon name="arrow" size={18} />
          </ButtonLink>
          <ButtonLink href="#quy-trinh" variant="text">
            {hero.secondary}
            <Icon name="chevronRight" size={16} />
          </ButtonLink>
        </div>
        <div
          className="hero-capabilities"
          aria-label="Các phần việc có thể quản lý"
        >
          <span>Đơn hàng</span>
          <span>Khách hàng</span>
          <span>Thanh toán</span>
        </div>
      </div>
      <div className="hero-visual">
        <ServiceFlowVisual />
      </div>
    </section>
  );
}
