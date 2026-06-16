// Run: SANITY_TOKEN=your_token node scripts/seed-why-indonesia.mjs
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "rvghw4zu",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const doc = {
  _id: "whyIndonesia",
  _type: "whyIndonesia",

  heroTitle: "Why Indonesia, Why Now",
  heroSubtitle: "Indonesia Sourcing Intelligence Brief — country-of-production perspectives for US retail senior leadership · 2025–2026",
  heroStats: [
    { _key: "s1", value: "288M",        label: "Indonesia Population" },
    { _key: "s2", value: "US$282.9B",   label: "Total Exports, Jan–Dec 2025" },
    { _key: "s3", value: "5.11%",       label: "GDP Growth, 2025" },
    { _key: "s4", value: "RCEP",        label: "Regional Market-Access Platform" },
  ],

  executiveTitle: "Indonesia is a credible next-scale ASEAN sourcing platform",
  executiveIntro: "Indonesia's case is strongest when country-of-production decisions are assessed beyond unit price alone. Through a broader sourcing lens — encompassing scale, material depth, trade architecture, compliance maturity and ESG momentum — Indonesia consistently outperforms on the metrics US retailers now prioritise.",
  executiveConclusion: "For retailers holding concentrated China exposure, Indonesia provides structural diversification, not merely an incremental option. The primary lead-time and price-gap issues are manageable and narrowing.",

  dimensions: [
    { _key: "d1", title: "Cost Corridor",        body: "Indonesian labour costs range from USD 1.80–2.40/hour — above Vietnam's lowest tiers but below China coastal and Malaysia. Total landed cost parity with China on high-labour-content seasonal and gifting items is achievable at current freight and duty differentials." },
    { _key: "d2", title: "Scale & Capacity",     body: "Ten-plus million manufacturing workers, 170+ industrial estates and dedicated bonded zones (KITE/KB) with duty-suspension on imported inputs. Capacity headroom exists in paper-based, seasonal goods and light assembly — the three categories most relevant to US retail." },
    { _key: "d3", title: "Material Depth",       body: "Unique fibre basket: FSC-certified rattan, bamboo, water hyacinth, mixed tropical wood, agri-waste board and kraft/duplex paperboard. Indonesia is the only ASEAN country with commercial scale in all five fibre types simultaneously." },
    { _key: "d4", title: "Infrastructure",       body: "Tanjung Priok (Jakarta) ranks among Asia's top-10 ports by throughput. Toll-road connectivity to Subang, Bandung and Bantul corridors is now complete. Direct services to US West Coast available weekly from Semarang and Surabaya." },
    { _key: "d5", title: "Compliance Maturity",  body: "SMETA, SEDEX, FSC, FSSC 22000, ISO 17025 and BSCI audit infrastructure is well-established in West Java and Yogyakarta. Target RSAP and Walmart RSP programmes are actively operated by Sansico subsidiaries." },
    { _key: "d6", title: "Trade Architecture",   body: "RCEP membership (effective 2023) provides cumulation with ASEAN, China, Japan and Korea. IUAE CEPA, IK CEPA and I-EU CEPA under negotiation. GSP benefits remain available for LDC-equivalent categories. No active NME designation risk." },
  ],

  aseanTitle: "Indonesia in its ASEAN peer context",
  aseanBody: "Vietnam remains the default China+1 choice for most US retailers — but NME tariff risk, wage escalation and capacity concentration are creating a second-wave sourcing review. Cambodia offers cost but lacks scale and material depth. Thailand and Malaysia offer quality but at a cost premium that narrows the sourcing rationale.",
  aseanConclusion: "Indonesia scores highest on a risk-adjusted, multi-dimensional ASEAN sourcing evaluation — combining the strongest material base in the region with improving compliance infrastructure and favourable trade architecture.",

  scorecardVietnamNote: "USTR has not revoked Vietnam's NME status. US CBP anti-circumvention investigations targeting Vietnam-origin goods with Chinese inputs remain active. Retailers with >40% Vietnam concentration face material tariff exposure in a stress scenario.",
  scorecardConclusion: "Indonesia scores 26/30 on a risk-adjusted ASEAN sourcing evaluation, outperforming Vietnam (20), Thailand (21), Malaysia (22), Cambodia (16) and Philippines (17). The gap is widest on Materials and Scale — Indonesia's structurally differentiated strengths.",

  javaTitle: "Java: Indonesia's manufacturing heartland",
  javaIntro: "Three of Indonesia's five principal export manufacturing clusters are located within a 300km corridor on Java's north coast — Subang–Karawang, Semarang and Surabaya. A fourth is developing rapidly in Yogyakarta–Solo. Each cluster has distinct capability concentration relevant to US retail buyers.",
  javaPlatformNote: "Sansico operates certified facilities in three of these four clusters: PT IGP Internasional (Bantul, Yogyakarta), PT Grafitecindo Ciptaprima (Subang, West Java) and PT Printec Perkasa (Cikampek, West Java). Combined covered floor space exceeds 65,000 sqm.",
  javaRegions: [
    { _key: "r1", name: "Subang–Karawang",    description: "Core packaging and paper-based manufacturing corridor. Sansico's GCP facility here holds FSSC 22000, FSC and GMI print certification. Bonded zone (KITE) access for duty-suspension on imported duplex board." },
    { _key: "r2", name: "Yogyakarta–Solo",    description: "Indonesia's craft manufacturing heartland. Rattan, bamboo, water hyacinth and mixed-media product development. Sansico's IGP facility holds FSC, SMETA 4-pillar and SEDEX certification." },
    { _key: "r3", name: "Semarang",           description: "Port-proximate logistics hub. Strengthening in corrugated, folding carton and rigid paper packaging. Direct Semarang–Los Angeles container service (24–26 transit days) now weekly." },
    { _key: "r4", name: "Surabaya–East Java", description: "Indonesia's second-largest manufacturing base. Strong in furniture, seasonal décor and home goods. Expanding US retail customer base including seasonal and home gifting programmes." },
  ],

  sectorsTitle: "Priority sectors for US retail diversification",
  sectorsBody: "Three product families offer the clearest sourcing rationale for US retail buyers considering Indonesian origin: paper-based seasonal goods, handicraft and home décor, and toy & game packaging. Each maps to existing Indonesian manufacturing strength without requiring greenfield investment.",
  sectorsConclusion: "Sansico currently operates across all three priority sectors — paper gifting and seasonal packaging (GCP/Printec), rattan and mixed-media handicraft (IGP) and paper-based toy & game packaging (Printec/Mattel programme).",

  susTitle: "Sustainability & ESG direction",
  susBody: "Indonesia's regulatory and commercial ESG trajectory is strongly positive for US retail requirements. The government's IDC commitment, PROPER environmental rating system and expanding FSC fibre certification create a credible ESG story that withstands CSRD and Walmart RSP-level scrutiny.",
  susPoints: [
    "FSC Forest Management and Chain-of-Custody certification covers >12M hectares of Indonesian forest concessions",
    "PROPER environmental compliance rating (KLHK) provides third-party ESG baseline for manufacturing sites",
    "Indonesia's NDC commits to 29% emissions reduction by 2030 — one of ASEAN's most specific targets",
    "Rattan sourcing under FSC/NEST certification framework — Sansico's integrated supply chain operational since 2024",
    "RSAP (Responsible Sourcing Assessment Programme) actively operated at GCP and Printec for Target Corporation",
  ],

  tradeTitle: "Trade architecture & market access",
  tradeBody: "Indonesia's trade architecture provides meaningful tariff advantages for US-bound goods compared to China and, in some categories, Vietnam. RCEP cumulation, active bilateral negotiations and retained GSP benefits create a favourable landed-cost differential.",
  tradeAgreements: [
    { _key: "t1", name: "RCEP",       description: "Regional Comprehensive Economic Partnership — effective January 2023. Provides cumulation with ASEAN-10, China, Japan, South Korea, Australia and New Zealand. Input materials from RCEP partners count toward Rules of Origin." },
    { _key: "t2", name: "I-EU CEPA", description: "Indonesia–EU Comprehensive Economic Partnership Agreement — under active negotiation. Expected to provide 0% duty access on >90% of tariff lines including paper, packaging and home décor. ETA: 2026–2027." },
    { _key: "t3", name: "IUAE CEPA", description: "Indonesia–UAE CEPA — signed 2022, operational 2023. Provides duty-free access for Indonesian goods transiting through UAE for onward distribution to Middle East and European retail channels." },
  ],

  fiberTitle: "Fiber-based seasonal goods: Indonesia's unique advantage",
  fiberBody: "No other ASEAN country combines commercial-scale FSC-certified rattan, bamboo, water hyacinth, agri-waste board and kraft/duplex paperboard in a single origin. This fibre convergence enables product development that is simultaneously premium, sustainable and competitively costed.",
  fiberPoints: [
    { _key: "f1", title: "Natural Fibre",     body: "Indonesia produces >80% of the world's commercial rattan. FSC and NEST certification frameworks operational. Sansico's integrated rattan supply chain (Sulawesi → Java) is certified and operational since 2024." },
    { _key: "f2", title: "Paper & Board",     body: "Duplex board, kraft liner and SBS coated stock available from Indonesian mills (Pindo Deli, Tjiwi Kimia) and established Malaysian/Thai backup sources. GMI and FSC print certification at GCP and Printec facilities." },
    { _key: "f3", title: "Hybrid Mixed Media",body: "Paper-wrapped natural fibre, paper-over-board structures and mixed-media seasonal décor — design capabilities operational at IGP Bantul. Target CORE product development active for D53 seasonal category." },
  ],

  conclusionStatement: "Indonesia offers US retail the rare combination of manufacturing scale, material depth, compliance maturity and ESG credibility — at a cost structure that is competitive with China on the categories that matter most to the D53 seasonal and gifting buyer.",
  conclusionBullets: [
    "Strongest material platform in ASEAN — only origin with commercial FSC rattan, bamboo, water hyacinth and paper simultaneously",
    "Compliance infrastructure matches Vietnam — SMETA, SEDEX, FSC, FSSC 22000, ISO 17025 all operational",
    "No NME tariff risk — RCEP membership provides positive trade architecture vs. Vietnam's CBP exposure",
    "Scale headroom — capacity utilisation in paper and handicraft sectors remains below 70%, enabling rapid programme scaling",
    "Sansico ready to onboard — ten facilities, certified across all priority categories, with active Target, Walmart, Hallmark and Mattel programmes",
  ],

  ctaHeadline: "Ready to explore Indonesian sourcing?",
  ctaSubline: "Speak with Sansico Group — certified facilities, active US retail programmes, and the local knowledge to make Indonesian sourcing work from day one.",
  ctaBtnLabel: "Start a conversation",
  ctaBtnHref: "/contact",

  sources: [
    { _key: "src01", category: "Trade & Economy",   label: "BPS Indonesia — National Statistics",                url: "https://www.bps.go.id" },
    { _key: "src02", category: "Trade & Economy",   label: "UN Comtrade — Indonesia Export Data 2025",          url: "https://comtradeplus.un.org" },
    { _key: "src03", category: "Trade & Economy",   label: "World Bank — Indonesia Economic Update",            url: "https://www.worldbank.org/en/country/indonesia" },
    { _key: "src04", category: "Trade & Economy",   label: "IMF — Indonesia Article IV Consultation 2025",      url: "https://www.imf.org/en/countries/IDN" },
    { _key: "src05", category: "Trade & Economy",   label: "RCEP Secretariat — Agreement Text & Annexes",       url: "https://rcepsec.org" },
    { _key: "src06", category: "Sustainability",    label: "KLHK — PROPER Environmental Rating 2024",           url: "https://www.menlhk.go.id" },
    { _key: "src07", category: "Sustainability",    label: "FSC International — Indonesia Certificate Database", url: "https://info.fsc.org" },
    { _key: "src08", category: "Sustainability",    label: "Indonesia NDC — Enhanced Nationally Determined Contribution", url: "https://unfccc.int/sites/default/files/NDC/2022-09/23.09.2022_Enhanced%20NDC%20Indonesia.pdf" },
    { _key: "src09", category: "Manufacturing",     label: "BKPM — Investment Realization Statistics Q4 2025",  url: "https://www.bkpm.go.id" },
    { _key: "src10", category: "Manufacturing",     label: "Indonesian Chamber of Commerce — Export Guide",     url: "https://www.kadin.id" },
    { _key: "src11", category: "Logistics",         label: "Drewry — IACI Container Rate Index Q1 2026",        url: "https://www.drewry.co.uk" },
    { _key: "src12", category: "Logistics",         label: "Sea-Intelligence — Schedule Reliability Report",    url: "https://www.sea-intelligence.com" },
    { _key: "src13", category: "Compliance",        label: "SEDEX — Members Ethical Trade Audit (SMETA)",       url: "https://www.sedex.com" },
    { _key: "src14", category: "Compliance",        label: "Target Corporation — RSAP Supplier Guidelines",     url: "https://corporate.target.com/sustainability-governance" },
    { _key: "src15", category: "US Retail Context", label: "USTR — Vietnam NME Status Review 2025",             url: "https://ustr.gov/countries-regions/southeast-asia-pacific/vietnam" },
    { _key: "src16", category: "US Retail Context", label: "US CBP — Anti-Circumvention Investigation Tracker", url: "https://www.cbp.gov/trade/trade-community/programs-outreach/trade-trends" },
  ],
};

async function seed() {
  try {
    console.log("Seeding Why Indonesia document...");
    const result = await client.createOrReplace(doc);
    console.log("✓ whyIndonesia seeded:", result._id);
  } catch (err) {
    console.error("✗ Seed failed:", err.message);
    process.exit(1);
  }
}

seed();
