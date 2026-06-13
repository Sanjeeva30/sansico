export const revalidate = 30;
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import Arrow from "@/components/Arrow";
import { getCompany, getPageSettings, getPageSeo } from "@/lib/content";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  return getPageSeo("company", {
    title: "Company — Four Decades from Indonesia to the World",
    description: "Sansico Group's story: vision, culture, history and innovation."
  });
}

function RichBlocks({ blocks }) {
  if (!blocks?.length) return null;
  return blocks.map((b, i) => {
    const text = b.children?.map(c => c.text).join("") || "";
    if (b.style === "h3") return <h3 key={i}>{text}</h3>;
    return <p key={i}>{text}</p>;
  });
}

export default async function Company() {
  const [c, settings] = await Promise.all([getCompany(), getPageSettings("company")]);
  if (!settings.visible) notFound();

  return (
    <>
      <Reveal />
      <PageHero kicker="Company" title={c.title} intro={c.intro} />

      {/* Vision & Culture */}
      <section className="sec">
        <div className="wrap rv">
          <div className="card-grid cols2">
            {c.vision && (
              <div className="card" style={{ borderTop:"4px solid var(--citrus)" }}>
                <span className="kicker">Vision</span>
                <p style={{ fontSize:17, color:"var(--ink)", fontWeight:500 }}>{c.vision}</p>
              </div>
            )}
            {c.culture && (
              <div className="card" style={{ borderTop:"4px solid var(--crimson)" }}>
                <span className="kicker">Culture</span>
                <p style={{ fontSize:17, color:"var(--ink)", fontWeight:500 }}>{c.culture}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Overview (optional rich text block) */}
      {c.overviewBody?.length > 0 && (
        <section className="sec warm">
          <div className="wrap split rv">
            <div>
              {c.overviewTitle && <h2>{c.overviewTitle}</h2>}
            </div>
            <div className="prose"><RichBlocks blocks={c.overviewBody} /></div>
          </div>
        </section>
      )}

      {/* Values */}
      {c.values?.length > 0 && (
        <section className="sec">
          <div className="wrap rv">
            <h2 className="kicker">Our values</h2>
            <div className="card-grid">
              {c.values.map((v) => (
                <div className="card" key={v.title}>
                  <h3>{v.title}</h3>
                  {v.body && <p>{v.body}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Timeline */}
      {c.timeline?.length > 0 && (
        <section className="sec warm">
          <div className="wrap rv">
            <h2 className="kicker">Our story</h2>
            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {c.timeline.map((t, i) => (
                <div key={t.year} style={{ display:"flex", gap:32, paddingBottom:32,
                  borderLeft:"2px solid var(--hair)", paddingLeft:24, position:"relative" }}>
                  <div style={{ position:"absolute", left:-7, top:4, width:12, height:12,
                    borderRadius:"50%", background:"var(--crimson)" }} />
                  <div style={{ minWidth:60 }}>
                    <b style={{ color:"var(--crimson)" }}>{t.year}</b>
                  </div>
                  <div>
                    <b style={{ display:"block" }}>{t.event}</b>
                    {t.description && <p style={{ margin:"4px 0 0", opacity:0.7 }}>{t.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Facilities */}
      {c.facilities?.length > 0 && (
        <section className="sec warm">
          <div className="wrap rv">
            <div className="sec-head">
              <h2 className="kicker">Our facilities</h2>
              <p className="lede">Ten locations, Indonesia &amp; China</p>
            </div>
            <div className="fac-grid">
              {c.facilities.map((f) => (
                <div key={f.name} className="fac" style={{ flexDirection:"column" }}>
                  {f.photoUrl && (
                    <div style={{ position:"relative", width:"100%", aspectRatio:"16/9",
                      overflow:"hidden", borderRadius:6, marginBottom:12 }}>
                      <Image src={`${f.photoUrl}?w=600&h=338&fit=crop&auto=format`}
                        alt={f.name} fill sizes="(max-width:768px) 100vw, 50vw"
                        style={{ objectFit:"cover" }} />
                    </div>
                  )}
                  <b>{f.name}</b>
                  <span>{f.city}</span>
                  {f.focus && <span className="focus">{f.focus}</span>}
                  {f.capacity && <span style={{ fontSize:13, opacity:0.65, marginTop:4 }}>{f.capacity}</span>}
                </div>
              ))}
            </div>
            <p style={{ marginTop:32 }}>
              <Link className="link-d" href="/company/facilities">Full facility details →</Link>
            </p>
          </div>
        </section>
      )}

      {/* Team */}
      <section className="sec">
        <div className="wrap rv">
          <div className="sec-head">
            <h2 className="kicker">Leadership</h2>
            <p className="lede">The people behind the operations</p>
          </div>
          <p><Link className="btn btn-crimson" href="/team">Meet the team <Arrow /></Link></p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
