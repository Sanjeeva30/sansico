export const revalidate = 30;
import PageHero from "@/components/PageHero";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { getTeam, getPageSettings, getPageSeo } from "@/lib/content";
import { getStyled } from "@/lib/styledText";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  return getPageSeo("team", { title:"Team — Sansico Group", description:"Meet the leadership team behind Sansico Group." });
}

export default async function Team() {
  const [team, settings] = await Promise.all([getTeam(), getPageSettings("team")]);
  if (!settings.visible) notFound();

  return (
    <>
      <Reveal />
      <PageHero kicker="Our team" title="The people behind the operations"
        heroType={settings.heroType} heroImageUrl={settings.heroImageUrl}
        heroVideoUrl={settings.heroVideoUrl} heroPosterUrl={settings.heroPosterUrl} />
      <section className="sec">
        <div className="wrap rv">
          {team.length === 0 ? (
            <p style={{ opacity:0.5 }}>Team profiles coming soon — add them in the Studio under Team.</p>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:32 }}>
              {team.map((p, pi) => {
                const pName = getStyled(p.name);
                const pRole = getStyled(p.role);
                const pBio = getStyled(p.bio);
                return (
                <div key={pi} style={{ display:"flex", flexDirection:"column", gap:14 }}>
                  {p.photoUrl ? (
                    <div style={{ position:"relative", width:"100%", aspectRatio:"1/1", overflow:"hidden", borderRadius:8 }}>
  <Image src={p.photoUrl} alt={pName.text} fill sizes="(max-width:768px) 100vw, 50vw" style={{ objectFit:"cover" }} />
</div>
                  ) : (
                    <div style={{ width:"100%", aspectRatio:"1/1", background:"var(--hair)", borderRadius:8,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:40, fontWeight:700, color:"var(--ink)", opacity:0.2 }}>
                      {pName.text?.[0]}
                    </div>
                  )}
                  <div>
                    <b style={{ display:"block", fontSize:17, ...pName.style }}>{pName.text}</b>
                    <span style={{ display:"block", color:"var(--crimson)", fontSize:13.5, fontWeight:500, marginBottom:8, ...pRole.style }}>{pRole.text}</span>
                    {pBio.text && <p style={{ margin:0, fontSize:14, lineHeight:1.65, opacity:0.8, ...pBio.style }}>{pBio.text}</p>}
                    {p.linkedin && (
                      <a href={p.linkedin} target="_blank" rel="noopener"
                        style={{ display:"inline-block", marginTop:10, fontSize:13, color:"var(--navy)", fontWeight:600 }}>
                        LinkedIn →
                      </a>
                    )}
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
