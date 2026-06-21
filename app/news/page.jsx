export const revalidate = 30;
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { getNews, getPageSettings, getPageSeo } from "@/lib/content";
import { getStyled } from "@/lib/styledText";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  return getPageSeo("news", { title:"News & Press", description:"The latest news, press mentions and updates from Sansico Group." });
}

const TYPE_LABEL = { article:"Article", press:"Press mention", social:"Social post" };
const TYPE_COLOR = { article:"var(--navy)", press:"var(--crimson)", social:"var(--green)" };

function fmtDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" });
}

export default async function News() {
  const [posts, settings] = await Promise.all([getNews(), getPageSettings("news")]);
  if (!settings.visible) notFound();

  return (
    <>
      <Reveal />
      <PageHero kicker="News & Press" title={getStyled(settings.pageTitle).text || "Updates from Sansico"}
        intro={getStyled(settings.pageIntro).text}
        titleStyle={getStyled(settings.pageTitle).style} introStyle={getStyled(settings.pageIntro).style}
        heroType={settings.heroType} heroImageUrl={settings.heroImageUrl}
        heroVideoUrl={settings.heroVideoUrl} heroPosterUrl={settings.heroPosterUrl} />
      <section className="sec">
        <div className="wrap rv">
          {posts.length === 0 ? (
            <p style={{ opacity:0.5 }}>No posts yet — add them in the Studio under News & Press.</p>
          ) : (
            <div className="card-grid">
              {posts.map((p) => {
                const isExternal = p.postType !== "article" && p.externalUrl;
                const href = isExternal ? p.externalUrl : `/news/${p.slug}`;
                const title = getStyled(p.title);
                const sourceLabel = getStyled(p.sourceLabel);
                const excerpt = getStyled(p.excerpt);
                return (
                  <Link key={p.slug} className="card" href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener" : undefined}>
                    {p.coverUrl && (
                      <div style={{ position:"relative", width:"100%", aspectRatio:"16/9", overflow:"hidden", borderRadius:6, marginBottom:14 }}>
  <Image src={p.coverUrl} alt={title.text} fill sizes="(max-width:768px) 100vw, 50vw" style={{ objectFit:"cover" }} />
</div>
                    )}
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                      <span style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em",
                        color: TYPE_COLOR[p.postType] || "var(--ink)", opacity:0.9 }}>
                        {TYPE_LABEL[p.postType] || p.postType}
                      </span>
                      {sourceLabel.text && <span style={{ fontSize:11, opacity:0.5, ...sourceLabel.style }}>· {sourceLabel.text}</span>}
                    </div>
                    <h3 style={{ fontSize:16, margin:"0 0 8px", ...title.style }}>{title.text}</h3>
                    {excerpt.text && <p style={{ fontSize:14, margin:0, opacity:0.75, ...excerpt.style }}>{excerpt.text}</p>}
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:14 }}>
                      <span style={{ fontSize:12.5, opacity:0.5 }}>{fmtDate(p.publishedAt)}</span>
                      <span className="meta">{isExternal ? "Read →" : "Read article →"}</span>
                    </div>
                  </Link>
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
