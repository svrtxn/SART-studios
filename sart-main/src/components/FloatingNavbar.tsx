"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function FloatingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`floating-header-wrapper ${isScrolled ? "is-scrolled" : ""}`}>
      <nav aria-label="Navegación principal" className="floating-navbar">
        {/* Enlarged Brand Logo */}
        <Link
          aria-label="SART STUDIOS, ir al inicio"
          className="brand brand-enlarged"
          href="/"
          onClick={closeMobileMenu}
        >
          <div className="brand-logo-frame">
            <Image
              alt="SART STUDIOS"
              className="brand-image"
              fill
              priority
              sizes="280px"
              src="/sart-studios.png"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="nav-links">
          <Link className="nav-link" href="/#sobre-mi">
            Sobre mí
          </Link>
          <Link className="nav-link" href="/#productos">
            Productos
          </Link>
          <Link className="nav-link" href="/cv">
            CV / Trayectoria
          </Link>
          <Link className="nav-link" href="/contacto">
            Contacto
          </Link>
        </div>

        {/* Action button CTA */}
        <div className="navbar-actions">
          <a
            className="button button-primary button-sm button-directional"
            href="http://127.0.0.1:3001/"
            rel="noreferrer"
            target="_blank"
          >
            <span>SART Aprende</span>
            <span aria-hidden="true" className="button-arrow">
              ↗
            </span>
          </a>

          {/* Mobile hamburger button */}
          <button
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
            className="mobile-menu-toggle icon-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
          >
            <span className={`hamburger-bar ${mobileMenuOpen ? "open" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <Link className="mobile-nav-link" href="/" onClick={closeMobileMenu}>
            Inicio
          </Link>
          <Link className="mobile-nav-link" href="/#sobre-mi" onClick={closeMobileMenu}>
            Sobre mí y origen
          </Link>
          <Link className="mobile-nav-link" href="/#productos" onClick={closeMobileMenu}>
            Ecosistema de productos
          </Link>
          <Link className="mobile-nav-link" href="/cv" onClick={closeMobileMenu}>
            CV / Trayectoria
          </Link>
          <Link className="mobile-nav-link" href="/contacto" onClick={closeMobileMenu}>
            Contacto
          </Link>
          <div className="mobile-drawer-cta">
            <a
              className="button button-primary button-directional"
              href="http://127.0.0.1:3001/"
              onClick={closeMobileMenu}
              rel="noreferrer"
              target="_blank"
            >
              <span>Abrir SART Aprende</span>
              <span aria-hidden="true" className="button-arrow">
                ↗
              </span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
