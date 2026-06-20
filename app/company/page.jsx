export const revalidate = 30;
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { getCompany, getPageSettings, getPageSeo } from "@/lib/content";
import { getStyled } from "@/lib/styledText";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  return getPageSeo("company", {
    title: "Company — Sansico Group",
    description: "Four decades of Indonesian manufacturing — mission, vision, culture, values and facilities.",
  });
}

const SANSI = ["#7A0D20","#22409E","#0D4F31","#F3263E","#BDDA5F"];

// Inline card style — shadows + white bg, no CSS class dependency
const card = (extra = {}) => ({
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 1px 4px rgba(23,18,15,.06),0 8px 28px rgba(23,18,15,.13),0 24px 64px rgba(23,18,15,.12)",
  transition: "box-shadow .4s ease, transform .4s ease",
  ...extra,
});

// Rotating border card — uses --ba from ScrollObserver rAF
const borderCard = (bg = "#fff", extra = {}) => ({
  background: `linear-gradient(${bg},${bg}) padding-box, conic-gradient(from var(--ba,0deg),#7A0D20 0%,#22409E 20%,#0D4F31 40%,#BDDA5F 60%,#F3263E 80%,#7A0D20 100%) border-box`,
  border: "3px solid transparent",
  borderRadius: 12,
  boxShadow: "0 1px 4px rgba(23,18,15,.06),0 8px 28px rgba(23,18,15,.13),0 24px 64px rgba(23,18,15,.12)",
  transition: "box-shadow .4s ease, transform .4s ease",
  ...extra,
});

function RichText({ blocks }) {
  if (!blocks?.length) return null;
  return blocks.map((b, i) => {
    const text = b.children?.map(c => c.text).join("") || "";
    if (b.style === "h3") return <h3 key={i}>{text}</h3>;
    return <p key={i}>{text}</p>;
  });
}

export default async function Company() {
  const [c, settings] = await Promise.all([
    getCompany(), getPageSettings("company"),
  ]);
  if (!settings.visible) notFound();
  const title = getStyled(c.title);
  const intro = getStyled(c.intro);
  const vision = getStyled(c.vision);
  const mission = getStyled(c.mission);
  const culture = getStyled(c.culture);
  const overviewTitle = getStyled(c.overviewTitle);

  return (
    <>
      <Reveal />
      <PageHero kicker="Company" title={title.text} intro={intro.text}
        titleStyle={title.style} introStyle={intro.style}
        heroType={settings.heroType} heroImageUrl={settings.heroImageUrl}
        heroVideoUrl={settings.heroVideoUrl} heroPosterUrl={settings.heroPosterUrl} />

      {/* ── VISION · MISSION · CULTURE ─────────────────── */}
      <section className="sec warm" style={{ padding:"clamp(32px,4vw,48px) 0" }}>
        <div className="wrap rv">

          {/* Vision — full-width, rotating border */}
          <div style={borderCard("var(--paper,#FAF8F4)", {
            padding:"clamp(24px,3vw,36px)",
            marginBottom:"clamp(16px,2.5vw,24px)"
          })}>
            <p className="label-big" style={{ color:"#7A0D20", margin:"0 0 14px" }}>
              Vision
            </p>
            <p style={{ fontSize:"clamp(1.1rem,2.2vw,1.5rem)", fontWeight:300,
              lineHeight:1.55, margin:0, color:"#17120F", maxWidth:640, ...vision.style }}>
              {vision.text}
            </p>
          </div>

          {/* Mission + Culture — side by side, rotating borders */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr",
            gap:"clamp(12px,2vw,20px)" }}>

            <div style={borderCard("#fff", { padding:"clamp(20px,3vw,28px)" })}>
              <p className="label-big" style={{ color:"#22409E", margin:"0 0 14px" }}>
                Mission
              </p>
              <p style={{ fontSize:"clamp(0.95rem,1.5vw,1.05rem)", lineHeight:1.65,
                margin:0, color:"#17120F", fontWeight:300, ...mission.style }}>
                {mission.text}
              </p>
            </div>

            <div style={borderCard("#fff", { padding:"clamp(20px,3vw,28px)" })}>
              <p className="label-big" style={{ color:"#0D4F31", margin:"0 0 14px" }}>
                Culture
              </p>
              <p style={{ fontSize:"clamp(0.95rem,1.5vw,1.05rem)", lineHeight:1.65,
                margin:0, color:"#17120F", fontWeight:300, ...culture.style }}>
                {culture.text}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ─────────────────────────────────────── */}
      {c.values?.length > 0 && (
        <section className="sec" style={{ padding:"clamp(28px,4vw,44px) 0" }}>
          <div className="wrap rv">
            <p className="label-big" style={{ color:"#9A8A80", margin:"0 0 28px" }}>
              Our Values
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {c.values.map((v, i) => {
                const color = SANSI[i] || "#7A0D20";
                const vTitle = getStyled(v.title);
                const vBody = getStyled(v.body);
                const initial = vTitle.text?.[0] || "";
                const rest    = vTitle.text?.slice(1) || "";
                return (
                  <div key={i} style={card({
                    display:"flex",
                    alignItems:"center",
                    gap:"clamp(16px,2.5vw,28px)",
                    padding:"16px 24px",
                    borderLeft:`4px solid ${color}`,
                  })}>
                    {/* Large initial — fully inside card */}
                    <div style={{
                      fontSize:"clamp(1.8rem,3.5vw,2.6rem)",
                      fontWeight:800, color, lineHeight:1,
                      fontFamily:"Georgia,serif",
                      flexShrink:0, minWidth:"clamp(30px,4vw,48px)",
                      textAlign:"center"
                    }}>
                      {initial}
                    </div>
                    {/* Name + description */}
                    <div style={{ display:"flex", alignItems:"baseline",
                      gap:"clamp(8px,1.5vw,16px)", flexWrap:"wrap" }}>
                      <h3 style={{ margin:0,
                        fontSize:"clamp(0.9rem,1.4vw,1.05rem)",
                        fontWeight:700, lineHeight:1.2, flexShrink:0, ...vTitle.style }}>
                        <span style={{ color }}>{initial}</span>{rest}
                      </h3>
                      <p style={{ margin:0, fontSize:14,
                        lineHeight:1.5, color:"#6B5F58", ...vBody.style }}>
                        {vBody.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── OVERVIEW ───────────────────────────────────── */}
      {c.overviewBody?.length > 0 && (
        <section className="sec warm" style={{ padding:"clamp(28px,4vw,44px) 0" }}>
          <div className="wrap split rv">
            <div>{overviewTitle.text && <h2 style={overviewTitle.style}>{overviewTitle.text}</h2>}</div>
            <div className="prose"><RichText blocks={c.overviewBody} /></div>
          </div>
        </section>
      )}

      {/* ── TIMELINE ───────────────────────────────────── */}
      {c.timeline?.length > 0 && (
        <section className="sec" style={{ padding:"clamp(28px,4vw,44px) 0" }}>
          <div className="wrap rv">
            <p style={{ fontSize:10, fontWeight:800, letterSpacing:"0.18em",
              textTransform:"uppercase", color:"#9A8A80", margin:"0 0 20px" }}>
              Our Story
            </p>
            <div style={{ borderLeft:"2px solid #E5DFD8" }}>
              {c.timeline.map((t, ti) => {
                const tYear = getStyled(t.year);
                const tEvent = getStyled(t.event);
                const tDesc = getStyled(t.description);
                return (
                <div key={ti} style={{ display:"flex", gap:20,
                  paddingBottom:18, paddingLeft:20, position:"relative" }}>
                  <div style={{ position:"absolute", left:-5, top:4,
                    width:8, height:8, borderRadius:"50%",
                    background:"#7A0D20" }} />
                  <b style={{ color:"#7A0D20", minWidth:44,
                    flexShrink:0, fontSize:13, ...tYear.style }}>{tYear.text}</b>
                  <div>
                    <b style={{ display:"block", marginBottom:2,
                      fontSize:14, ...tEvent.style }}>{tEvent.text}</b>
                    {tDesc.text && (
                      <p style={{ margin:0, opacity:.7, fontSize:13, ...tDesc.style }}>
                        {tDesc.text}
                      </p>
                    )}
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── FACILITIES ─────────────────────────────────── */}
      {c.facilities?.length > 0 && (
        <section className="sec warm" style={{ padding:"clamp(28px,4vw,44px) 0" }}>
          <div className="wrap rv">
            <div style={{ display:"flex", alignItems:"baseline",
              justifyContent:"space-between", marginBottom:18,
              flexWrap:"wrap", gap:10 }}>
              <p style={{ fontSize:10, fontWeight:800, letterSpacing:"0.18em",
                textTransform:"uppercase", color:"#9A8A80", margin:0 }}>
                Our Facilities
              </p>
              <Link href="/company/facilities"
                style={{ fontSize:13, color:"#7A0D20",
                  textDecoration:"none", fontWeight:600 }}>
                Full details →
              </Link>
            </div>
            <div className="fac-grid">
              {c.facilities.map((f, fi) => {
                const fName = getStyled(f.name);
                const fCity = getStyled(f.city);
                const fFocus = getStyled(f.focus);
                return (
                <div key={fi} className="fac" style={{ flexDirection:"column" }}>
                  {f.photoUrl && (
                    <div style={{ position:"relative", width:"100%",
                      aspectRatio:"16/9", overflow:"hidden",
                      borderRadius:6, marginBottom:10 }}>
                      <Image
                        src={`${f.photoUrl}?w=600&h=338&fit=crop&auto=format`}
                        alt={fName.text} fill
                        sizes="(max-width:768px)100vw,50vw"
                        style={{ objectFit:"cover" }} />
                    </div>
                  )}
                  <b style={{ fontSize:13, ...fName.style }}>{fName.text}</b>
                  <span style={{ fontSize:12, color:"#9A8A80", ...fCity.style }}>{fCity.text}</span>
                  {fFocus.text && (
                    <span className="focus" style={{ fontSize:11, ...fFocus.style }}>
                      {fFocus.text}
                    </span>
                  )}
                </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── TEAM LINK ──────────────────────────────────── */}
      <section className="sec" style={{ padding:"clamp(24px,3.5vw,40px) 0" }}>
        <div className="wrap rv" style={{ display:"flex",
          alignItems:"center", justifyContent:"space-between",
          flexWrap:"wrap", gap:14 }}>
          <div>
            <p style={{ fontSize:10, fontWeight:800, letterSpacing:"0.18em",
              textTransform:"uppercase", color:"#9A8A80", margin:"0 0 6px" }}>
              Leadership
            </p>
            <p style={{ fontSize:17, fontWeight:300, margin:0, color:"#17120F" }}>
              The people behind the operations
            </p>
          </div>
          <Link href="/team" style={{ display:"inline-flex",
            alignItems:"center", gap:8, background:"#7A0D20",
            color:"#fff", borderRadius:999, padding:"11px 24px",
            fontSize:13, fontWeight:700, textDecoration:"none" }}>
            Meet the team →
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
