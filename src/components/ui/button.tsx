import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type StyleProps = {
  variant?: "primary" | "secondary" | "text";
  className?: string;
};

function buttonClass({ variant = "primary", className = "" }: StyleProps) {
  return `button button-${variant} ${className}`;
}

export function Button({
  variant,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & StyleProps) {
  return (
    <button
      type="button"
      className={buttonClass({ variant, className })}
      {...props}
    />
  );
}

export function ButtonLink({
  variant,
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & StyleProps) {
  return <a className={buttonClass({ variant, className })} {...props} />;
}
