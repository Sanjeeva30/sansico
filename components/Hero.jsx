import Link from "next/link";
import Arrow from "./Arrow";

export function InkBands() {
  return (
    <div className="press" aria-hidden="true">
      <div className="band" /><div className="band" /><div className="band" />
      <div className="band" /><div className="band" /><div className="band" />
    </div>
  );
}

export default function Hero({ hero }) {
  const [a, b, c] = (hero.title || "").split("|");
  return (
    <section className="hero" aria-label="Sansico Group">
      {hero.type === "video" && hero.videoUrl ? (
        <video className="hero-video" autoPlay muted loop playsInline poster={hero.posterUrl || undefined}>
          <source src={hero.videoUrl} type="video/mp4" />
        </video>
      ) : (
        <InkBands />
      )}
      <div className="grain" aria-hidden="true" />
      <div className="hero-inner">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{a}<em>{b}</em>{c}</h1>
        <p className="sub">{hero.sub}</p>
        <Link className="btn btn-light" href={hero.primary.href}>{hero.primary.label} <Arrow /></Link>
        <Link className="btn btn-ghost" href={hero.secondary.href}>{hero.secondary.label}</Link>
      </div>
      <div className="scroll-cue" aria-hidden="true">Scroll</div>
    </section>
  );
}
