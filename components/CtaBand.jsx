import Link from "next/link";
import Arrow from "./Arrow";
import { getSite, accentSplit } from "@/lib/content";
import { getStyled } from "@/lib/styledText";
import StyledText from "./StyledText";

export default async function CtaBand() {
  const site = await getSite();
  const cta = site.ctaBand || {};

  const headlineStyled = getStyled(cta.headline) ;
  const headline = headlineStyled.text || "Looking for your |China+1| partner in Indonesia?";
  const subline  = cta.subline || "Tell us your category, target market and volumes — our marketing offices in Jakarta and Foshan respond within one business day.";
  const btn1Label = getStyled(cta.btn1Label);
  const btn2Label = getStyled(cta.btn2Label);
  const btn1 = { text: btn1Label.text || "Request a quotation", href: cta.btn1Href || "/contact" };
  const btn2 = { text: btn2Label.text || "Talk to our team",    href: cta.btn2Href || "/contact" };

  const [a, b, c] = accentSplit(headline);

  return (
    <section className="cta sec" id="contact-cta">
      <div className="wrap rv" data-animate>
        <h2 style={headlineStyled.style}>{a}<em>{b}</em>{c}</h2>
        <StyledText as="p" value={subline} />
        <Link className="btn btn-red" href={btn1.href}><span style={btn1Label.style}>{btn1.text}</span> <Arrow /></Link>
        <Link className="btn btn-ghost" href={btn2.href}><span style={btn2Label.style}>{btn2.text}</span></Link>
      </div>
    </section>
  );
}
