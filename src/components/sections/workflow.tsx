import Image from "next/image";
import { landing } from "@/data/site";
import { Icon } from "@/components/ui/icon";

export function Workflow() {
  const { workflow } = landing;
  return (
    <section
      id="quy-trinh"
      className="workflow section-space"
      aria-labelledby="workflow-heading"
    >
      <div className="container workflow-grid">
        <div className="workflow-photo">
          <Image
            src="/images/laundry-studio.webp"
            alt="Khăn sạch được xếp gọn trên bàn bên cạnh máy giặt trong một tiệm giặt sáng sủa."
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 560px"
          />
        </div>
        <div className="workflow-content">
          <div className="section-heading">
            <p className="eyebrow">TỪ NHẬN ĐỒ ĐẾN TRẢ ĐỒ</p>
            <h2 id="workflow-heading">
              {workflow.title[0]}
              <br />
              <span>{workflow.title[1]}</span>
            </h2>
            <p>{workflow.description}</p>
          </div>
          <div className="workflow-steps">
            {workflow.steps.map((step, index) => (
              <details
                className="workflow-step"
                key={step.title}
                name="laundry-workflow"
                open={index === 0}
              >
                <summary>
                  <span className="step-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{step.title}</h3>
                  <Icon name="plus" size={18} />
                </summary>
                <p>{step.description}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
