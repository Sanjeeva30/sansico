const BRAND_COLOURS = [
  { label: "Crimson",   value: { hex: "#7A0D20" } },
  { label: "Navy",      value: { hex: "#22409E" } },
  { label: "Green",     value: { hex: "#0D4F31" } },
  { label: "Red",       value: { hex: "#F3263E" } },
  { label: "Citrus",    value: { hex: "#BDDA5F" } },
  { label: "Black",     value: { hex: "#1A1A1A" } },
  { label: "White",     value: { hex: "#FFFFFF" } },
  { label: "Off-white", value: { hex: "#F5F0E8" } },
];
const COLOR_OPTS = { disableAlpha: true, colorList: BRAND_COLOURS };

export default {
  name: "homePage", title: "Home Page", type: "document",
  fields: [
    { name: "heroType",    title: "Hero type",    type: "string", options: { list: ["ink","image","video"], layout: "radio" } },
    { name: "heroVideo",   title: "Hero video URL", type: "url",   hidden: ({ document: d }) => d?.heroType !== "video" },
    { name: "heroPoster",  title: "Hero poster",  type: "image",  hidden: ({ document: d }) => d?.heroType === "ink" },
    { name: "heroEyebrow", title: "Hero eyebrow", type: "string" },
    { name: "heroTitle",   title: "Hero title (italic word in |pipes|)", type: "string" },
    { name: "heroSub",     title: "Hero subline", type: "text" },
    { name: "manifestoTitle", title: "Manifesto title (accent in |pipes|)", type: "text" },
    { name: "manifestoBody",  title: "Manifesto body",  type: "text" },
    { name: "stats", title: "Animated stats", type: "array",
      of: [{ type: "object", fields: [
        { name: "value",     title: "Number",             type: "number" },
        { name: "suffix",    title: "Suffix (+, %, blank)", type: "string" },
        { name: "label",     title: "Label",              type: "string" },
        { name: "bgColor",   title: "Background colour",  type: "color", options: COLOR_OPTS },
        { name: "textColor", title: "Text colour",        type: "color", options: COLOR_OPTS },
      ],
      preview: { select: { title: "label", value: "value", suffix: "suffix" },
        prepare({ title, value, suffix }) { return { title: `${value}${suffix||""} — ${title}` }; } }
      }]
    },
    { name: "customers", title: "Customer wall", type: "array",
      of: [{ type: "object", fields: [
        { name: "name", title: "Customer name", type: "string" },
        { name: "logo", title: "Logo (transparent SVG/PNG)", type: "image",
          options: { accept: "image/svg+xml,image/png,image/webp" } },
      ], preview: { select: { title: "name", media: "logo" } } }]
    },
    { name: "featuredWork", title: "Featured case study", type: "reference", to: [{ type: "caseStudy" }] },
  ]
};
