import { pricing } from "@/data/pricing";
import { Icon } from "@/components/ui/icon";

export function Pricing() {
  return (
    <section
      id="bang-gia"
      className="pricing section-space container"
      aria-labelledby="pricing-heading"
    >
      <div className="section-heading">
        <h2 id="pricing-heading">{pricing.title}</h2>
        <p>{pricing.description}</p>
      </div>
      <div className="pricing-grid">
        {pricing.plans.map((plan, index) => (
          <article
            key={plan.id}
            className={`pricing-plan pricing-plan-${plan.id}`}
            aria-labelledby={`plan-${plan.id}`}
          >
            <span className="pricing-index" aria-hidden="true">
              0{index + 1}
            </span>
            <div className="pricing-plan-heading">
              <h3 id={`plan-${plan.id}`}>{plan.name}</h3>
              <Icon
                name={plan.id === "basic" ? "orders" : "overview"}
                size={25}
                weight="light"
              />
            </div>
            <p className="pricing-plan-description">{plan.description}</p>
            <div className="pricing-plan-price">
              <span>Mức giá</span>
              <p>{plan.price ?? pricing.pendingPrice}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="pricing-note">{pricing.note}</p>
    </section>
  );
}
