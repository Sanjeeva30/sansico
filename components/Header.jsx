"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header({ site }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen]   = useState(false);
  const path   = usePathname();
  const onHome = path === "/";

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > (onHome ? window.innerHeight * 0.72 : 40));
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, [onHome]);

  useEffect(() => { setOpen(false); }, [path]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const wordmark = (
    <span style={{ fontWeight: 700, letterSpacing: "0.08em" }}>
      SANSICO <em style={{ fontWeight: 300, fontStyle: "italic" }}>Group</em>
    </span>
  );

  return (
    <>
      <header
        className={`hd ${solid || open ? "solid" : ""}`}
        style={!onHome && !solid && !open
          ? { background: "rgba(16,12,10,.35)", backdropFilter: "blur(6px)" }
          : undefined}>
        <div className="wrap bar">
          <Link className="logo" href="/">
            {site.logoUrl
              ? <Image src={site.logoUrl} alt="Sansico Group" width={160} height={36}
                  style={{ objectFit: "contain" }} />
              : wordmark}
          </Link>
          <nav className="nav-main" aria-label="Primary">
            {site.nav.map((n) => (
              <Link key={n.href} href={n.href}
                aria-current={path.startsWith(n.href) ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
            <Link className="nav-cta" href={site.cta.href}>{site.cta.label}</Link>
          </nav>
          <button
            className="menu-btn"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(v => !v)}>
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      {open && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 9999,
          background: "#0c0806",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
        }}>
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
            padding: "22px 6%",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            flexShrink: 0,
          }}>
            <Link href="/" onClick={() => setOpen(false)}
              style={{ textDecoration: "none", color: "#fff" }}>
              {wordmark}
            </Link>
            <button onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "1.5px solid rgba(255,255,255,0.35)",
                borderRadius: 999,
                padding: "8px 22px",
                color: "rgba(255,255,255,0.85)",
                fontSize: 13,
                letterSpacing: "0.06em",
                cursor: "pointer",
                fontWeight: 600,
                textTransform: "uppercase",
              }}>
              Close
            </button>
          </div>

          <nav style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "32px 8%",
          }}>
            {site.nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  fontSize: "clamp(2rem, 9vw, 3.2rem)",
                  fontWeight: 300,
                  color: path.startsWith(n.href) ? "#7A0D20" : "rgba(255,255,255,0.88)",
                  textDecoration: "none",
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  lineHeight: 1.2,
                }}>
                {n.label}
              </Link>
            ))}
            <Link href={site.cta.href} onClick={() => setOpen(false)}
              style={{
                display: "inline-block",
                alignSelf: "flex-start",
                marginTop: 36,
                background: "#7A0D20",
                color: "#fff",
                borderRadius: 999,
                padding: "15px 36px",
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "0.02em",
              }}>
              {site.cta.label} →
            </Link>
          </nav>

          <p style={{
            padding: "20px 8%",
            color: "rgba(255,255,255,0.2)",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            flexShrink: 0,
          }}>
            Indonesia · China · USA
          </p>
        </div>
      )}
    </>
  );
}
