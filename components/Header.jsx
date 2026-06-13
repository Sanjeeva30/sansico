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

  const Logo = () => site.logoUrl
    ? <Image src={site.logoUrl} alt="Sansico Group" width={160} height={36} style={{ objectFit:"contain" }} />
    : <><span>SANSICO</span> <em>Group</em></>;

  return (
    <>
      <header className={`hd ${solid || open ? "solid" : ""}`}
        style={!onHome && !solid && !open ? { background:"rgba(16,12,10,.35)", backdropFilter:"blur(6px)" } : undefined}>
        <div className="wrap bar">
          <Link className="logo" href="/"><Logo /></Link>
          <nav className="nav-main" aria-label="Primary">
            {site.nav.map((n) => (
              <Link key={n.href} href={n.href} aria-current={path.startsWith(n.href) ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
            <Link className="nav-cta" href={site.cta.href}>{site.cta.label}</Link>
          </nav>
          <button className="menu-btn" aria-expanded={open} aria-label="Toggle menu"
            onClick={() => setOpen(!open)}>
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      {/* Mobile nav — fixed overlay, sits above everything */}
      {open && (
        <div style={{
          position:"fixed", inset:0, zIndex:9999,
          background:"#fff", overflowY:"auto",
          display:"flex", flexDirection:"column",
        }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
            padding:"20px 5%", borderBottom:"1px solid #eee" }}>
            <Link className="logo" href="/" onClick={() => setOpen(false)}><Logo /></Link>
            <button onClick={() => setOpen(false)}
              style={{ fontSize:16, fontWeight:600, background:"none", border:"1px solid #ccc",
                borderRadius:24, padding:"6px 18px", cursor:"pointer" }}>
              Close
            </button>
          </div>
          <nav style={{ display:"flex", flexDirection:"column", padding:"32px 5%", gap:0 }}>
            {site.nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
                style={{ fontSize:28, fontWeight:500, color:"#1a1a1a", textDecoration:"none",
                  padding:"16px 0", borderBottom:"1px solid #f0f0f0" }}>
                {n.label}
              </Link>
            ))}
            <Link href={site.cta.href} onClick={() => setOpen(false)}
              style={{ marginTop:32, fontSize:16, fontWeight:700, color:"#fff",
                background:"#7A0D20", borderRadius:32, padding:"14px 28px",
                textDecoration:"none", textAlign:"center", display:"block" }}>
              {site.cta.label}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
