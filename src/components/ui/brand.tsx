import Image from "next/image";
import { site } from "@/data/site";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand ${compact ? "brand-compact" : ""}`}>
      <span className="brand-mark">
        <Image
          src="/images/logo.png"
          alt=""
          width={44}
          height={44}
          sizes={compact ? "30px" : "44px"}
        />
      </span>
      <span>{site.name}</span>
    </span>
  );
}
