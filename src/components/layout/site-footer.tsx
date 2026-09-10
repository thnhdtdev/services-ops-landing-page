import { Brand } from "@/components/ui/brand";
import { navigation, site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="site-footer container">
      <div className="footer-main">
        <div>
          <a href="#" aria-label={`${site.name}, về đầu trang`}>
            <Brand />
          </a>
          <p>Một nơi quản lý. Một tiệm ngăn nắp.</p>
        </div>
        <nav aria-label="Điều hướng cuối trang">
          {navigation.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          {site.contactEmail && (
            <a href={`mailto:${site.contactEmail}`}>Liên hệ</a>
          )}
        </nav>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.name}.
        </span>
        <span>Phần mềm dành cho tiệm giặt Việt.</span>
      </div>
    </footer>
  );
}
