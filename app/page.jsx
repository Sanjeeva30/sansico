export const revalidate = 30;
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import Strip from "@/components/Strip";
import CountStats from "@/components/CountStats";
import StyledText from "@/components/StyledText";
import { getStyled } from "@/lib/styledText";
import CtaBand from "@/components/CtaBand";
import AnimatedDonut from "@/components/AnimatedDonut";
import Reveal from "@/components/Reveal";
import Arrow from "@/components/Arrow";
import { getHome, getCapabilities, getMarkets, getCase } from "@/lib/content";

export default async function Home() {
  const home = await getHome();
  const caps = await getCapabilities();
  const markets = await getMarkets();
  const featured = await getCase(home.featuredWork);
  const manifestoTitle = getStyled(home.manifesto.title);
  const [m1, m2, m3] = (manifestoTitle.text || "").split("|");
  const arts = ["art-design", "art-make", "art-deliver"];

  // Certification / donut section — CMS-driven with fallbacks
  const certSection = home.certSection || {};
  const certSegs = certSection.donutSegments?.length
    ? certSection.donutSegments
    : [
        { label:"Recycled content",    percentage:62, color:"var(--green,#0D4F31)" },
        { label:"Responsibly sourced", percentage:22, color:"var(--citrus,#BDDA5F)" },
        { label:"In transition",       percentage:16, color:"var(--hair,#E5DFD8)" },
      ];
  const cert = {
    headline:   certSection.certHeadline    || null,
    body:       certSection.certBody        || null,
    badges:     certSection.certBadges?.length ? certSection.certBadges : null,
    donutValue: certSection.donutCenterValue || "95%",
    donutLabel: certSection.donutCenterLabel || "Minimum recycled content, gift-bag programme",
  };

  return (
    <>
      <Reveal />
      <Hero hero={home.hero} />

      <section className="sec manifesto">
        <div className="wrap rv">
          <Strip />
          <h2 style={manifestoTitle.style}>{m1}<span className="joy">{m2}</span>{m3}</h2>
          <StyledText as="p" value={home.manifesto.body} />
        </div>
      </section>

      <CountStats stats={home.stats} />

      <section className="sec">
        <div className="wrap rv">
          <div className="sec-head">
            <h2 className="kicker">Long-term relationships</h2>
            <p className="lede">Trusted for decades by the world&rsquo;s shelves</p>
          </div>
          <div className="logo-wall" role="list">
            {home.customers.map((c) => {
              const nameStyled = getStyled(c.name);
              const name = nameStyled.text || (typeof c === "string" ? c : "");
              const logoUrl = c.logoUrl || null;
              return (
                <div role="listitem" key={name} title={name}>
                  {logoUrl
                    ? <Image src={logoUrl} alt={name} width={120} height={40} style={{ objectFit: "contain", filter: "grayscale(1)", opacity: 0.7 }} />
                    : <span style={nameStyled.style}>{name}</span>
                  }
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec-tight" id="capabilities">
        <div className="wrap">
          <div className="sec-head rv">
            <Link href="/capabilities" style={{cursor:"pointer"}} data-animate><h2 className="kicker">What we do ↗</h2></Link>
            <p className="lede">Three capabilities, one accountable partner</p>
          </div>
          <div className="gate-grid">
            {caps.groups.map((g, i) => (
              <Link className="gate rv border-loop" data-animate href={`/capabilities#${g.slug}`} key={g.slug}>
                <div className={`art ${arts[i]}`} aria-hidden="true" />
                <div className="inner">
                  <span className="num">{g.num}</span>
                  <h3>{g.title}</h3>
                  <p>{g.summary}</p>
                  <span className="go">Explore <Arrow /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec warm" id="markets" style={{ marginTop: "70px" }}>
        <div className="wrap rv">
          <div className="sec-head">
            <Link href="/markets" style={{cursor:"pointer"}} data-animate><h2 className="kicker">Markets we serve ↗</h2></Link>
            <p className="lede">Land where your category lives</p>
          </div>
          <div className="market-grid">
            {markets.items.map((m) => (
              <Link className="market border-loop" data-animate href={`/markets/${m.slug}`} key={m.slug}>
                <span style={{ display:"block", width:10, height:10, borderRadius:"50%", background: m.colorHex || "var(--crimson)", marginBottom:16 }} aria-hidden="true" />
                <h3>{m.title}</h3>
                <p>{m.tag}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featured ? (
        <section className="sec proof">
          <div className="wrap rv">
            <p className="kicker">Featured work — {featured.kicker}</p>
            <blockquote>{featured.quote}</blockquote>
            <div className="meta">
              {featured.stats.map((s) => (
                <div key={s.label}><b>{s.value}</b><span>{s.label}</span></div>
              ))}
            </div>
            <br />
            <Link className="link-u" href={`/work/${featured.slug}`}>Read the case study <Arrow /></Link>
          </div>
        </section>
      ) : null}

      <section className="sec">
        <div className="wrap sus-grid rv">
          <div>
            <Strip order={[3,5,1,2,4]} style={{ marginBottom: 30 }} />
            {cert.headline ? (
              <h2 dangerouslySetInnerHTML={{ __html: cert.headline.replace(/\|([^|]+)\|/g, '<em>$1</em>') }} />
            ) : (
              <h2>Certified, dated, <em>verifiable</em> — sustainability as a discipline, not an adjective.</h2>
            )}
            <p className="body">{cert.body || "Every certification we hold is published with its scope and holding entity, and backed by a downloadable certificate. Forestry to food safety, security to social compliance — verification is the point."}</p>
            <div className="chips">
              {(cert.badges || ["FSC®","FSSC 22000","ISO 17025","C-TPAT / SCAN","Higg Index","amfori BEPI","HERproject","NEST"]).map((c) => (
                <Link className="chip" href="/sustainability#certifications" key={c}>{c}</Link>
              ))}
            </div>
          </div>
          <AnimatedDonut segments={certSegs} value={cert.donutValue} label={cert.donutLabel} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
