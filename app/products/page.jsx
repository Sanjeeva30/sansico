export const revalidate = 30;
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { getProductCategories, getPageSettings, getPageSeo } from "@/lib/content";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  return getPageSeo("products", {
    title: "Products — Our Portfolio | Sansico Group",
    description: "Sansico's full product portfolio — paper-based packaging, handicrafts, gifting and more, developed to customer specification."
  });
}

export default async function Products() {
  const [cats, settings] = await Promise.all([getProductCategories(), getPageSettings("products")]);
  if (!settings.visible) notFound();

  return (
    <>
      <Reveal />
      <PageHero kicker="Products" title="Our product portfolio"
        intro="Every product developed to your specification — FSC-certified materials, global retail standards." />

      {/* Category jump nav */}
      {cats.length > 1 && (
        <nav className="sec" style={{ paddingTop:0, paddingBottom:0 }}>
          <div className="wrap" style={{ display:"flex", gap:10, flexWrap:"wrap", paddingBottom:8 }}>
            {cats.map((cat) => (
              <a key={cat.slug} href={`#${cat.slug}`} className="chip">{cat.name}</a>
            ))}
          </div>
        </nav>
      )}

      {cats.map((cat, i) => (
        <section key={cat.slug} id={cat.slug} className={`sec ${i % 2 ? "warm" : ""}`}>
          <div className="wrap rv">

            {/* Category header — full-width image if set */}
            {cat.coverUrl ? (
              <div style={{ position:"relative", width:"100%", height:320, overflow:"hidden",
                borderRadius:10, marginBottom:40 }}>
                <Image
                  src={`${cat.coverUrl}?w=1200&h=400&fit=crop&auto=format`}
                  alt={cat.name} fill sizes="100vw" style={{ objectFit:"cover" }} />
                <div style={{ position:"absolute", inset:0,
                  background:"linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 60%)" }} />
                <div style={{ position:"absolute", bottom:28, left:28 }}>
                  <h2 style={{ color:"#fff", margin:0, fontSize:"clamp(1.4rem,3vw,2rem)" }}>{cat.name}</h2>
                  {cat.description && (
                    <p style={{ color:"rgba(255,255,255,0.85)", margin:"6px 0 0", maxWidth:480, fontSize:15 }}>
                      {cat.description}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ marginBottom:32 }}>
                <h2 className="kicker">{cat.name}</h2>
                {cat.description && <p className="lede" style={{ maxWidth:540 }}>{cat.description}</p>}
              </div>
            )}

            {/* Product grid */}
            {cat.products?.length > 0 ? (
              <div style={{ display:"grid",
                gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))", gap:24 }}>
                {cat.products.map((p) => (
                  <Link key={p.slug} href={`/products/${p.slug}`}
                    style={{ textDecoration:"none", display:"block", borderRadius:10,
                      border:"1px solid var(--hair, #e8e5df)", overflow:"hidden",
                      transition:"box-shadow 0.2s, transform 0.2s", background:"#fff" }}
                    className="prod-card">

                    {/* Square image */}
                    <div style={{ position:"relative", width:"100%", aspectRatio:"1/1",
                      background:"#f8f7f4" }}>
                      {p.thumbUrl ? (
                        <Image
                          src={`${p.thumbUrl}?w=600&h=600&fit=crop&auto=format`}
                          alt={p.name} fill sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 220px"
                          style={{ objectFit:"contain", padding:16 }} />
                      ) : (
                        <div style={{ position:"absolute", inset:0, display:"flex",
                          alignItems:"center", justifyContent:"center",
                          color:"var(--muted, #999)", fontSize:13 }}>
                          No image
                        </div>
                      )}
                    </div>

                    {/* Card body */}
                    <div style={{ padding:"16px 18px 18px" }}>
                      <h3 style={{ margin:"0 0 6px", fontSize:15, fontWeight:600,
                        color:"var(--ink, #1a1a1a)", lineHeight:1.3 }}>
                        {p.name}
                      </h3>
                      {p.description && (
                        <p style={{ margin:"0 0 12px", fontSize:13, color:"var(--muted, #888)",
                          lineHeight:1.4,
                          display:"-webkit-box", WebkitLineClamp:2,
                          WebkitBoxOrient:"vertical", overflow:"hidden" }}>
                          {p.description}
                        </p>
                      )}
                      <span style={{ fontSize:12, fontWeight:700, letterSpacing:"0.08em",
                        textTransform:"uppercase", color:"var(--crimson, #7A0D20)" }}>
                        View details →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p style={{ opacity:0.5, fontStyle:"italic" }}>
                Products coming soon — add them in Studio → Products.
              </p>
            )}
          </div>
        </section>
      ))}

      {cats.length === 0 && (
        <section className="sec">
          <div className="wrap rv">
            <p style={{ opacity:0.5 }}>No product categories yet — add them in Studio under Product Categories.</p>
          </div>
        </section>
      )}

      <CtaBand />

      {/* Hover styles */}
      <style>{`
        .prod-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}
