import { landing } from "@/data/site";
import { Icon, type IconName } from "@/components/ui/icon";

export function Benefits() {
  return (
    <section
      className="benefits-band"
      aria-label="Việc quản lý mỗi ngày nhẹ hơn"
    >
      <div className="benefits container">
        {landing.benefits.map((benefit, index) => (
          <div key={benefit.title} className="benefit">
            <span className="benefit-index" aria-hidden="true">
              0{index + 1}
            </span>
            <Icon name={benefit.icon as IconName} size={27} weight="light" />
            <div>
              <h2>{benefit.title}</h2>
              <p>{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
