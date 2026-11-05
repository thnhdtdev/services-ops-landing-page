import Image from "next/image";
import { CheckIcon, WarningIcon } from "@phosphor-icons/react/dist/ssr";
import logo from "@/assets/brand/logo.png";

export type PhieuLine = {
  text: React.ReactNode;
  /** done: ticked; warn: a flagged line; todo: an empty box; none: plain */
  state?: "done" | "warn" | "todo" | "none";
  /** passed straight through, so a line can carry its own engine cue */
  attrs?: Record<`data-${string}`, string>;
};

/**
 * The laundry ticket, the page's one physical object: the receipt with the
 * torn zigzag edge from the logo. Real text on paper, never a picture of the
 * app's screens.
 */
export function Phieu({
  title,
  lines,
  className = "",
  style,
  children,
  label,
}: {
  title: string;
  lines?: PhieuLine[];
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  label?: string;
}) {
  return (
    <figure
      className={`phieu ${className}`}
      style={style}
      aria-label={label ?? title}
    >
      <figcaption className="phieu__head">
        <Image src={logo} alt="" width={22} height={22} />
        <span>{title}</span>
      </figcaption>
      {lines && (
        <ul className="phieu__lines">
          {lines.map((line, index) => (
            <li
              key={index}
              className="phieu__line"
              data-state={line.state ?? "done"}
              {...line.attrs}
            >
              <span className="phieu__mark" aria-hidden="true">
                {line.state === "warn" ? (
                  <WarningIcon weight="bold" />
                ) : line.state === "todo" || line.state === "none" ? null : (
                  <CheckIcon weight="bold" />
                )}
              </span>
              <span>{line.text}</span>
            </li>
          ))}
        </ul>
      )}
      {children}
    </figure>
  );
}
