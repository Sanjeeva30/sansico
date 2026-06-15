import Link from "next/link";
import Arrow from "./Arrow";
import { getSite } from "@/lib/content";
import { accentSplit } from "@/lib/content";

export default async function CtaBand() {
  const site = await getSite();
  const cta = site.ctaBand || {};

  const headline = cta.headline || "Looking for your |China+1| partner in Indonesia?";
  const subline  = cta.subline  || "Tell us your category, target market and volumes — our marketing offices in Jakarta and Foshan respond within one business day.";
  const btn1     = { label: cta.btn1Label || "Request a quotation", href: cta.btn1Href || "/contact" };
  const btn2     = { label: cta.btn2Label || "Talk to our team",    href: cta.btn2Href || "/contact" };

  const [a, b, c] = accentSplit(headline);

  return (
    <section className="cta sec" id="contact-cta">
      <div className="wrap rv" data-animate>
        <h2>{a}<em>{b}</em>{c}</h2>
        <p>{subline}</p>
        <Link className="btn btn-red" href={btn1.href}>{btn1.label} <Arrow /></Link>
        <Link className="btn btn-ghost" href={btn2.href}>{btn2.label}</Link>
      </div>
    </section>
  );
}
