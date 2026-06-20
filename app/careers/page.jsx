export const revalidate = 30;
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import InterestForm from "@/components/InterestForm";
import { getCareers, getPageSettings, getPageSeo } from "@/lib/content";
import { getStyled } from "@/lib/styledText";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  return getPageSeo("careers", {
    title: "Careers — Make the Things That Make Moments",
    description: "Careers across Sansico's ten facilities in Indonesia and China."
  });
}

export default async function Careers() {
  const [c, settings] = await Promise.all([getCareers(), getPageSettings("careers")]);
  if (!settings.visible) notFound();
  const title = getStyled(c?.title) || {};
  const intro = getStyled(c?.intro) || {};
  const values = c?.values || [];
  const roles = c?.openRoles?.map(r => getStyled(r.title).text).filter(Boolean) || ["Engineering & Production","Design & Creative","Quality & Laboratory","Supply Chain & Logistics","Commercial & Marketing","Finance, IT & Corporate"];
  return (
    <>
      <Reveal />
      <PageHero kicker="Careers" title={title.text || "Make the things that make moments"} intro={intro.text || "Register your interest and we'll reach out when a matching role opens."}
        titleStyle={title.style} introStyle={intro.style}
        heroType={settings.heroType} heroImageUrl={settings.heroImageUrl}
        heroVideoUrl={settings.heroVideoUrl} heroPosterUrl={settings.heroPosterUrl} />
      {values.length > 0 && (
        <section className="sec">
          <div className="wrap rv">
            <div className="card-grid">
              {values.map((v, vi) => {
                const vTitle = getStyled(v.title);
                const vBody = getStyled(v.body);
                return (
                  <div className="card" data-animate key={vi}><h3 style={vTitle.style}>{vTitle.text}</h3><p style={vBody.style}>{vBody.text}</p></div>
                );
              })}
            </div>
          </div>
        </section>
      )}
      {c?.openRoles?.length > 0 && (
        <section className="sec warm">
          <div className="wrap rv">
            <div className="sec-head">
              <h2 className="kicker">Open roles</h2>
              <p className="lede">Current opportunities across our operations</p>
            </div>
            <div className="card-grid">
              {c.openRoles.map((r, ri) => {
                const rTitle = getStyled(r.title);
                const rLocation = getStyled(r.location);
                const rDesc = getStyled(r.description);
                return (
                  <div className="card" data-animate key={ri}>
                    <h3 style={rTitle.style}>{rTitle.text}</h3>
                    <span className="kicker" style={rLocation.style}>{rLocation.text}</span>
                    {rDesc.text && <p style={{ marginTop:10, ...rDesc.style }}>{rDesc.text}</p>}
                    {r.applyEmail && (
                      <p style={{ marginTop:14 }}>
                        <a className="link-d" href={`mailto:${r.applyEmail}?subject=Application: ${rTitle.text}`}>Apply →</a>
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
      <section className="sec warm">
        <div className="wrap rv">
          <div className="sec-head">
            <h2 className="kicker">Register your interest</h2>
            <p className="lede">Open roles will be published here</p>
          </div>
          <InterestForm roles={roles} />
        </div>
      </section>
    </>
  );
}
