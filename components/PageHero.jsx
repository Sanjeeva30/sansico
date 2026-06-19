import { InkBands } from "./Hero";

export default function PageHero({ kicker, title, intro, style,
  kickerStyle, titleStyle, introStyle,
  heroType = "ink", heroImageUrl, heroVideoUrl, heroPosterUrl }) {
  return (
    <section className="phero" style={style}>
      {heroType === "video" && heroVideoUrl ? (
        <video className="phero-media" autoPlay muted loop playsInline poster={heroPosterUrl || undefined}>
          <source src={heroVideoUrl} type="video/mp4" />
        </video>
      ) : heroType === "image" && heroImageUrl ? (
        <img className="phero-media" src={heroImageUrl} alt="" />
      ) : (
        <InkBands />
      )}
      <div className="wrap">
        <p className="eyebrow" data-animate style={kickerStyle}>{kicker}</p>
        <h1 data-animate data-delay="1" style={titleStyle}>{title}</h1>
        {intro ? <p data-animate data-delay="2" style={introStyle}>{intro}</p> : null}
      </div>
    </section>
  );
}
