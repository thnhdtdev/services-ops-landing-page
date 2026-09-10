"use client";

import { useEffect, useRef, useState } from "react";
import { navigation, site } from "@/data/site";
import { Brand } from "@/components/ui/brand";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return (
    <header ref={header} className="site-header">
      <a className="skip-link" href="#noi-dung">
        Đến nội dung chính
      </a>
      <div className="container header-inner">
        <a
          href="#"
          aria-label={`${site.name}, trang chủ`}
          onClick={() => setOpen(false)}
        >
          <Brand />
        </a>
        <nav className="desktop-nav" aria-label="Điều hướng chính">
          {navigation.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          {site.adminUrl && (
            <a className="login-link" href={site.adminUrl}>
              Đăng nhập
            </a>
          )}
          <ButtonLink
            className="header-cta"
            href="#bat-dau"
            variant="secondary"
          >
            Khám phá
            <Icon name="arrowUp" size={16} />
          </ButtonLink>
          <button
            ref={toggle}
            type="button"
            className="menu-toggle"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} size={24} />
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Điều hướng di động"
        hidden={!open}
      >
        {navigation.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
            <Icon name="arrow" size={18} />
          </a>
        ))}
        <a href={site.adminUrl || "#bat-dau"} onClick={() => setOpen(false)}>
          {site.adminUrl ? "Đăng nhập" : `Tìm hiểu ${site.name}`}
          <Icon name="arrowUp" size={18} />
        </a>
      </nav>
    </header>
  );
}
