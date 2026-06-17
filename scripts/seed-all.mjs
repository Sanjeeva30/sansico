/**
 * SANSICO — COMPLETE CMS SEED
 * Populates every document type in Sanity in one pass.
 * Run: SANITY_TOKEN=your_token node scripts/seed-all.mjs
 * Get token: sanity.io/manage → your project → API → Tokens → Add Editor token
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "rvghw4zu",
  dataset:   "production",
  apiVersion:"2024-01-01",
  token:     process.env.SANITY_TOKEN,
  useCdn:    false,
});

const log = (label, id) => console.log(`  ✓ ${label}: ${id}`);
const err = (label, e)  => console.error(`  ✗ ${label}: ${e.message}`);

async function upsert(doc) {
  try {
    const r = await client.createOrReplace(doc);
    log(doc._type, r._id);
  } catch(e) { err(doc._type, e); }
}

async function seed() {
  console.log("\n🌱 Sansico CMS seed starting...\n");

  // ─────────────────────────────────────────────────────
  // 1. SITE SETTINGS
  // ─────────────────────────────────────────────────────
  await upsert({
    _id: "siteSettings", _type: "siteSettings",
    tagline: "Joy, sustainably packaged.",
    mission: "We build trusted partnerships with sustainable solutions that elevate daily life.",
    headingFont: "sans", bodySize: "md",
    ctaLabel: "Start a conversation",
    nav: [
      { _key:"n1", label:"Capabilities", href:"/capabilities" },
      { _key:"n2", label:"Markets",      href:"/markets" },
      { _key:"n3", label:"Products",     href:"/products" },
      { _key:"n4", label:"Work",         href:"/work" },
      { _key:"n5", label:"Sustainability",href:"/sustainability" },
      { _key:"n6", label:"Why Indonesia", href:"/why-indonesia" },
      { _key:"n7", label:"Company",      href:"/company" },
      { _key:"n8", label:"Careers",      href:"/careers" },
    ],
    ctaBand: {
      headline: "Looking for your |China+1| partner in Indonesia?",
      subline:  "Sansico Group has certified facilities, active US retail programmes and forty years of manufacturing in Indonesia. Let's talk about your next season.",
      btn1Label:"Start a conversation", btn1Href:"/contact",
      btn2Label:"Explore capabilities", btn2Href:"/capabilities",
    },
    susSection: {
      certHeadline: "Certified, dated, |verifiable| — sustainability as a discipline, not an adjective.",
      certBody:     "Every certification we hold is published with its scope and holding entity, and backed by a downloadable certificate. Forestry to food safety, security to social compliance — verification is the point.",
      certBadges:   ["FSC®","FSSC 22000","ISO 17025","C-TPAT / SCAN","Higg Index","amfori BEPI","HERproject","NEST"],
      donutCenterValue: "95%",
      donutCenterLabel: "Minimum recycled content, gift-bag programme",
      donutSegments: [
        { _key:"ds1", label:"Recycled content",    percentage:62, color:"var(--green,#0D4F31)" },
        { _key:"ds2", label:"Responsibly sourced", percentage:22, color:"var(--citrus,#BDDA5F)" },
        { _key:"ds3", label:"In transition",       percentage:16, color:"var(--hair,#E5DFD8)" },
      ],
      pageTitle: "Certified, dated, |verifiable| — sustainability as a discipline, not an adjective.",
      pageIntro: "Every certification Sansico holds is published with its scope and holding entity.",
      heading:   "Joy that |gives back| more than it takes.",
      body:      "From FSC-certified fibre to closed-loop packaging, every Sansico product is designed to meet the sourcing standards your retail customers demand — and the standards the planet requires.",
      statValue: "95%",
      statLabel: "Minimum recycled content, gift-bag programme",
    },
    email:    "hello@sansico.com",
    whatsapp: "+62 812 000 0000",
    phones: [
      { _key:"p1", label:"Subang (GCP)",     display:"+62 260 412 0000", tel:"+622604120000" },
      { _key:"p2", label:"Yogyakarta (IGP)", display:"+62 274 512 0000", tel:"+622745120000" },
    ],
  });

  // ─────────────────────────────────────────────────────
  // 2. HOME PAGE
  // ─────────────────────────────────────────────────────
  await upsert({
    _id: "homePage", _type: "homePage",
    heroType:    "ink",
    heroEyebrow: "Indonesia · China · USA",
    heroTitle:   "Joy, |sustainably| packaged.",
    heroSub:     "Sansico Group designs and manufactures gifting, toy, handicraft and packaging programmes for the world's most loved brands — FSC, FSSC 22000 and ISO 17025 certified, from ten facilities in Indonesia and China.",
    manifestoTitle: "We make things that matter, for brands that |care|.",
    manifestoBody:  "For forty years, Sansico has been the manufacturing partner behind the seasonal aisle — gift bags, wraps, boxes, handicrafts and toys that reach 500 million homes each year. Every programme is built on certified materials, verified labour standards and a supply chain you can show your board.",
    stats: [
      { _key:"st1", value:40,  suffix:"+", label:"Years in manufacturing",             bgColor:"#7A0D20", textColor:"#fff" },
      { _key:"st2", value:10,  suffix:"",  label:"Certified facilities",               bgColor:"#22409E", textColor:"#fff" },
      { _key:"st3", value:500, suffix:"M", label:"Homes reached each year",            bgColor:"#0D4F31", textColor:"#fff" },
      { _key:"st4", value:95,  suffix:"%", label:"Min. recycled content, gift bags",   bgColor:"#BDDA5F", textColor:"#17120F" },
    ],
    customers: [
      { _key:"c1", name:"Target Corporation" },
      { _key:"c2", name:"Walmart" },
      { _key:"c3", name:"Hallmark Cards" },
      { _key:"c4", name:"Mattel" },
    ],
  });

  // ─────────────────────────────────────────────────────
  // 3. COMPANY PAGE
  // ─────────────────────────────────────────────────────
  await upsert({
    _id: "companyPage", _type: "companyPage",
    title: "Sansico Group",
    intro: "Four decades of Indonesian manufacturing — design, make and deliver for the world's most trusted retail brands.",
    mission: "We build trusted partnerships with sustainable solutions that elevate daily life.",
    vision:  "To be the partner that sustainably packages joy for people.",
    culture: "We work hard with honesty and respect for people to make sustainable products, build trusted partnerships and protect our planet.",
    overviewTitle: "Four decades. Ten facilities. One accountable partner.",
    timeline: [
      { _key:"t1", year:1984, event:"Founded in Bandung, West Java", description:"Sansico established as a paper-based packaging manufacturer for Indonesian domestic retail." },
      { _key:"t2", year:1995, event:"First US retail programme — gift bags for Target", description:"Inaugural export shipment to Target Corporation marked the beginning of a long-term partnership." },
      { _key:"t3", year:2003, event:"FSC Chain of Custody certification achieved", description:"First ASEAN packaging manufacturer to achieve FSC CoC across all three facilities." },
      { _key:"t4", year:2010, event:"Handicraft capability launched at IGP Bantul", description:"PT IGP Internasional established in Yogyakarta, adding rattan, bamboo and mixed-media to the offer." },
      { _key:"t5", year:2016, event:"Walmart RSP and Mattel ICTI programmes go live" },
      { _key:"t6", year:2022, event:"Integrated FSC rattan supply chain project launched", description:"Sulawesi-to-Java rattan chain targeting FSC/NEST certification and rural livelihood improvement." },
      { _key:"t7", year:2024, event:"Rattan supply chain operational and FSC-certified" },
    ],
    values: [
      { _key:"v1", title:"Stewardship",     body:"Caring for our planet and its future." },
      { _key:"v2", title:"Accountability",  body:"Doing what is right and doing what we say." },
      { _key:"v3", title:"Noble Execution", body:"Delivering quality, reliability, and consistency." },
      { _key:"v4", title:"Safety & People", body:"Protecting our team and helping them grow." },
      { _key:"v5", title:"Innovation",      body:"Finding better ways for people and the planet." },
    ],
  });

  // ─────────────────────────────────────────────────────
  // 4. PAGE SETTINGS (all pages visible)
  // ─────────────────────────────────────────────────────
  const pages = [
    { id:"home",           label:"Home" },
    { id:"capabilities",   label:"Capabilities" },
    { id:"markets",        label:"Markets" },
    { id:"products",       label:"Products" },
    { id:"work",           label:"Work" },
    { id:"sustainability", label:"Sustainability" },
    { id:"why-indonesia",  label:"Why Indonesia" },
    { id:"company",        label:"Company" },
    { id:"careers",        label:"Careers" },
    { id:"team",           label:"Team" },
    { id:"news",           label:"News" },
    { id:"contact",        label:"Contact" },
  ];
  for (const p of pages) {
    await upsert({ _id:`pageSettings-${p.id}`, _type:"pageSettings",
      pageId:p.id, label:p.label, visible:true });
  }

  // ─────────────────────────────────────────────────────
  // 5. CAPABILITIES
  // ─────────────────────────────────────────────────────
  const caps = [
    { key:"cap1", title:"Design & Development",       slug:"design-development",      num:"DESIGN",  color:"#7A0D20",
      summary:"Concept to production-ready artwork, in-house.",
      body:"Our design team translates retail briefs into production-ready specifications — category research, concept sketching, structural engineering, sample making and pre-production sign-off. We hold artwork in our secure system for up to five years, enabling rapid reprogramme without tooling charges." },
    { key:"cap2", title:"Paper-Based Packaging",      slug:"paper-based-packaging",   num:"MAKE",    color:"#22409E",
      summary:"GMI-certified folding cartons, rigid boxes and gift bags.",
      body:"From gloss-laminated gift bags to complex structural cartons, we run 12-colour litho and digital print, foil blocking, embossing and aqueous coating. Our Subang facility holds GMI (G7) press certification, FSC CoC and FSSC 22000 — meeting the print quality and food-safety requirements of every major US retailer." },
    { key:"cap3", title:"Natural Fibre & Handicraft", slug:"natural-fibre-handicraft",num:"MAKE",    color:"#0D4F31",
      summary:"FSC-certified rattan, bamboo and mixed-media décor.",
      body:"Our Bantul facility produces rattan baskets, bamboo home goods, water-hyacinth storage and mixed-media seasonal décor. Every piece is made by skilled Indonesian artisans — SMETA 4-pillar audited, SEDEX registered, with an integrated FSC/NEST-certified rattan supply chain from Sulawesi operational since 2024." },
    { key:"cap4", title:"Toy & Game Packaging",       slug:"toy-game-packaging",      num:"MAKE",    color:"#F3263E",
      summary:"ICTI-certified assembly and print for major toy brands.",
      body:"Printec operates dedicated Mattel and third-party toy packaging lines with rolling forecast integration, CIF delivery direct to US DCs and full ICTI social compliance audit. Our bonded zone (KITE) facility enables duty-suspension on imported components, reducing landed cost for US-bound programmes." },
    { key:"cap5", title:"Sustainability & Compliance",slug:"sustainability-compliance",num:"DELIVER", color:"#0D4F31",
      summary:"FSC, FSSC 22000, ISO 17025, Higg Index, SMETA.",
      body:"Compliance is built into our operations, not bolted on. We hold eight certifications across the group, run RSAP and RSP programmes for Target and Walmart, and publish every certificate with its scope, entity and expiry date. Our in-house lab (ISO 17025 accredited) handles restricted substances testing, reducing third-party lab dependency and lead times." },
    { key:"cap6", title:"Logistics & Supply Chain",  slug:"logistics-supply-chain",  num:"DELIVER", color:"#BDDA5F",
      summary:"Bonded zones, CIF/FCA to US West Coast, weekly sailings.",
      body:"We ship CIF and FCA to US West Coast ports from three export facilities, with direct services from Semarang and Surabaya (24–26 day transit). Our bonded zone (KITE/KB) status enables duty-free imports of raw materials, with drawback on re-export. Rolling forecast integration with Mattel and Target programmes reduces order uncertainty and enables JIT replenishment." },
  ];
  for (const c of caps) {
    await upsert({ _id:`cap-${c.key}`, _type:"capability",
      visible:true, title:c.title, slug:{current:c.slug}, num:c.num,
      summary:c.summary, colorTheme:c.color, body:c.body });
  }

  // ─────────────────────────────────────────────────────
  // 6. MARKETS
  // ─────────────────────────────────────────────────────
  const markets = [
    { key:"mk1", title:"FMCG & Retail Packaging",    slug:"fmcg-retail-packaging",    color:"#7A0D20",
      tag:"GMI-certified folding cartons",
      body:"We produce folding cartons, shelf-ready packaging and multipack structures for FMCG brands and private-label retail programmes. Our GMI G7-certified press operation in Subang meets the colour-consistency requirements of major supermarket chains. FSC-certified substrates and FSSC 22000 food-safety management are standard across all FMCG runs." },
    { key:"mk2", title:"Gifting & Seasonal",         slug:"gifting-seasonal",         color:"#22409E",
      tag:"Wrap, bags, rigid boxes, party",
      body:"Sansico is the manufacturer behind the seasonal aisle for Target, Walmart and Hallmark — gift bags, tissue paper, boxed sets, wrapping paper and party décor. Every programme runs on FSC-certified paper, with 95% minimum recycled content across the gift-bag range. Twelve-colour print, foil, embossing and ribbon finishing in-house." },
    { key:"mk3", title:"Greeting Cards & Stationery",slug:"greeting-cards-stationery",color:"#0D4F31",
      tag:"Print programmes at retail scale",
      body:"Our print capability runs greeting cards, gift enclosures and stationery at retail scale — from 50,000-unit runs to multi-million seasonal programmes. Digital and litho print, spot UV, foiling and tactile finishes available. Hallmark and American Greetings-compatible colour management." },
    { key:"mk4", title:"Toys & Games",               slug:"toys-games",               color:"#F3263E",
      tag:"Production, packaging & safety testing",
      body:"We manufacture toy packaging and assemble games components for Mattel and third-party toy brands. ISO 17025-accredited in-house testing covers ASTM F963 and EN 71 restricted substances, reducing lab dependency. Rolling forecast integration with Mattel's DCP enables JIT production against seasonal sell-in." },
    { key:"mk5", title:"Home & Lifestyle",           slug:"home-lifestyle",           color:"#BDDA5F",
      tag:"Handicrafts & circular design",
      body:"From FSC-certified rattan storage to mixed-media seasonal décor, our Bantul facility produces home and lifestyle products for Target D53 and independent gift retailers. SMETA 4-pillar social audit, SEDEX registration and NEST certification in progress. Integrated rattan supply chain from Sulawesi ensures traceable, responsible fibre." },
  ];
  for (const m of markets) {
    await upsert({ _id:`market-${m.key}`, _type:"market",
      visible:true, title:m.title, slug:{current:m.slug},
      color:m.color, tag:m.tag, body:m.body });
  }

  // ─────────────────────────────────────────────────────
  // 7. CERTIFICATIONS
  // ─────────────────────────────────────────────────────
  const certs = [
    { key:"c1", name:"FSC® Chain of Custody", category:"Forestry",
      scope:"Paper-based packaging, natural fibre and handicraft products manufactured at GCP, IGP and Printec facilities.",
      entity:"PT Grafitecindo Ciptaprima / PT IGP Internasional / PT Printec Perkasa",
      issued:"2003", registration:"FSC-C000001" },
    { key:"c2", name:"FSSC 22000", category:"Food Safety",
      scope:"Manufacture of paper-based packaging materials intended for indirect food contact.",
      entity:"PT Grafitecindo Ciptaprima (Subang facility)", issued:"2018" },
    { key:"c3", name:"ISO 17025", category:"Quality & Testing",
      scope:"Testing of restricted substances in toys and consumer products: heavy metals, phthalates, formaldehyde and azo dyes.",
      entity:"Sansico Group Testing Laboratory, Cikampek", issued:"2019" },
    { key:"c4", name:"C-TPAT / SCAN", category:"Supply Chain Security",
      scope:"Customs Trade Partnership Against Terrorism — supply chain security programme covering all three Indonesian export facilities.",
      entity:"Sansico Group (Group certification)", issued:"2015" },
    { key:"c5", name:"Higg Index", category:"Environmental",
      scope:"Facility Environmental Module (FEM) assessment covering energy, water, wastewater, air emissions and waste management.",
      entity:"PT IGP Internasional (Bantul facility)", issued:"2021" },
    { key:"c6", name:"amfori BEPI", category:"Environmental",
      scope:"Business Environmental Performance Initiative audit covering resource management and environmental impact across production operations.",
      entity:"PT Grafitecindo Ciptaprima", issued:"2020" },
    { key:"c7", name:"HERproject", category:"Social",
      scope:"Women's economic empowerment programme covering financial literacy, health and rights education for production workers.",
      entity:"PT IGP Internasional", issued:"2019" },
    { key:"c8", name:"NEST Handcraft Standards", category:"Social",
      scope:"Handcraft supply chain standards covering fair labour, safe working conditions and business development for artisan producers.",
      entity:"PT IGP Internasional — rattan and handicraft division", issued:"2024" },
  ];
  for (const c of certs) {
    await upsert({ _id:`cert-${c.key}`, _type:"certification",
      visible:true, name:c.name, category:c.category,
      scope:c.scope, entity:c.entity, issued:c.issued,
      registration:c.registration });
  }

  // ─────────────────────────────────────────────────────
  // 8. FACILITIES
  // ─────────────────────────────────────────────────────
  const facilities = [
    { key:"f1", name:"PT Grafitecindo Ciptaprima (GCP)",
      city:"Subang, West Java",
      address:"Jl. Industri Raya, Kawasan Industri Subang, West Java 41281, Indonesia",
      focus:"Paper-based packaging · Folding cartons · Gift bags · GMI print",
      capacity:"42,000 sqm covered floor space. 12-colour litho and digital print. 3 × coating lines." },
    { key:"f2", name:"PT IGP Internasional (IGP)",
      city:"Bantul, Yogyakarta",
      address:"Jl. Parangtritis KM 14, Bantul, Yogyakarta 55191, Indonesia",
      focus:"Natural fibre · Rattan · Bamboo · Handicraft · Mixed-media décor",
      capacity:"18,000 sqm covered. 850 direct artisan workers. Integrated rattan storage and drying." },
    { key:"f3", name:"PT Printec Perkasa (Printec)",
      city:"Cikampek, West Java",
      address:"Kawasan Industri KIIC, Cikampek, West Java 41373, Indonesia",
      focus:"Toy & game packaging · ICTI programmes · Bonded zone (KITE) · Mattel rolling forecast",
      capacity:"5,200 sqm. Bonded zone status. ISO 17025 in-house test lab on site." },
  ];
  for (const f of facilities) {
    await upsert({ _id:`facility-${f.key}`, _type:"facility",
      visible:true, name:f.name, city:f.city,
      address:f.address, focus:f.focus, capacity:f.capacity });
  }

  // ─────────────────────────────────────────────────────
  // 9. TEAM (placeholder — photos added via Studio)
  // ─────────────────────────────────────────────────────
  await upsert({ _id:"person-sg", _type:"person", visible:true,
    name:"Sanjeeva Gunawardena",
    role:"Group Head of Strategic Support & CFO",
    bio:"Sanjeeva oversees Finance, Internal Audit, HR, IT & MIS, Procurement, Logistics, Legal and ESG across the Sansico Group. He reports directly to the Board and brings extensive experience across capital markets, apparel sourcing, F&B retail and Indonesian manufacturing export.",
    linkedin:"https://www.linkedin.com/in/sanjeeva-gunawardena" });

  // ─────────────────────────────────────────────────────
  // 10. CASE STUDIES
  // ─────────────────────────────────────────────────────
  const cases = [
    { key:"cs1", title:"Target Corporation — Gift Bag Programme",
      slug:"target-gift-bag-programme", kicker:"Target Corporation · D53 Seasonal",
      quote:"A China+1 partner that doesn't just talk about Indonesia — they manufacture there, to the standards we require.",
      body:"Sansico has supplied Target's D53 seasonal gifting programme for over fifteen years. Our Subang facility produces 18M+ gift bags annually under FSC CoC certification, with 95% minimum recycled content and GMI colour-match guarantee. The programme runs CIF to Target's Lakeville, MN DC on a rolling seasonal calendar.",
      stats:[{ _key:"s1", value:"18M+", label:"Units per season" },{ _key:"s2", value:"95%", label:"Min. recycled content" },{ _key:"s3", value:"15+", label:"Years supply relationship" }] },
    { key:"cs2", title:"Hallmark Cards — VUCA Supply Chain Brief",
      slug:"hallmark-vuca-supply-chain", kicker:"Hallmark Cards · Supply Chain",
      quote:"The most coherent China+1 narrative we've heard — grounded in real certification, real capacity and real numbers.",
      body:"In 2026 Sansico presented a five-slide VUCA supply chain brief to Hallmark's senior leadership, positioning Indonesia as a stable, certifiable alternative to China-concentrated sourcing. The brief covered dual sourcing proof points, FSC fibre depth and landed cost modelling.",
      stats:[{ _key:"s1", value:"3", label:"Facilities presented" },{ _key:"s2", value:"FSC+FSSC", label:"Dual certification" }] },
    { key:"cs3", title:"Mattel — Rolling Forecast Programme",
      slug:"mattel-rolling-forecast", kicker:"Mattel · Toy Packaging · DCP",
      quote:"Rolling forecast integration with Printec has taken 3 weeks of planning uncertainty out of our seasonal calendar.",
      body:"Printec operates a dedicated Mattel packaging line with direct DCP (Demand & Capacity Planning) integration. The programme covers corrugate, folding carton and retail-ready packaging for Mattel's Indonesian-origin toy ranges. ICTI social audit, in-house ISO 17025 testing and CIF delivery to US West Coast DCs.",
      stats:[{ _key:"s1", value:"12", label:"Mattel SKUs active" },{ _key:"s2", value:"ICTI", label:"Social compliance" },{ _key:"s3", value:"ISO 17025", label:"In-house testing" }] },
  ];
  for (const c of cases) {
    await upsert({ _id:`case-${c.key}`, _type:"caseStudy",
      visible:true, title:c.title, slug:{current:c.slug},
      kicker:c.kicker, quote:c.quote, body:c.body, stats:c.stats,
      publishedAt: new Date().toISOString() });
  }

  // ─────────────────────────────────────────────────────
  // 11. CAREERS PAGE
  // ─────────────────────────────────────────────────────
  await upsert({
    _id:"careersPage", _type:"careersPage", visible:true,
    title:"Join Sansico",
    intro:"We're building the sustainable manufacturing partner for US retail's next chapter. If you care about craft, sustainability and getting things done, we'd like to meet you.",
    values:[
      { _key:"v1", title:"Ownership", body:"We move fast, take responsibility and don't wait to be told." },
      { _key:"v2", title:"Craft",     body:"We care about quality — in manufacturing, in communications, in everything we do." },
      { _key:"v3", title:"Openness",  body:"We share information, debate ideas and learn from each other." },
      { _key:"v4", title:"Impact",    body:"We measure ourselves by outcomes, not hours." },
    ],
    openRoles:[
      { _key:"r1", title:"Export Sales Manager", location:"Jakarta / Subang",
        description:"Manage and grow relationships with US retail buyers and sourcing offices. Work with our design and production teams to develop seasonal programmes. 5+ years export sales experience required.",
        applyEmail:"careers@sansico.com" },
      { _key:"r2", title:"Production Planner", location:"Subang, West Java",
        description:"Plan and coordinate production schedules across GCP and Printec facilities. Interface with US retail planning systems. Experience with rolling forecast or JIT manufacturing required.",
        applyEmail:"careers@sansico.com" },
      { _key:"r3", title:"ESG & Compliance Coordinator", location:"Subang / Remote",
        description:"Manage certification renewals, audit scheduling and ESG reporting. Coordinate RSAP (Target) and RSP (Walmart) programme compliance. Background in sustainability or supply chain compliance preferred.",
        applyEmail:"careers@sansico.com" },
    ],
  });

  // ─────────────────────────────────────────────────────
  // 12. WHY INDONESIA (if not already seeded)
  // ─────────────────────────────────────────────────────
  try {
    const existing = await client.fetch(`*[_id=="whyIndonesia"][0]._id`);
    if (existing) {
      console.log("  ✓ whyIndonesia: already seeded — skipping (run seed-why-indonesia.mjs to refresh)");
    } else {
      console.log("  ⚠ whyIndonesia: not seeded — run: SANITY_TOKEN=xxx node scripts/seed-why-indonesia.mjs");
    }
  } catch(e) { err("whyIndonesia check", e); }

  console.log("\n✅ Seed complete. Allow 30 seconds for Sanity to index, then refresh the website.\n");
  console.log("Next steps:");
  console.log("  • Add team member photos in Studio → Team");
  console.log("  • Upload customer logos in Studio → 🏠 Home Page → Customer wall");
  console.log("  • Add facility photos in Studio → Facilities");
  console.log("  • Upload case study images in Studio → Case Studies");
  console.log("  • Add certification logos/PDFs in Studio → Certifications\n");
}

seed().catch(e => { console.error("Fatal:", e); process.exit(1); });
